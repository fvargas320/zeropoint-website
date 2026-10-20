import type { GoalRow, SessionRow, TargetRow } from "@/lib/types";
import { midnight, wall } from "@/lib/tz";

// Metrics computed from the synced rows. The phone computes its own in Dart
// (features/stats); these are the simple, unambiguous ones. Competition
// metrics come from the shared Dart core later (proposal §2, §7).

export const rounds = (s: SessionRow) => s.round_count ?? 0;
const d = (iso: string) => new Date(iso);
/// [tz] is the viewer's zone (lib/tz.ts); an explicit `o.timeZone` wins.
export const fmtDate = (iso: string, o: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }, tz?: string) =>
  d(iso).toLocaleDateString("en-US", { timeZone: tz, ...o });
export const money = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v < 10 ? 2 : 0 });

export function startOf(period: "week" | "month" | "quarter" | "year", now = new Date(), tz?: string) {
  const w = wall(now, tz);
  if (period === "week") return midnight(w.y, w.mo, w.d - w.wd, tz);
  if (period === "month") return midnight(w.y, w.mo, 1, tz);
  if (period === "quarter") return midnight(w.y, Math.floor(w.mo / 3) * 3, 1, tz);
  return midnight(w.y, 0, 1, tz);
}

export function inRange(sessions: SessionRow[], from: Date, to = new Date(8.64e15)) {
  return sessions.filter((s) => { const t = d(s.date_time); return t >= from && t < to; });
}

export function byWeek(sessions: SessionRow[], weeks = 26, tz?: string) {
  const w = wall(startOf("week", new Date(), tz), tz);
  const edges = Array.from({ length: weeks + 1 }, (_, i) => midnight(w.y, w.mo, w.d - (weeks - 1 - i) * 7, tz));
  const buckets = edges.slice(0, weeks).map((from) => ({ from, label: from.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: tz }), value: 0 }));
  for (const s of sessions) {
    const t = d(s.date_time).getTime();
    const i = edges.findIndex((e, k) => k < weeks && t >= e.getTime() && t < edges[k + 1].getTime());
    if (i >= 0) buckets[i].value += rounds(s);
  }
  return buckets;
}

export function byMonth(sessions: SessionRow[], months: number, pick: (s: SessionRow[]) => number | null, tz?: string) {
  const w = wall(new Date(), tz);
  return Array.from({ length: months }, (_, i) => {
    const mo = w.mo - (months - 1 - i);
    const from = midnight(w.y, mo, 1, tz);
    const to = midnight(w.y, mo + 1, 1, tz);
    return { label: from.toLocaleDateString("en-US", { month: "short", timeZone: tz }), value: pick(inRange(sessions, from, to)) };
  });
}

export function costPerRound(list: SessionRow[]) {
  const paid = list.filter((s) => (s.cost ?? 0) > 0 && rounds(s) > 0);
  const r = paid.reduce((a, s) => a + rounds(s), 0);
  return r ? paid.reduce((a, s) => a + (s.cost ?? 0), 0) / r : null;
}

export function firearmUsage(sessions: SessionRow[], limit = 6) {
  const m = new Map<string, number>();
  for (const s of sessions) {
    const k = s.firearm_label || "Unspecified";
    m.set(k, (m.get(k) ?? 0) + rounds(s));
  }
  return [...m].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, limit);
}

export function spendByCaliber(sessions: SessionRow[]) {
  const m = new Map<string, number>();
  for (const s of sessions) if ((s.cost ?? 0) > 0) {
    const k = (s.caliber || "Other").trim();
    m.set(k, (m.get(k) ?? 0) + (s.cost ?? 0));
  }
  return [...m].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 5);
}

export function groupTrend(targets: TargetRow[]) {
  return targets
    .filter((t) => (t.group_size_inches ?? 0) > 0)
    .map((t) => ({ t: d(t.created_at).getTime(), v: t.group_size_inches! }));
}

const GOAL_NOUN: Record<string, string> = {
  rounds: "rounds", sessions: "sessions", trainingDays: "training days", drillSessions: "drill sessions",
  drillPbs: "drill bests", firearmsUsed: "firearms", calibersShot: "calibers", rangesVisited: "ranges", maintenanceLogged: "maintenance entries",
};
const PERIOD: Record<string, string> = { week: "this week", month: "this month", quarter: "this quarter", year: "this year" };

/// Progress for the goal metrics the web can count from sessions alone;
/// the rest (drill PBs, maintenance) show the target only.
export function goalProgress(g: GoalRow, sessions: SessionRow[]) {
  const from = startOf((g.period as "week") ?? "month");
  const list = inRange(sessions, from);
  const distinct = (f: (s: SessionRow) => string | null) => new Set(list.map(f).filter(Boolean)).size;
  const value: number | null =
    g.metric === "rounds" ? list.reduce((a, s) => a + rounds(s), 0)
    : g.metric === "sessions" ? list.length
    : g.metric === "trainingDays" ? distinct((s) => s.date_time.slice(0, 10))
    : g.metric === "drillSessions" ? list.filter((s) => s.drill_id).length
    : g.metric === "firearmsUsed" ? distinct((s) => s.firearm_id)
    : g.metric === "calibersShot" ? distinct((s) => s.caliber?.toLowerCase() ?? null)
    : g.metric === "rangesVisited" ? distinct((s) => s.range_name?.toLowerCase() ?? null)
    : null;
  return { label: `${(GOAL_NOUN[g.metric] ?? g.metric).replace(/^\w/, (c) => c.toUpperCase())} ${PERIOD[g.period] ?? ""}`.trim(), value, target: g.target };
}
