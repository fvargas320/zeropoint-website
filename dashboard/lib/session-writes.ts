import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { editLocks } from "@/lib/edit-rules";
import type { SessionInput, UploadedMedia } from "@/lib/new-session";

// Server-side writes for web sessions, in the shapes the app writes
// (Session.toSupabaseJson / Target.toSupabaseJson) so the phone's normal
// sync pulls them in. Rules (proposal §7):
// - The web never changes inventory. A new session names a lot with
//   ammo_deducted = 0 (not null: the app treats null as "round_count was
//   deducted" and would give rounds back on a later phone edit/delete).
// - Editing can't touch rounds or ammo once the phone deducted them, and
//   never a match's results (editLocks).
// - Deleting goes through web_delete_session, which gives deducted rounds
//   back and recomputes the firearm, like SessionNotifier.deleteSession.
// - Media paths must sit in the member's own folders.
// Every caller checks Pro first.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const num = (v: string, max: number) => {
  const n = Number(v.replace(",", "."));
  return v.trim() && Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};
const text = (v: string, max: number) => (v.trim() ? v.trim().slice(0, max) : null);
type Result = { error: string } | { uuid: string };

function when(input: SessionInput): Date | string {
  const [y, m, d] = input.date.split("-").map(Number);
  const [hh, mm] = input.time.split(":").map(Number);
  if (!y || !m || !d || hh == null || mm == null) return "Pick a date and time.";
  // Local wall-clock time in the member's browser → UTC instant.
  const t = new Date(Date.UTC(y, m - 1, d, hh, mm) + input.tzOffsetMinutes * 60_000);
  if (Number.isNaN(t.getTime()) || t.getTime() > Date.now() + 864e5 * 366) return "That date doesn't look right.";
  return t;
}

function mediaOk(uid: string, sessionUuid: string, media: UploadedMedia[]) {
  return media.every((x) =>
    !x.path.includes("..") &&
    (x.kind === "video"
      ? x.path.startsWith(`${uid}/sessions/${sessionUuid}/video.`)
      : UUID.test(x.uuid) && x.path.startsWith(`${uid}/targets/${x.uuid}.`)),
  );
}

async function lookups(supabase: SupabaseClient, input: SessionInput) {
  const [firearm, lot, drill] = await Promise.all([
    input.firearmId ? supabase.from("firearms").select("uuid, name, caliber").eq("uuid", input.firearmId).maybeSingle() : null,
    input.ammoLotUuid ? supabase.from("ammo_lots").select("uuid, brand, product_name, grain, caliber").eq("uuid", input.ammoLotUuid).maybeSingle() : null,
    input.drillId ? supabase.from("custom_drills").select("uuid").eq("uuid", input.drillId).maybeSingle() : null,
  ]);
  if (input.firearmId && !firearm?.data) return "That firearm isn't in your armory.";
  if (input.ammoLotUuid && !lot?.data) return "That ammo isn't in your inventory.";
  return { firearm: firearm?.data ?? null, lot: lot?.data ?? null, drill: drill?.data ?? null };
}

function targetRows(uid: string, sessionUuid: string, photos: UploadedMedia[], distance: number | null, unit: string, drillId: string | null) {
  const now = new Date().toISOString();
  return photos.map((p) => ({
    uuid: p.uuid,
    session_id: sessionUuid,
    user_id: uid,
    cloud_image_path: p.path,
    image_type: p.kind === "social" ? "social" : "target",
    distance,
    distance_unit: distance != null ? unit : null,
    drill_id: drillId,
    created_at: now,
    updated_at: now,
  }));
}

async function refreshFirearms(supabase: SupabaseClient, ids: (string | null | undefined)[]) {
  const list = [...new Set(ids.filter((x): x is string => !!x))];
  if (!list.length) return;
  const { error } = await supabase.rpc("web_refresh_firearm_stats", { p_firearm_ids: list });
  if (error) console.error("refresh firearm stats failed", error.code);
}

