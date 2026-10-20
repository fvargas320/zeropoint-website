import type { PlanMatch, PlanShooter, QueueRow, RowState } from "./types";

/// A row's id on the list: its shooter key plus division, since one
/// competitor entered in two divisions has two rows with the same key.
export const sid = (s: PlanShooter) => `${s.key}|${s.division ?? ""}`;

/// Rows for a fresh plan, keeping what the user already chose for a match
/// that was on the list before (same key).
export function rowsFromPlan(matches: PlanMatch[], previous: QueueRow[]): QueueRow[] {
  const before = new Map(previous.map((r) => [r.match.key, r]));
  return matches.map((m) => {
    const old = before.get(m.key);
    const keepPick = old && old.matchedBy === "your pick" && m.shooters.some((s) => sid(s) === old.shooterKey);
    return {
      match: m,
      shooterKey: keepPick ? old.shooterKey : m.me ? sid(m.me) : null,
      matchedBy: keepPick ? "your pick" : m.matchedBy,
      rounds: old?.rounds ?? "",
      checked: old?.checked ?? false,
      // Found by a number the user gave: theirs. A pick is not a claim.
      rememberMember: keepPick ? old.rememberMember : m.matchedBy === "member number",
      state: old && old.state.kind !== "ready" && old.state.kind !== "review" ? old.state : { kind: "ready" },
    };
  });
}

export function shooterOf(row: QueueRow): PlanShooter | null {
  return row.match.shooters.find((s) => sid(s) === row.shooterKey) ?? null;
}

/// Ready, or what still needs the user, unless the row is done, adding,
/// a duplicate or failed. Amber PDF values block Add until checked, as
/// `result.blocking` does on the phone; rounds are always confirmed.
export function stateOf(row: QueueRow): RowState {
  if (row.state.kind !== "ready" && row.state.kind !== "review") return row.state;
  if (!row.shooterKey) return { kind: "review", why: "Pick yourself" };
  if (row.match.checks.length && !row.checked) {
    const n = row.match.checks.length;
    return { kind: "review", why: `${n} value${n === 1 ? "" : "s"} to check` };
  }
  if (!/^\d+$/.test(row.rounds.trim())) return { kind: "review", why: "Confirm rounds" };
  return { kind: "ready" };
}

/// "Use this for every file from this body": the same shooter (member
/// number, else name; the same division when they shot several) on every
/// other match of [body] still without one.
export function applyToBody(rows: QueueRow[], body: string | null, picked: PlanShooter): QueueRow[] {
  return rows.map((r) => {
    if (r.match.body !== body || r.shooterKey) return r;
    const same = r.match.shooters.filter((s) => s.key === picked.key);
    const hit = same.find((s) => s.division === picked.division) ?? same[0];
    return hit ? { ...r, shooterKey: sid(hit), matchedBy: "your pick", rememberMember: false } : r;
  });
}

/// Bodies on the list with no member number on file yet: the "Found you"
/// step asks for these.
export function bodiesMissingNumbers(rows: QueueRow[], numbers: Record<string, string>): string[] {
  const out = new Set<string>();
  for (const r of rows) {
    const b = r.match.body;
    if (b && !numbers[b]?.trim()) out.add(b);
  }
  return [...out];
}

export const BODY_LABEL: Record<string, string> = {
  uspsa: "USPSA",
  idpa: "IDPA",
  scsa: "Steel Challenge",
  prs: "PRS",
  nrl22: "NRL22",
};

export function formatDate(iso: string | null): string {
  if (!iso) return "No date";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export const BASIS_LABEL: Record<string, string> = {
  minimum: "stage minimums + 5%",
  hits: "hits in the file",
  typed: "what you typed",
  none: "",
};

/// Why a file could not be read, in plain words (MatchImportError).
export function failureText(code: string): string {
  switch (code) {
    case "needsAi": return "A scan or photo: read it with AI in the app";
    case "missingPair": return "Needs its other half (match_def.json with match_scores.json)";
    case "indexPage": return "A results index page: save the match's own page";
    case "practiceLog": return "A practice log, not match results";
    case "empty": return "No shooter rows in this file";
    case "unrecognisedFormat": return "Not a results file ZeroPoint can read";
    case "tooLarge": return "Over 8 MB";
    default: return "Couldn't read this file";
  }
}
