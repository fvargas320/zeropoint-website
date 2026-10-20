"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { FoundYou } from "@/components/import/found-you";
import { ImportRow } from "@/components/import/import-row";
import { createClient } from "@/lib/supabase/client";
import { ACCEPT, MAX_FILE_BYTES, addMatch, contentHash, heldBy, knownSources, planInWorker, readDropped } from "@/lib/import/files";
import { applyToBody, bodiesMissingNumbers, failureText, rowsFromPlan, shooterOf, stateOf } from "@/lib/import/queue";
import type { DroppedFile, PlanFailure, QueueRow } from "@/lib/import/types";

interface Skipped {
  name: string;
  why: string;
}

/// Web bulk import (web-app-proposal §3): drop a season of results files;
/// they're hashed here, files already imported are skipped before any
/// work, the rest are read by the phone's own parsers in a worker and
/// grouped by match. Each match needs "you" and its rounds confirmed;
/// Add sends each one to the import-match function. `preview` (dev
/// design previews) reads files but never queries or writes.
export function ImportPage({ uid, displayName, memberNumbers: saved, preview, base }: {
  uid: string;
  displayName: string | null;
  memberNumbers: Record<string, string>;
  preview?: boolean;
  base: string;
}) {
  const supabase = useMemo(() => (preview ? null : createClient()), [preview]);
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const [rows, setRows] = useState<QueueRow[]>([]);
  const [failed, setFailed] = useState<PlanFailure[]>([]);
  const [skipped, setSkipped] = useState<Skipped[]>([]);
  const [numbers, setNumbers] = useState<Record<string, string>>(saved);
  const [reading, setReading] = useState(0);
  const [adding, setAdding] = useState(false);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ added: number; failed: number } | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function plan(all: DroppedFile[], nums: Record<string, string>, previous: QueueRow[]) {
    const reply = await planInWorker({
      files: all.map((f) => ({ name: f.name, base64: f.base64 })),
      memberNumbers: nums,
      displayName,
      now: new Date().toISOString(),
    });
    if (reply.error) {
      setError(`The results reader failed: ${reply.error}`);
      return;
    }
    let next = rowsFromPlan(reply.matches ?? [], previous);
    setFailed(reply.failed ?? []);
    if (supabase) {
      // "Already in ZeroPoint": the same files as a whole, or the match.
      const fresh = next.filter((r) => r.state.kind === "ready" || r.state.kind === "review");
      const groupHashes = await Promise.all(fresh.map((r) => contentHash(r.match.fileHashes)));
      const known = await knownSources(supabase, uid, groupHashes).catch(() => new Set<string>());
      const held = await Promise.all(fresh.map((r) => heldBy(supabase, uid, r.match).catch(() => null)));
      const dup = new Map(fresh.map((r, i) => [r.match.key, known.has(groupHashes[i]) ? { s: null, why: "file" as const } : held[i] ? { s: held[i], why: "match" as const } : null]));
      next = next.map((r) => {
        const d = dup.get(r.match.key);
        return d ? { ...r, state: { kind: "duplicate", sessionUuid: d.s, why: d.why } } : r;
      });
    }
    setRows(next);
  }

  async function take(list: FileList | File[]) {
    setError(null);
    const picked = Array.from(list);
    setReading((n) => n + picked.length);
    try {
      const skip: Skipped[] = [];
      const read: DroppedFile[] = [];
      for (const f of picked) {
        if (f.size > MAX_FILE_BYTES) skip.push({ name: f.name, why: failureText("tooLarge") });
        else read.push(await readDropped(f));
      }
      const seen = new Set(files.map((f) => f.sha256));
      const unique = read.filter((f) => (seen.has(f.sha256) ? (skip.push({ name: f.name, why: "Dropped twice" }), false) : (seen.add(f.sha256), true)));
      let keep = unique;
      if (supabase && unique.length) {
        // One file is one source: its content hash is sha256 of its sha256.
        const hashes = await Promise.all(unique.map((f) => contentHash([f.sha256])));
        const known = await knownSources(supabase, uid, hashes).catch(() => new Set<string>());
        keep = unique.filter((f, i) => (known.has(hashes[i]) ? (skip.push({ name: f.name, why: "Already imported" }), false) : true));
      }
      setSkipped((s) => [...s, ...skip]);
      const all = [...files, ...keep];
      setFiles(all);
      if (keep.length) await plan(all, numbers, rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't read those files");
    } finally {
      setReading((n) => n - picked.length);
    }
  }

  const update = (key: string, patch: Partial<QueueRow>) => setRows((rs) => rs.map((r) => (r.match.key === key ? { ...r, ...patch } : r)));
  const remove = (key: string) => {
    const row = rows.find((r) => r.match.key === key);
    setRows((rs) => rs.filter((r) => r.match.key !== key));
    if (row) setFiles((fs) => fs.filter((f) => !row.match.files.includes(f.name)));
  };

  const states = rows.map((r) => stateOf(r));
  const ready = rows.filter((_, i) => states[i].kind === "ready");
  const suggestable = rows.filter((r, i) => states[i].kind === "review" && !r.rounds && r.match.rounds.basis !== "none" && r.shooterKey);
  const missing = bodiesMissingNumbers(rows.filter((r) => r.state.kind !== "duplicate" && r.state.kind !== "added"), numbers);

  async function addAll() {
    if (!supabase) return;
    setAdding(true);
    setDone(null);
    let added = 0;
    for (const r of ready) {
      update(r.match.key, { state: { kind: "adding" } });
      const shooter = shooterOf(r)!;
      const res = await addMatch(supabase, files.filter((f) => r.match.files.includes(f.name)), shooter.key, shooter.division, Number(r.rounds), r.match.matchDate, r.rememberMember);
      if (res.ok) added++;
      update(r.match.key, {
        state: res.ok
          ? { kind: "added", sessionUuid: res.sessionUuid }
          : res.status === 409
            ? { kind: "duplicate", sessionUuid: res.sessionUuid ?? null, why: res.duplicate === "file" ? "file" : "match" }
            : { kind: "error", message: res.status === 403 ? "Needs ZeroPoint Pro" : res.error.replaceAll("_", " ") },
      });
    }
    setAdding(false);
    setDone({ added, failed: ready.length - added });
  }

  const counts = {
    ready: ready.length,
    review: states.filter((s) => s.kind === "review").length,
    duplicate: states.filter((s) => s.kind === "duplicate").length + skipped.filter((s) => s.why === "Already imported").length,
    failed: failed.length + states.filter((s) => s.kind === "error").length,
    added: states.filter((s) => s.kind === "added").length,
  };

  return (
    <main className="page">
      <div className="page-head">
        <h1>Import results</h1>
        <span className="quiet">Match files from your computer: .psc, saved results pages, PDFs</span>
        <div className="spacer" />
        <Link className="pill" href={`${base}/matches`}>Done</Link>
      </div>

      <label
        className={`dropzone import-drop${over ? " over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); void take(e.dataTransfer.files); }}
      >
        <input ref={input} type="file" multiple accept={ACCEPT} hidden onChange={(e) => { if (e.target.files) void take(e.target.files); e.target.value = ""; }} />
        <b>Drop results files here</b>
        <span className="muted">or click to choose. A whole season at once is fine; files stay on this computer until you add them.</span>
        {reading > 0 && <span className="quiet">Reading {reading} file{reading === 1 ? "" : "s"}…</span>}
      </label>

      {error && <div className="notice warn" role="alert">{error}</div>}
      {done && (
        <div className={`notice import-done${done.failed ? " warn" : ""}`} role="status">
          {done.added > 0 && <><b>{done.added} match{done.added === 1 ? "" : "es"} added.</b> They&apos;re in Matches now and reach your phone on its next sync. </>}
          {done.failed > 0 && <>{done.failed} couldn&apos;t be added: see the rows below.</>}
          {done.added > 0 && <Link className="link" href={`${base}/matches`}>See your matches</Link>}
        </div>
      )}

      {missing.length > 0 && rows.length > 0 && (
        <FoundYou
          bodies={missing}
          onUse={(body, number) => {
            const nums = { ...numbers, [body]: number };
            setNumbers(nums);
            void plan(files, nums, rows);
          }}
        />
      )}

      {(rows.length > 0 || failed.length > 0 || skipped.length > 0) && (
        <section className="card import-queue">
          <div className="queue-head">
            <p className="summary">
              <b>{rows.length}</b> match{rows.length === 1 ? "" : "es"} from {files.length + skipped.length} file{files.length + skipped.length === 1 ? "" : "s"}
              {counts.ready > 0 && <> · <b>{counts.ready}</b> ready</>}
              {counts.review > 0 && <> · <b>{counts.review}</b> to review</>}
              {counts.duplicate > 0 && <> · {counts.duplicate} already in ZeroPoint</>}
              {counts.failed > 0 && <> · {counts.failed} couldn&apos;t be read</>}
              {counts.added > 0 && <> · <b>{counts.added}</b> added</>}
            </p>
            <div className="spacer" />
            {suggestable.length > 0 && (
              <button type="button" className="pill" onClick={() => setRows((rs) => rs.map((r) => (suggestable.includes(r) ? { ...r, rounds: String(r.match.rounds.suggested) } : r)))}>
                Accept suggested rounds ({suggestable.length})
              </button>
            )}
            <button type="button" className="pill brand" disabled={!ready.length || adding || preview} title={preview ? "Preview: nothing is saved" : undefined} onClick={() => void addAll()}>
              {adding ? "Adding…" : `Add ${ready.length || ""} match${ready.length === 1 ? "" : "es"}`}
            </button>
          </div>
          <div className="table-wrap">
            <table className="data import-table">
              <thead>
                <tr>
                  <th>Match</th>
                  <th>Status</th>
                  <th>You</th>
                  <th className="num">Result</th>
                  <th>Rounds fired</th>
                  <th aria-label="Remove" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <ImportRow
                    key={r.match.key}
                    row={r}
                    state={states[i]}
                    base={base}
                    onPick={(shooterKey) => update(r.match.key, { shooterKey, matchedBy: "your pick", rememberMember: false })}
                    savedNumber={r.match.body ? numbers[r.match.body] ?? null : null}
                    onRemember={(rememberMember) => update(r.match.key, { rememberMember })}
                    onPickForAll={(shooter) => setRows((rs) => applyToBody(rs, r.match.body, shooter))}
                    onRounds={(rounds) => update(r.match.key, { rounds })}
                    onChecked={(checked) => update(r.match.key, { checked })}
                    onRemove={() => remove(r.match.key)}
                  />
                ))}
                {failed.map((f) => (
                  <tr key={`failed-${f.files.join("|")}`} className="row-muted">
                    <td className="name">{f.files.join(", ")}</td>
                    <td><span className="status failed">Couldn&apos;t read</span></td>
                    <td colSpan={4} className="quiet">{failureText(f.code)}</td>
                  </tr>
                ))}
                {skipped.map((s, i) => (
                  <tr key={`skip-${i}`} className="row-muted">
                    <td className="name">{s.name}</td>
                    <td><span className={`status ${s.why === "Already imported" ? "duplicate" : "failed"}`}>{s.why === "Already imported" ? "Duplicate" : "Skipped"}</span></td>
                    <td colSpan={4} className="quiet">{s.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="quiet import-foot">Rounds aren&apos;t taken off your ammo here. Do that on your phone. Matches older than 60 days are added as history: no streaks or goals.</p>
        </section>
      )}
    </main>
  );
}
