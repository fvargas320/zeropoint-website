import type { SessionRow } from "@/lib/types";

const COLS: [string, (s: SessionRow) => unknown][] = [
  ["date", (s) => s.date_time], ["name", (s) => s.name], ["range", (s) => s.range_name], ["firearm", (s) => s.firearm_label],
  ["caliber", (s) => s.caliber], ["rounds", (s) => s.round_count], ["distance", (s) => s.distance], ["distance_unit", (s) => s.distance_unit],
  ["ammo", (s) => [s.ammo_brand, s.ammo_product].filter(Boolean).join(" ")], ["cost", (s) => s.cost], ["score", (s) => s.score],
  ["max_score", (s) => s.max_score], ["match", (s) => s.match_name], ["division", (s) => s.division], ["level", (s) => s.match_level],
  ["went_well", (s) => s.went_well], ["needs_work", (s) => s.needs_work], ["focus_next", (s) => s.focus_next], ["notes", (s) => s.notes],
];

const cell = (v: unknown) => {
  if (v == null) return "";
  let s = String(v);
  // Spreadsheet formula injection: a leading = + - @ runs as a formula in Excel.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function sessionsCsv(rows: SessionRow[]) {
  return [COLS.map((c) => c[0]).join(","), ...rows.map((r) => COLS.map(([, f]) => cell(f(r))).join(","))].join("\r\n") + "\r\n";
}
