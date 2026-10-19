import type { GoalRow, SessionRow, TargetRow } from "@/lib/types";

// Metrics computed from the synced rows. The phone computes its own in Dart
// (features/stats); these are the simple, unambiguous ones. Competition
// metrics come from the shared Dart core later (proposal §2, §7).

export const rounds = (s: SessionRow) => s.round_count ?? 0;
const d = (iso: string) => new Date(iso);
export const fmtDate = (iso: string, o: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  d(iso).toLocaleDateString("en-US", o);
export const money = (v: number) => v.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: v < 10 ? 2 : 0 });

export function startOf(period: "week" | "month" | "quarter" | "year", now = new Date()) {
  const s = new Date(now);
  s.setHours(0, 0, 0, 0);
  if (period === "week") s.setDate(s.getDate() - s.getDay());
  if (period === "month") s.setDate(1);
  if (period === "quarter") { s.setDate(1); s.setMonth(Math.floor(s.getMonth() / 3) * 3); }
  if (period === "year") { s.setDate(1); s.setMonth(0); }
  return s;
}

export function inRange(sessions: SessionRow[], from: Date, to = new Date(8.64e15)) {
  return sessions.filter((s) => { const t = d(s.date_time); return t >= from && t < to; });
}

export function byWeek(sessions: SessionRow[], weeks = 26) {
  const start = startOf("week");
  start.setDate(start.getDate() - (weeks - 1) * 7);
  const buckets = Array.from({ length: weeks }, (_, i) => {
    const from = new Date(start); from.setDate(start.getDate() + i * 7);
    return { from, label: from.toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: 0 };
  });
  for (const s of sessions) {
    const i = Math.floor((d(s.date_time).getTime() - start.getTime()) / (7 * 864e5));
    if (i >= 0 && i < weeks) buckets[i].value += rounds(s);
  }
  return buckets;
}

export function byMonth(sessions: SessionRow[], months: number, pick: (s: SessionRow[]) => number | null) {
  const now = new Date();
  return Array.from({ length: months }, (_, i) => {
    const from = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1);
    const to = new Date(from.getFullYear(), from.getMonth() + 1, 1);
    return { label: from.toLocaleDateString("en-US", { month: "short" }), value: pick(inRange(sessions, from, to)) };
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
