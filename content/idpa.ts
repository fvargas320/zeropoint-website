import type { Faq } from "./faq";
import type { Feature } from "./features";
import { money, pricing } from "./site";

// The /idpa landing page: the target of the idpa.com ad (IDPA journey step 1,
// option C). Every claim was checked against the app code on 2026-11-03
// (rangeai master: IDPA batches 1–7 and the teaching layer). Say "for IDPA
// shooters", never "official"; PractiScore is only where results come from.

export const idpa = {
  campaign: "idpa",
  deepLink: "zeropoint://sport/idpa",
  title: "IDPA score app: match log, results and classifier tracker",
  description:
    "ZeroPoint for IDPA shooters: import your match from PractiScore and see every stage split into shooting time, points down and penalties. Track your 5x5 and your class from NV to DM. Free on iPhone and Android.",
  eyebrow: "The IDPA match log app",
  h1: "See where your seconds went.",
  lede: "Import your match from PractiScore and see every stage split into shooting time, points down and penalties.",
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
];

/** Under the hero: the posted results against what ZeroPoint shows. */
export const idpaVersus = {
  sheet: { eyebrow: "On PractiScore", line: "One row in a table." },
  ours: { eyebrow: "In ZeroPoint", line: "The stage that cost you the match." },
};

/** Free against Pro for an IDPA shooter. Free and Pro lines follow
    uspsaFaq's "Is it free?" and pro.ts; keep the three in step. */
export const idpaPlans = {
  title: "Free to start. Pro when you want more.",
  free: [
    "Import your match from PractiScore",
    "Your match split into shooting time, points down and penalties",
    "Head to head with any shooter",
  ],
  pro: [
    "What if: replay a stage, see your new place",
    "Each stage against the stage winner",
    "Backup, sync to your computer and no ads",
  ],
};

/** The questions a new IDPA shooter searches for; also the page's FAQPage data. */
export function idpaFaq(matchesLive: boolean): Faq[] {
  return [
    {
      q: "How is IDPA scored?",
      a: "Your score is your time. Each stage is your shooting time, plus 1 second for every point down, plus any penalties. Add up the stages and the lowest time wins.",
    },
    {
      q: "What is a point down?",
      a: "A hit outside the centre zone of the target costs 1 or 3 points, and a miss costs 5. Each point down adds 1 second to your stage time.",
    },
    {
      q: "How does the 5x5 classifier work?",
      a: "It is 25 rounds at 10 yards, shot in four strings. Your time with points down added sets your class, from Novice to Distinguished Master. Log a run in ZeroPoint and it shows the class that time puts you in.",
    },
    {
      q: "Can I import from PractiScore?",
      a: `${matchesLive ? "Yes." : "Yes, in the next update."} Open your match results in PractiScore, tap Share and choose ZeroPoint. No file? Copy your place and times from the posted sheet.`,
    },
    {
      q: "Is ZeroPoint free?",
      a: `Yes. Importing matches, your match page and head to head are free. Pro (${money(pricing.monthly)} a month or ${money(pricing.yearly)} a year in the US, with a ${pricing.trialDays}-day free trial) adds what-ifs, your stages against the stage winner, cloud backup and no ads.`,
    },
  ];
}