export async function createSession(supabase: SupabaseClient, uid: string, input: SessionInput): Promise<Result> {
  if (!UUID.test(input.sessionUuid)) return { error: "Something went wrong. Reload the page and try again." };
  const t = when(input);
  if (typeof t === "string") return { error: t };
  const l = await lookups(supabase, input);
  if (typeof l === "string") return { error: l };
  if (!mediaOk(uid, input.sessionUuid, input.media)) return { error: "One of the uploads didn't finish. Remove it and try again." };

  const now = new Date().toISOString();
  const distance = num(input.distance, 5000);
  const video = input.media.find((x) => x.kind === "video");
  const { error } = await supabase.from("sessions").insert({
    uuid: input.sessionUuid,
    user_id: uid,
    date_time: t.toISOString(),
    name: null,
    range_name: text(input.rangeName, 120),
    firearm_id: l.firearm?.uuid ?? null,
    firearm_label: l.firearm?.name ?? null,
    caliber: l.firearm?.caliber ?? l.lot?.caliber ?? null,
    distance,
    distance_unit: distance != null ? input.distanceUnit : null,
    distances: distance != null ? [distance] : [],
    round_count: num(input.rounds, 100000),
    drill_id: l.drill?.uuid ?? null,
    cost: num(input.cost, 100000),
    ammo_lot_uuid: l.lot?.uuid ?? null,
    ammo_deducted: l.lot ? 0 : null,
    ammo_brand: l.lot?.brand ?? null,
    ammo_product: l.lot?.product_name ?? null,
    ammo_grain: l.lot?.grain ?? null,
    went_well: text(input.wentWell, 2000),
    needs_work: text(input.needsWork, 2000),
    focus_next: text(input.focusNext, 2000),
    notes: text(input.notes, 4000),
    buddy_ids: [],
    other_image_paths: [],
    cloud_other_image_paths: [],
    cloud_video_path: video?.path ?? null,
    video_duration_seconds: video?.durationSeconds ?? null,
    is_match: false,
    created_at: now,
    updated_at: now,
  });
  if (error) {
    console.error("create session failed", error.code);
    return { error: error.code === "23505" ? "This session was already saved." : "Couldn't save the session. Try again." };
  }
  const photos = input.media.filter((x) => x.kind !== "video");
  if (photos.length) {
    const r = await supabase.from("targets").insert(targetRows(uid, input.sessionUuid, photos, distance, input.distanceUnit, l.drill?.uuid ?? null));
    if (r.error) console.error("create targets failed", r.error.code);
  }
  await refreshFirearms(supabase, [l.firearm?.uuid]);
  return { uuid: input.sessionUuid };
}

