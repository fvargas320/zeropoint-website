import type { Step } from "@/components/sections/steps";
import type { Feature } from "./features";

// The /uspsa landing page, a sibling of /idpa: a page a USPSA club or
// uspsa.org could link to. Claims were checked against the app code on
// 2026-11-03 (rangeai master: the competition feature and its teaching
// layer). Say "for USPSA shooters", never "official" or anything that reads
// as an endorsement. PractiScore is only where the shooter shares results
// from; we never say we pull from it.

export const uspsa = {
  placement: "uspsa",
  title: "USPSA match log and classification tracker",
  description:
    "ZeroPoint for USPSA shooters: share your results from PractiScore and see where you lost points, stage by stage. Track your projected class from your classifiers and your place between stages on match day. Free on iPhone and Android.",
  eyebrow: "For USPSA shooters",
  h1: "See exactly where you lost points.",
  lede: "Track every USPSA match. ZeroPoint takes the results you share from PractiScore and shows what each stage cost you, in time and in points.",
  closing: "Bring your next match in.",
};

export const uspsaFeatures: Feature[] = [
  {
    id: "import",
    eyebrow: "From PractiScore",
    title: "Share the results. The whole match is in.",
    body: "Open the match results in PractiScore, tap Share and choose ZeroPoint. Every stage and every shooter comes in at once. If scores get corrected later, share again and ZeroPoint shows what changed.",
    points: [
      { text: "Share the .psc results file, no typing" },
      { text: "Every stage, every shooter, every division" },
      { text: "Share again after corrections to see what changed" },
    ],
    screen: "uspsaImport",
    prop: "receipts",
  },
  {
    id: "analysis",
    eyebrow: "Beyond the results sheet",
    title: "Where the points went.",
    body: "The results sheet gives you a percentage. ZeroPoint splits it up: how much you lost to time, how many points you gave away, and which stages cost you the most.",
    points: [
      { text: "Biggest costs: seconds lost against points lost" },
      { text: "What each stage cost you, stage by stage" },
      { text: "Speed or accuracy: which one cost you more" },
    ],
    screen: "uspsaMatch",
    prop: "targetPrints",
  },
  {
    id: "compare",
    eyebrow: "Full results",
    title: "Line up against anyone in your division.",
    body: "Your row stays pinned at the top of the full results, so you never lose your place in a long list. Tap any shooter in your division and see them side by side with you, stage by stage.",
    points: [
      { text: "A pinned “You” row in every view" },
      { text: "Your division or overall, sorted the way you want" },
      { text: "Head to head with any shooter, stage by stage" },
    ],
    screen: "uspsaResults",
    prop: "casings",
  },
  {
    id: "class",
    eyebrow: "Classification",
    title: "Know your class before it’s posted.",
    body: "Log your classifiers and ZeroPoint projects your class in each division, from D to GM. It shows how far you are from the next class, and marks the moment a run moves you up.",
    points: [
      { text: "Projected class from your classifier runs" },
      { text: "Progress to the next class, in percent" },
      { text: "The class-up moment, when a run moves you up" },
    ],
    screen: "uspsaClass",
    prop: "target",
  },
  {
    id: "live",
    eyebrow: "Match day",
    title: "Your place, between stages.",
    body: "Log each stage as you shoot it. When results are posted mid-match, update them and see where you stand, and how many places you moved since the last stage.",
    points: [
      { text: "Your place so far, and how many stages are in" },
      { text: "Up or down since the last update" },
      { text: "A note, photo or video on each stage" },
    ],
    screen: "uspsaLive",
    prop: "ammoBoxes",
  },
];

export const uspsaSteps: Step[] = [
  { title: "Plan", body: "Add the match with your division. ZeroPoint lines up prep drills and a packing checklist for match day." },
  { title: "Log", body: "Score each stage as you shoot it, with a note on what happened. Check your place between stages." },
  { title: "Import", body: "When results are posted, share them from PractiScore to ZeroPoint and see where you lost points." },
];
