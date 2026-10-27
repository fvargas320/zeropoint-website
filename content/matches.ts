// Matches section. Wording follows rangeai docs/marketing/neutral-import-copy.md:
// describe adding match results, not a named scoring service.

export const matchesCopy = {
  eyebrow: "Matches",
  title: "See exactly where the points went.",
  lede: "Add your match results and get a stage-by-stage breakdown: hit factor, points down, what cost you the most, and the drills to fix it.",
  sports: ["USPSA", "IDPA", "Steel Challenge"],
  howTo: "Share from your scoring app, or add .psc match files and saved results pages.",
};

// An illustrative stage (labelled "Example" on the page). The numbers agree:
// 175 − 14 − 20 − 4 = 137 points; 137 / 21.34 s = 6.42 hit factor.
export const exampleStage = {
  name: "Stage 4",
  rows: [
    { label: "Possible points", value: 175, kind: "total" as const },
    { label: "C and D hits", value: -14, kind: "loss" as const },
    { label: "Misses", value: -20, kind: "loss" as const },
    { label: "Procedural", value: -4, kind: "loss" as const },
    { label: "Stage points", value: 137, kind: "result" as const },
  ],
};

export const exampleStats = [
  { label: "Hit factor", value: 6.42, decimals: 2 },
  { label: "Points down", value: -38, decimals: 0 },
  { label: "vs stage winner", value: 82.4, decimals: 1, suffix: "%" },
];
