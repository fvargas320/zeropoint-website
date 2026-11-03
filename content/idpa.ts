import type { Step } from "@/components/sections/steps";
import type { Feature } from "./features";

// The /idpa landing page: the target of the idpa.com ad (IDPA journey step 1,
// option C). Every claim was checked against the app code on 2026-11-03
// (rangeai master: IDPA batches 1–7 and the teaching layer). Say "for IDPA
// shooters", never "official"; PractiScore is only where results come from.

export const idpa = {
  campaign: "idpa",
  deepLink: "zeropoint://sport/idpa",
  title: "IDPA match log and 5x5 class tracker",
  description:
    "ZeroPoint for IDPA shooters: see your match in seconds (time plus 1 s per point down plus penalties), track your 5x5 and your class from NV to DM, and bring results in from PractiScore. Free on iPhone and Android.",
  eyebrow: "For IDPA shooters",
  h1: "See where your seconds went.",
  lede: "In IDPA your score is your time. ZeroPoint adds up every stage, shows which one cost you the most, and tracks your class from the 5x5.",
  closing: "Your next match, in seconds.",
};

export const idpaFeatures: Feature[] = [
  {
    id: "match",
    eyebrow: "Your match page",
    title: "Your score is your time.",
    body: "Each stage is your shooting time, plus 1 second for every point down, plus any penalties. Lower wins. ZeroPoint adds it up and shows the match in seconds.",
    points: [
      { text: "Shooting, points down and penalties, split out" },
      { text: "Your biggest-cost stage, called out" },
      { text: "Every IDPA term explained in plain words" },
    ],
    screen: "idpaMatch",
    prop: "targetPrints",
  },
  {
    id: "class",
    eyebrow: "Your class",
    title: "Know your class before the classifier.",
    body: "Shoot the 5x5 in practice and ZeroPoint shows the class it puts you in, from Novice to Distinguished Master, in your division. It also shows the time you need for the next class.",
    points: [
      { text: "5x5 and Standard classifier, all 8 divisions" },
      { text: "“For SS, need 29.36 s on the 5x5”" },
      { text: "Shows when your classifier is due" },
    ],
    screen: "idpaClass",
    prop: "target",
  },
  {
    id: "results",
    eyebrow: "Your results",
    title: "Bring your match in.",
    body: "Import your results from PractiScore, or copy your place and times from the posted sheet. Either way the match lands in your log.",
    points: [
      { text: "A PractiScore results file or a pasted table" },
      { text: "A PDF of the results", pro: true },
      { text: "Or by hand: place, class and Promoted to" },
    ],
    screen: "idpaResults",
    prop: "receipts",
  },
  {
    id: "live",
    eyebrow: "Match day",
    title: "Score it stage by stage.",
    body: "Log each stage as you shoot it: time, points down and penalties. Your time so far updates after every stage, so you know where you stand.",
    points: [
      { text: "Points down, PE, non-threat, flagrant and FTDR" },
      { text: "Your time so far, stage by stage" },
      { text: "What each stage cost you" },
    ],
    screen: "idpaLive",
    prop: "casings",
  },
];

export const idpaSteps: Step[] = [
  { title: "Pick IDPA", body: "Download ZeroPoint, choose IDPA and your division. Add your class if you have one." },
  { title: "Shoot the 5x5 or bring in a match", body: "Log a 5x5 run from practice, or import a match you already shot." },
  { title: "See your class and your seconds", body: "Get your projected class and every stage split into time, points down and penalties." },
];
