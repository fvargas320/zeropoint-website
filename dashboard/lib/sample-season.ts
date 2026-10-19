import type { SeasonMatch } from "@/lib/season";

// A made-up season for the signed-out and paywall previews. Never real users.
const rows: [string, string, string, number, number, number][] = [
  ["2026-01-12", "Winter Warmup", "Level 1", 3, 68, 82.3],
  ["2026-02-08", "Ridge Run", "Level 2", 5, 42, 85.8],
  ["2026-03-14", "Desert Classic", "Level 3", 2, 56, 88.1],
  ["2026-04-11", "The Quarry", "Level 2", 4, 48, 86.0],
  ["2026-05-09", "Frontier Shoot", "Level 2", 6, 52, 84.1],
  ["2026-06-06", "High Caliber", "Level 3", 3, 50, 89.0],
  ["2026-07-11", "Steel Valley", "Level 1", 4, 46, 86.7],
  ["2026-08-08", "Summit Championship", "Level 2", 2, 49, 94.1],
  ["2026-09-12", "Area Classic", "Level 2", 3, 69, 87.4],
  ["2026-09-26", "Liberty Ridge", "Level 3", 3, 61, 89.1],
  ["2026-10-10", "Liberty Match", "Level 3", 3, 50, 88.4],
  ["2026-10-24", "Year End Bash", "Level 1", 2, 58, 92.7],
];

export const sampleSeason: SeasonMatch[] = rows.map(([date, name, level, place, of, percent], i) => ({
  id: `sample-${i}`,
  date,
  name,
  level,
  division: "Carry Optics",
  discipline: "USPSA",
  place,
  of,
  percent,
  classLetter: "B",
  rounds: 150 + (i % 4) * 12,
  dq: false,
}));