export async function updateSession(supabase: SupabaseClient, uid: string, input: SessionInput): Promise<Result> {
  const { data: current } = await supabase
    .from("sessions")
    .select("uuid, firearm_id, ammo_lot_uuid, ammo_deducted, round_count, is_match, cloud_video_path")
    .eq("uuid", input.sessionUuid)
    .maybeSingle();
  if (!current) return { error: "That session isn't in your account any more." };
  const t = when(input);
  if (typeof t === "string") return { error: t };
  const l = await lookups(supabase, input);
  if (typeof l === "string") return { error: l };
  if (!mediaOk(uid, input.sessionUuid, input.media)) return { error: "One of the uploads didn't finish. Remove it and try again." };

  const locks = editLocks(current);
  const distance = num(input.distance, 5000);
  const patch: Record<string, unknown> = {
    date_time: t.toISOString(),
    range_name: text(input.rangeName, 120),
    firearm_id: l.firearm?.uuid ?? null,
    firearm_label: l.firearm?.name ?? null,
    caliber: l.firearm?.caliber ?? l.lot?.caliber ?? null,
    distance,
    distance_unit: distance != null ? input.distanceUnit : null,
    distances: distance != null ? [distance] : [],
    drill_id: l.drill?.uuid ?? null,
    cost: num(input.cost, 100000),
    went_well: text(input.wentWell, 2000),
    needs_work: text(input.needsWork, 2000),
    focus_next: text(input.focusNext, 2000),
    notes: text(input.notes, 4000),
    updated_at: new Date().toISOString(),
  };
  if (!locks.roundsLocked) {
    // Nothing was deducted, so the web may change rounds and the lot; it
    // still deducts nothing (0, never null).
    patch.round_count = num(input.rounds, 100000);
    patch.ammo_lot_uuid = l.lot?.uuid ?? null;
    patch.ammo_deducted = l.lot ? 0 : null;
    patch.ammo_brand = l.lot?.brand ?? null;
    patch.ammo_product = l.lot?.product_name ?? null;
    patch.ammo_grain = l.lot?.grain ?? null;
  }
  const newVideo = input.media.find((x) => x.kind === "video");
  const oldVideo = current.cloud_video_path as string | null;
  if (newVideo) {
    patch.cloud_video_path = newVideo.path;
    patch.video_duration_seconds = newVideo.durationSeconds ?? null;
  } else if (input.removeVideo) {
    patch.cloud_video_path = null;
    patch.video_duration_seconds = null;
  }

  const { error } = await supabase.from("sessions").update(patch).eq("uuid", input.sessionUuid);
  if (error) {
    console.error("update session failed", error.code);
    return { error: "Couldn't save your changes. Try again." };
  }

  // Removed photos: delete the rows (tombstoned for the phone), then the files.
  const remove = (input.removeTargetUuids ?? []).filter((x) => UUID.test(x) || /^[\w-]{1,64}$/.test(x));
  if (remove.length) {
    const { data: gone } = await supabase
      .from("targets")
      .delete()
      .eq("session_id", input.sessionUuid)
      .in("uuid", remove)
      .select("cloud_image_path");
    await removeObjects(supabase, uid, "target-images", (gone ?? []).map((g) => g.cloud_image_path as string | null));
  }
  const photos = input.media.filter((x) => x.kind !== "video");
  if (photos.length) {
    const r = await supabase.from("targets").insert(targetRows(uid, input.sessionUuid, photos, distance, input.distanceUnit, l.drill?.uuid ?? null));
    if (r.error) console.error("add targets failed", r.error.code);
  }
  if (oldVideo && (newVideo ? newVideo.path !== oldVideo : input.removeVideo)) {
    await removeObjects(supabase, uid, "video-vault", [oldVideo]);
  }
  await refreshFirearms(supabase, [current.firearm_id as string | null, l.firearm?.uuid]);
  return { uuid: input.sessionUuid };
}

export async function deleteSession(supabase: SupabaseClient, uid: string, sessionUuid: string): Promise<{ error: string } | { ok: true }> {
  const { data, error } = await supabase.rpc("web_delete_session", { p_uuid: sessionUuid });
  if (error) {
    console.error("delete session failed", error.code);
    return { error: error.code === "PGRST202" ? "Deleting isn't switched on yet." : "Couldn't delete the session. Try again." };
  }
  const res = data as { deleted: boolean; target_paths?: string[]; video_path?: string | null; other_paths?: string[] };
  if (!res?.deleted) return { error: "That session isn't in your account any more." };
  // Files after the rows: a failed file delete leaves an orphan the
  // media-retention job can find, never a row pointing at nothing.
  await Promise.all([
    removeObjects(supabase, uid, "target-images", res.target_paths ?? []),
    removeObjects(supabase, uid, "video-vault", [res.video_path ?? null]),
    removeObjects(supabase, uid, "other-images", res.other_paths ?? []),
  ]);
  return { ok: true };
}

async function removeObjects(supabase: SupabaseClient, uid: string, bucket: string, paths: (string | null | undefined)[]) {
  const own = paths.filter((p): p is string => !!p && p.startsWith(`${uid}/`) && !p.includes(".."));
  if (!own.length) return;
  const { error } = await supabase.storage.from(bucket).remove(own);
  if (error) console.error(`remove ${bucket} objects failed`, error.message);
}
