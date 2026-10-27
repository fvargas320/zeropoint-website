// Matches section. Wording follows rangeai docs/marketing/neutral-import-copy.md:
// describe adding match results, not a named scoring service.

export const matchesCopy = {
  eyebrow: "Matches",
  title: "See exactly where the points went.",
  lede: "Add your match results and get a stage-by-stage breakdown: hit factor, points down, what cost you the most, and the drills to fix it.",
  sports: ["USPSA", "IDPA", "Steel Challenge"],
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

// How results get in (checked against origin/master, competition import):
// the share extension, .psc / results-page files and pasted tables are free;
// PDF and photo import are Pro.
export const importSteps = [
  {
    title: "Share from your scoring app",
    body: "Open your match results and tap Share, then ZeroPoint. Or add a .psc match file or a saved results page.",
  },
  {
    title: "Every stage, read for you",
    body: "Hits, time, penalties and hit factor for each stage, filed with the rest of your range log.",
  },
  {
    title: "See where the points went",
    body: "What cost you the most, how you stack up against the field, and the drills to fix it.",
  },
];

// What you see for an imported match. Free and Pro split as the app does it.
export const matchInsights: { label: string; pro?: boolean }[] = [
  { label: "Stage-by-stage points and hit factor" },
  { label: "Hit counts: A, C, D, misses, no-shoots" },
  { label: "Head to head with a rival" },
  { label: "You vs the stage winner", pro: true },
  { label: "You vs the field, class over time", pro: true },
  { label: "A debrief and drill plan from your results", pro: true },
];

export const matchesFreeNote = "Importing matches and head to head are free. The deeper analysis is part of Pro.";
