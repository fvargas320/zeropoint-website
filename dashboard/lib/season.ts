export interface SeasonMatch {
  id: string;
  date: string; // ISO
  name: string;
  level: string | null;
  division: string | null;
  discipline: string | null;
  place: number | null;
  of: number | null;
  percent: number | null; // 0–100, division match %
  classLetter: string | null;
  rounds: number | null;
  dq: boolean;
}

/// One row of `public.sessions` where is_match = true. `match_result_json`
/// is the app's MatchResult.toJson() (lib/features/competition/models/match_result.dart).
export type SessionRow = Pick<
  import("@/lib/types").SessionRow,
  "uuid" | "date_time" | "match_name" | "name" | "match_level" | "division" | "discipline" | "round_count" | "match_result_json"
>;

export function fromSessionRow(row: SessionRow): SeasonMatch {
  let r: Record<string, unknown> = {};
  try {
    r = row.match_result_json ? (JSON.parse(row.match_result_json) as Record<string, unknown>) : {};
  } catch {
    r = {};
  }
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  return {
    id: row.uuid,
    date: row.date_time,
    name: row.match_name || row.name || "Match",
    level: row.match_level,
    division: row.division,
    discipline: row.discipline,
    place: num(r.place),
    of: num(r.ofCompetitors),
    percent: num(r.percent),
    classLetter: typeof r.classLetter === "string" ? r.classLetter : null,
    rounds: row.round_count,
    dq: r.dq === true,
  };
}

export function summarize(matches: SeasonMatch[]) {
  const scored = matches.filter((m) => m.percent != null);
  const avg = scored.length ? scored.reduce((s, m) => s + (m.percent ?? 0), 0) / scored.length : null;
  const placed = matches.filter((m) => m.place != null);
  const best = placed.reduce<SeasonMatch | null>((b, m) => (!b || (m.place ?? 1e9) < (b.place ?? 1e9) ? m : b), null);
  return { count: matches.length, avg, best };
}

export function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}
