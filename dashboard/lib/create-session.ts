import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { NewSessionInput } from "@/lib/new-session";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const num = (v: string, max: number) => {
  const n = Number(v.replace(",", "."));
  return v.trim() && Number.isFinite(n) && n >= 0 && n <= max ? n : null;
};
const text = (v: string, max: number) => (v.trim() ? v.trim().slice(0, max) : null);

/// Writes a web-logged session in the same shape the app writes
/// (Session.toSupabaseJson / Target.toSupabaseJson), so the phone's normal
/// sync pulls it in. Rules (proposal §7):
/// - `ammo_deducted = 0` when a lot is named: the web never touches
///   inventory, and 0 (not null) stops the phone from "giving back" rounds
///   it never took when the session is later edited or deleted.
/// - Media paths must sit in the member's own folders.
export async function createSession(supabase: SupabaseClient, uid: string, input: NewSessionInput): Promise<{ error: string } | { uuid: string }> {
  if (!UUID.test(input.sessionUuid)) return { error: "Something went wrong. Reload the page and try again." };
  const [y, m, d] = input.date.split("-").map(Number);
  const [hh, mm] = input.time.split(":").map(Number);
  if (!y || !m || !d || hh == null || mm == null) return { error: "Pick a date and time." };
  // Local wall-clock time in the member's browser → UTC instant.
  const when = new Date(Date.UTC(y, m - 1, d, hh, mm) + input.tzOffsetMinutes * 60_000);
  if (Number.isNaN(when.getTime()) || when.getTime() > Date.now() + 864e5 * 366) return { error: "That date doesn't look right." };

  const [firearm, lot, drill] = await Promise.all([
    input.firearmId ? supabase.from("firearms").select("uuid, name, caliber").eq("uuid", input.firearmId).maybeSingle() : null,
    input.ammoLotUuid ? supabase.from("ammo_lots").select("uuid, brand, product_name, grain, caliber").eq("uuid", input.ammoLotUuid).maybeSingle() : null,
    input.drillId ? supabase.from("custom_drills").select("uuid").eq("uuid", input.drillId).maybeSingle() : null,
  ]);
  if (input.firearmId && !firearm?.data) return { error: "That firearm isn't in your armory." };
  if (input.ammoLotUuid && !lot?.data) return { error: "That ammo isn't in your inventory." };

  const photos = input.media.filter((x) => x.kind !== "video");
  const video = input.media.find((x) => x.kind === "video");
  for (const x of input.media) {
    const ok = x.kind === "video"
      ? x.path.startsWith(`${uid}/sessions/${input.sessionUuid}/video.`)
      : UUID.test(x.uuid) && x.path.startsWith(`${uid}/targets/${x.uuid}.`);
    if (!ok || x.path.includes("..")) return { error: "One of the uploads didn't finish. Remove it and try again." };
  }

  const now = new Date().toISOString();
  const rounds = num(input.rounds, 100000);
  const distance = num(input.distance, 5000);
  const session = {
    uuid: input.sessionUuid,
    user_id: uid,
    date_time: when.toISOString(),
    name: null,
    range_name: text(input.rangeName, 120),
    firearm_id: firearm?.data?.uuid ?? null,
    firearm_label: firearm?.data?.name ?? null,
    caliber: firearm?.data?.caliber ?? lot?.data?.caliber ?? null,
    distance,
    distance_unit: distance != null ? input.distanceUnit : null,
    distances: distance != null ? [distance] : [],
    round_count: rounds,
    drill_id: drill?.data?.uuid ?? null,
    cost: num(input.cost, 100000),
    ammo_lot_uuid: lot?.data?.uuid ?? null,
    ammo_deducted: lot?.data ? 0 : null,
    ammo_brand: lot?.data?.brand ?? null,
    ammo_product: lot?.data?.product_name ?? null,
    ammo_grain: lot?.data?.grain ?? null,
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
  };
  const { error } = await supabase.from("sessions").insert(session);
  if (error) {
    console.error("create session failed", error.code);
    return { error: error.code === "23505" ? "This session was already saved." : "Couldn't save the session. Try again." };
  }
  if (photos.length) {
    const rows = photos.map((p) => ({
      uuid: p.uuid,
      session_id: input.sessionUuid,
      user_id: uid,
      cloud_image_path: p.path,
      image_type: p.kind === "social" ? "social" : "target",
      distance,
      distance_unit: distance != null ? input.distanceUnit : null,
      drill_id: drill?.data?.uuid ?? null,
      created_at: now,
      updated_at: now,
    }));
    const t = await supabase.from("targets").insert(rows);
    if (t.error) console.error("create targets failed", t.error.code);
  }
  return { uuid: input.sessionUuid };
}
