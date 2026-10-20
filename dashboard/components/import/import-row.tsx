"use client";

import Link from "next/link";
import { BASIS_LABEL, BODY_LABEL, formatDate, shooterOf, sid } from "@/lib/import/queue";
import type { PlanShooter, QueueRow, RowState } from "@/lib/import/types";

const STATUS: Record<RowState["kind"], string> = {
  ready: "Parsed",
  review: "Needs review",
  duplicate: "Duplicate",
  adding: "Adding…",
  added: "Added",
  error: "Failed",
};

function label(s: PlanShooter): string {
  const bits = [s.division, s.memberNumber].filter(Boolean).join(" · ");
  return bits ? `${s.name} (${bits})` : s.name;
}

function result(s: PlanShooter | null): string {
  if (!s) return "—";
  if (s.dq) return "DQ";
  const place = s.place ? `${s.place}${s.ofCompetitors ? ` of ${s.ofCompetitors}` : ""}` : "";
  const pct = s.percent != null ? `${s.percent.toFixed(2)}%` : "";
  return [place, pct].filter(Boolean).join(" · ") || "—";
}

/// One match on the import queue: who you are in it, its status and the
/// rounds you confirm.
export function ImportRow({ row, state, base, savedNumber, onRemember, onPick, onPickForAll, onRounds, onChecked, onRemove }: {
  row: QueueRow;
  state: RowState;
  base: string;
  savedNumber: string | null;
  onRemember: (remember: boolean) => void;
  onPick: (shooterKey: string) => void;
  onPickForAll: (shooter: PlanShooter) => void;
  onRounds: (rounds: string) => void;
  onChecked: (checked: boolean) => void;
  onRemove: () => void;
}) {
  const m = row.match;
  const me = shooterOf(row);
  const locked = state.kind === "added" || state.kind === "adding" || state.kind === "duplicate";
  const likelyKeys = new Set(m.likely.map(sid));
  const rest = m.shooters.filter((s) => !likelyKeys.has(sid(s))).sort((a, b) => a.name.localeCompare(b.name));
  const { suggested, basis } = m.rounds;

  return (
    <tr data-state={state.kind}>
      <td className="name">
        <div className="match-name">{m.matchName}</div>
        <div className="quiet match-meta">
          {formatDate(m.matchDate)} · {m.disciplineLabel} · {m.shooterCount} shooter{m.shooterCount === 1 ? "" : "s"}
          {m.stageCount > 0 && <> · {m.stageCount} stage{m.stageCount === 1 ? "" : "s"}</>}
          {m.backfill && <> · history</>}
        </div>
        <div className="quiet match-files" title={m.files.join("\n")}>{m.files.length === 1 ? m.files[0] : `${m.files.length} files`}</div>
      </td>
      <td>
        <span className={`status ${state.kind}`}>{STATUS[state.kind]}</span>
        {state.kind === "review" && <div className="quiet status-why">{state.why}</div>}
        {state.kind === "duplicate" && (
          <div className="quiet status-why">
            {state.why === "file" ? "These files are already in" : "This match is already in"}
            {state.sessionUuid && <> · <Link className="link" href={`${base}/sessions?id=${state.sessionUuid}`}>Open</Link></>}
          </div>
        )}
        {state.kind === "added" && <div className="status-why"><Link className="link" href={`${base}/sessions?id=${state.sessionUuid}`}>Open match</Link></div>}
        {state.kind === "error" && <div className="quiet status-why">{state.message}</div>}
        {m.checks.length > 0 && !locked && (
          <details className="checks">
            <summary>{m.checks.length} value{m.checks.length === 1 ? "" : "s"} to check</summary>
            <ul>
              {m.checks.map((c) => <li key={c.path}>{c.reason ?? c.path}{c.text && <span className="quiet"> · reads “{c.text}”</span>}</li>)}
            </ul>
            <label className="check">
              <input type="checkbox" checked={row.checked} onChange={(e) => onChecked(e.target.checked)} /> I checked these against the PDF
            </label>
          </details>
        )}
      </td>
      <td className="you">
        <select
          className="chip"
          aria-label={`You in ${m.matchName}`}
          value={row.shooterKey ?? ""}
          disabled={locked}
          onChange={(e) => e.target.value && onPick(e.target.value)}
        >
          {!row.shooterKey && <option value="">Pick yourself…</option>}
          {m.likely.length > 0 && (
            <optgroup label="Likely you">
              {m.likely.map((s) => <option key={sid(s)} value={sid(s)}>{label(s)}</option>)}
            </optgroup>
          )}
          <optgroup label="Everyone">
            {(m.likely.length ? rest : m.shooters).map((s) => <option key={sid(s)} value={sid(s)}>{label(s)}</option>)}
          </optgroup>
        </select>
        {row.matchedBy && row.shooterKey && (
          <div className="quiet you-how">
            {row.matchedBy === "your pick" ? "Picked by you" : `Found by ${row.matchedBy}`}
            {row.matchedBy === "your pick" && !locked && m.body && (
              <> · <button type="button" className="textbutton inline" onClick={() => me && onPickForAll(me)}>Use for all files from this body</button></>
            )}
          </div>
        )}
        {me?.memberLooksReal && m.body && row.matchedBy !== "member number" && me.memberNumber !== savedNumber && !locked && (
          <label className="check remember">
            <input type="checkbox" checked={row.rememberMember} onChange={(e) => onRemember(e.target.checked)} />
            Save {me.memberNumber} as my {BODY_LABEL[m.body] ?? m.body} number
          </label>
        )}
      </td>
      <td className="num">{result(me)}</td>
      <td className="rounds">
        <input
          className="rounds-input"
          inputMode="numeric"
          aria-label={`Rounds fired at ${m.matchName}`}
          value={row.rounds}
          disabled={locked}
          placeholder={basis === "none" ? "Rounds" : String(suggested)}
          onChange={(e) => onRounds(e.target.value.replace(/[^\d]/g, ""))}
        />
        {basis === "none" && !locked && !row.rounds && (
          <div className="quiet rounds-hint">This file doesn&apos;t list rounds: type yours</div>
        )}
        {basis !== "none" && !locked && (
          <div className="quiet rounds-hint">
            {suggested} from {BASIS_LABEL[basis]}
            {row.rounds !== String(suggested) && <> · <button type="button" className="textbutton inline" onClick={() => onRounds(String(suggested))}>Use</button></>}
          </div>
        )}
      </td>
      <td>
        {state.kind !== "added" && state.kind !== "adding" && (
          <button type="button" className="textbutton" aria-label={`Remove ${m.matchName}`} title="Remove" onClick={onRemove}>✕</button>
        )}
      </td>
    </tr>
  );
}
