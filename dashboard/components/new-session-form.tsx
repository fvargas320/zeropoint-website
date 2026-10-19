"use client";

import { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { extOf, type NewSessionInput, PHOTO_MAX, PHOTO_TYPES, type UploadedMedia, VIDEO_MAX, VIDEO_TYPES } from "@/lib/new-session";
import type { AmmoLotRow, DrillRow, FirearmRow, PresetRow, RangeRow } from "@/lib/types";

interface Item {
  id: string;
  file: File;
  preview: string;
  kind: "target" | "social" | "video";
  state: "uploading" | "done" | "error";
  progress: number;
  media?: UploadedMedia;
  error?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/// Web round 5 "Log a session": one page, four blocks. Files upload straight
/// to Storage under the member's own folder while they fill in the rest; the
/// save action then writes the session and its target rows.
export function NewSessionForm({ uid, firearms, ammo, drills, ranges, presets, save, preview, cancelHref }: {
  uid: string;
  firearms: FirearmRow[];
  ammo: AmmoLotRow[];
  drills: DrillRow[];
  ranges: RangeRow[];
  presets: PresetRow[];
  save?: (input: NewSessionInput) => Promise<{ error: string } | void>;
  preview?: boolean;
  cancelHref: string;
}) {
  const now = new Date();
  const sessionUuid = useMemo(() => crypto.randomUUID(), []);
  const [f, setF] = useState({
    date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    rangeName: "", firearmId: "", ammoLotUuid: "", rounds: "", distance: "", distanceUnit: "yards" as "yards" | "meters",
    drillId: "", cost: "", wentWell: "", needsWork: "", focusNext: "", notes: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const firearm = firearms.find((x) => x.uuid === f.firearmId);
  const lots = firearm?.caliber ? [...ammo].sort((a, b) => Number(b.caliber === firearm.caliber) - Number(a.caliber === firearm.caliber)) : ammo;

  function applyPreset(id: string) {
    const p = presets.find((x) => x.uuid === id);
    if (!p) return;
    setF((s) => ({
      ...s,
      rangeName: p.range_name ?? s.rangeName,
      firearmId: p.firearm_id && firearms.some((x) => x.uuid === p.firearm_id) ? p.firearm_id : s.firearmId,
      distance: p.distance != null ? String(p.distance) : s.distance,
      distanceUnit: p.distance_unit === "meters" ? "meters" : "yards",
      drillId: p.drill_id ?? s.drillId,
    }));
  }

  async function upload(item: Item) {
    const update = (patch: Partial<Item>) => setItems((xs) => xs.map((x) => (x.id === item.id ? { ...x, ...patch } : x)));
    if (preview) {
      update({ state: "done", progress: 100 });
      return;
    }
    const isVideo = item.kind === "video";
    const targetUuid = isVideo ? sessionUuid : crypto.randomUUID();
    // Same paths the app writes (supabase_sync_service.dart).
    const path = isVideo ? `${uid}/sessions/${sessionUuid}/video.${extOf(item.file)}` : `${uid}/targets/${targetUuid}.${extOf(item.file)}`;
    const bucket = isVideo ? "video-vault" : "target-images";
    update({ progress: 15 });
    const { error } = await createClient().storage.from(bucket).upload(path, item.file, { contentType: item.file.type || undefined, upsert: false });
    if (error) {
      update({ state: "error", error: "Upload failed" });
      return;
    }
    let durationSeconds: number | undefined;
    if (isVideo) {
      durationSeconds = await new Promise<number | undefined>((resolve) => {
        const v = document.createElement("video");
        v.preload = "metadata";
        v.onloadedmetadata = () => resolve(Number.isFinite(v.duration) ? Math.round(v.duration) : undefined);
        v.onerror = () => resolve(undefined);
        v.src = item.preview;
      });
    }
    update({ state: "done", progress: 100, media: { kind: item.kind, uuid: targetUuid, path, durationSeconds } });
  }

  function addFiles(files: FileList | File[]) {
    setError(null);
    const next: Item[] = [];
    for (const file of Array.from(files)) {
      const isVideo = VIDEO_TYPES.includes(file.type);
      const isPhoto = PHOTO_TYPES.includes(file.type) || /\.(heic|heif)$/i.test(file.name);
      if (!isVideo && !isPhoto) { setError(`${file.name}: use JPEG, PNG or HEIC photos, or an MP4/MOV video.`); continue; }
      if (isVideo && (file.size > VIDEO_MAX)) { setError(`${file.name} is over 50 MB. Trim it on your phone, or attach it there.`); continue; }
      if (isPhoto && file.size > PHOTO_MAX) { setError(`${file.name} is over 15 MB.`); continue; }
      if (isVideo && (items.some((x) => x.kind === "video") || next.some((x) => x.kind === "video"))) { setError("One video per session."); continue; }
      next.push({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file), kind: isVideo ? "video" : "target", state: "uploading", progress: 5 });
    }
    setItems((xs) => [...xs, ...next]);
    next.forEach(upload);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!save) return;
    if (items.some((x) => x.state === "uploading")) { setError("Wait for the uploads to finish."); return; }
    setBusy(true);
    setError(null);
    const media = items.filter((x) => x.state === "done" && x.media).map((x) => ({ ...x.media!, kind: x.kind }));
    const res = await save({ sessionUuid, ...f, tzOffsetMinutes: new Date().getTimezoneOffset(), media });
    if (res && "error" in res) { setError(res.error); setBusy(false); }
  }

  return (
    <form onSubmit={submit}>
      <div className="page-head">
        <h1>Log a session</h1>
        <div className="spacer" />
        {presets.length > 0 && (
          <select className="chip" defaultValue="" onChange={(e) => applyPreset(e.target.value)} aria-label="Start from a preset">
            <option value="">Start from a preset</option>
            {presets.map((p) => <option key={p.uuid} value={p.uuid}>{p.name}</option>)}
          </select>
        )}
      </div>

      <section className="card formcard">
        <h2>When and where</h2>
        <div className="fields" style={{ marginTop: 12 }}>
          <div className="field"><label htmlFor="date">Date</label><input id="date" type="date" required value={f.date} onChange={set("date")} /></div>
          <div className="field"><label htmlFor="time">Time</label><input id="time" type="time" required value={f.time} onChange={set("time")} /></div>
          <div className="field">
            <label htmlFor="range">Range <span className="hint">optional</span></label>
            <input id="range" list="ranges" value={f.rangeName} onChange={set("rangeName")} maxLength={120} />
            <datalist id="ranges">{ranges.map((r) => <option key={r.uuid} value={r.name} />)}</datalist>
          </div>
        </div>
      </section>

      <section className="card formcard">
        <h2>What you shot</h2>
        <div className="fields" style={{ marginTop: 12 }}>
          <div className="field">
            <label htmlFor="firearm">Firearm</label>
            <select id="firearm" value={f.firearmId} onChange={set("firearmId")}>
              <option value="">None</option>
              {firearms.map((x) => <option key={x.uuid} value={x.uuid}>{x.name}{x.caliber ? ` · ${x.caliber}` : ""}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="ammo">Ammo <span className="hint">optional</span></label>
            <select id="ammo" value={f.ammoLotUuid} onChange={set("ammoLotUuid")}>
              <option value="">None</option>
              {lots.map((a) => <option key={a.uuid} value={a.uuid}>{a.caliber} · {[a.brand, a.product_name].filter(Boolean).join(" ")}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="rounds">Rounds</label><input id="rounds" inputMode="numeric" pattern="[0-9]*" value={f.rounds} onChange={set("rounds")} maxLength={6} /></div>
          <div className="field">
            <label htmlFor="distance">Distance</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input id="distance" inputMode="decimal" value={f.distance} onChange={set("distance")} style={{ flex: 1, minWidth: 0 }} maxLength={6} />
              <select aria-label="Unit" value={f.distanceUnit} onChange={set("distanceUnit")}><option value="yards">yd</option><option value="meters">m</option></select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="drill">Drill <span className="hint">optional</span></label>
            <select id="drill" value={f.drillId} onChange={set("drillId")}>
              <option value="">None</option>
              {drills.map((d) => <option key={d.uuid} value={d.uuid}>{d.name}</option>)}
            </select>
          </div>
          <div className="field"><label htmlFor="cost">Cost <span className="hint">optional, $</span></label><input id="cost" inputMode="decimal" value={f.cost} onChange={set("cost")} maxLength={8} /></div>
        </div>
        <p className="quiet" style={{ margin: "12px 0 0", fontSize: 13 }}>Rounds aren&apos;t taken off your ammo here. Do that on your phone.</p>
      </section>

      <section className="card formcard">
        <h2>Photos and video</h2>
        <label
          className={`dropzone${over ? " over" : ""}`}
          style={{ marginTop: 12 }}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
        >
          Drop target photos or a video here, or <span className="link">browse</span>
          <br /><span className="quiet" style={{ fontSize: 13 }}>Photos up to 15 MB (JPEG, PNG, HEIC) · one video up to 50 MB (MP4, MOV)</span>
          <input ref={input} type="file" multiple accept={[...PHOTO_TYPES, ...VIDEO_TYPES, ".heic"].join(",")} hidden onChange={(e) => e.target.files && addFiles(e.target.files)} />
        </label>
        {items.length > 0 && (
          <div className="uploads">
            {items.map((x) => (
              <div key={x.id} className="upload">
                {x.kind === "video" ? <video src={x.preview} muted /> : <img src={x.preview} alt="" />}
                <div className="meta">
                  {x.kind === "video" ? <span>Video</span> : (
                    <button type="button" onClick={() => setItems((xs) => xs.map((y) => (y.id === x.id ? { ...y, kind: y.kind === "target" ? "social" : "target" } : y)))}>
                      {x.kind === "target" ? "Target" : "Photo"}
                    </button>
                  )}
                  <span>{x.state === "uploading" ? "Uploading…" : x.state === "error" ? x.error : "Ready"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="quiet" style={{ margin: "10px 0 0", fontSize: 13 }}>Group size and shot holes are measured on your phone: open the session there and tap Analyze.</p>
      </section>

      <section className="card formcard">
        <h2>Notes</h2>
        <div className="fields" style={{ marginTop: 12 }}>
          <div className="field"><label htmlFor="ww">Went well</label><textarea id="ww" value={f.wentWell} onChange={set("wentWell")} maxLength={2000} /></div>
          <div className="field"><label htmlFor="nw">Needs work</label><textarea id="nw" value={f.needsWork} onChange={set("needsWork")} maxLength={2000} /></div>
          <div className="field"><label htmlFor="fn">Focus next</label><textarea id="fn" value={f.focusNext} onChange={set("focusNext")} maxLength={2000} /></div>
        </div>
      </section>

      {error && <div className="notice warn" role="alert" style={{ marginBottom: 12 }}>{error}</div>}
      <div className="savebar">
        <a className="pill" href={cancelHref}>Cancel</a>
        <button className="pill brand" disabled={busy || !save}>{busy ? "Saving…" : preview ? "Save (preview)" : "Save session"}</button>
      </div>
    </form>
  );
}
