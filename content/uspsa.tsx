import type { Step } from "@/components/sections/steps";
import type { Faq } from "./faq";
import type { Feature } from "./features";
import { money, pricing } from "./site";

// The /uspsa landing page, a sibling of /idpa: a page a USPSA club or
// uspsa.org could link to. Claims were checked against the app code on
// 2026-11-03 (rangeai master: the competition feature and its teaching
// layer). Say "for USPSA shooters", never "official" or anything that reads
// as an endorsement. PractiScore is only where the shooter shares results
// from; we never say we pull from it. Every number on the page comes from
// the demo match in the app's own screen renders (Area 6 Championship).

export const uspsa = {
  placement: "uspsa",
  title: "USPSA match log and classification tracker",
  description:
    "ZeroPoint for USPSA shooters: share your results from PractiScore and see where you lost points, stage by stage. Track your projected class from your classifiers and your place between stages on match day. Free on iPhone and Android.",
  eyebrow: "For USPSA shooters",
  h1: "See exactly where you lost points.",
  lede: "Your match % tells you how you did. ZeroPoint tells you why, so you know what to practise before the next one.",
  closing: "Bring your next match in.",
};

/** The proof strip under the hero: one real match from the app's demo data. */
export const uspsaProof = {
  caption: "What one match looked like",
  detail: "Area 6 Championship, Carry Optics, from the match page in the app.",
  stats: [
    { value: "14.7 s", label: "lost to time" },
    { value: "75 pts", label: "lost to penalties" },
    { value: "17th of 30", label: "in division" },
  ],
};

/** Results sheet vs ZeroPoint: what the sheet gives, what ZeroPoint adds. */
export const uspsaCompare = {
  sheet: ["Your match %", "Your place, in division and overall", "Hit factor and points for each stage"],
  zeropoint: [
    "Seconds lost to time against points lost to hits and penalties",
    "The stage that cost you the most",
    "Whether speed or accuracy cost you more",
    "Head to head with anyone in your division",
    "Your projected class from your classifiers",
    "Your place between stages on match day",
  ],
};

export const uspsaFeatures: Feature[] = [
  {
    id: "import",
    eyebrow: "From PractiScore",
    title: "One share and the whole match is in.",
    body: "Open your results in PractiScore, tap Share and choose ZeroPoint. Scores corrected later? Share again and see what changed.",
    points: [
      { text: "Every stage and every shooter, no typing" },
      { text: "Works with the .psc file or the results page" },
      { text: "Corrections show up as changes, not a new match" },
    ],
    screen: "uspsaImport",
    prop: "receipts",
  },
  {
    id: "analysis",
    eyebrow: "Beyond the results sheet",
    title: "Know what to practise next.",
    body: "Your match page splits your score into time and points, then shows which stage hurt the most and whether speed or accuracy cost you more.",
    points: [
      { text: "“14.7 s lost to time, 75 pts lost to penalties”" },
      { text: "The stage that cost you the most, called out" },
      { text: "Whether your loss was on the clock or in your hits" },
    ],
    screen: "uspsaMatch",
    prop: "targetPrints",
  },
  {
    id: "compare",
    eyebrow: "Full results",
    title: "Measure yourself against anyone.",
    body: "Your row stays pinned at the top of the full results. Tap any shooter in your division and compare every stage side by side.",
    points: [
      { text: "Find yourself at once, however big the field" },
      { text: "See which stages the shooter above you won" },
      { text: "Switch between your division and overall" },
    ],
    screen: "uspsaResults",
    prop: "casings",
  },
  {
    id: "class",
    eyebrow: "Classification",
    title: "See your next class coming.",
    body: "Log your classifiers and ZeroPoint projects your class in each division. It shows how far you are from the next one and which runs would get you there.",
    points: [
      { text: "Your projected class, from D to GM" },
      { text: "“5.2% to M”, and the fastest path there" },
      { text: "A moment to mark it when a run moves you up" },
    ],
    screen: "uspsaClass",
    prop: "target",
  },
  {
    id: "live",
    eyebrow: "Match day",
    title: "Know where you stand mid-match.",
    body: "When results are posted between stages, update them and see your place so far, and whether you moved up or down.",
    points: [
      { text: "Your place so far, with how many stages are in" },
      { text: "Up or down since the last update" },
      { text: "A note, photo or video on each stage" },
    ],
    screen: "uspsaLive",
    prop: "ammoBoxes",
  },
];

export const uspsaSteps: Step[] = [
  { title: "Plan", body: "Add the match with your division. ZeroPoint lines up prep drills and a packing checklist." },
  { title: "Log", body: "Score each stage as you shoot it, with a note on what happened. Check your place between stages." },
  { title: "Import", body: "When results are posted, share them from PractiScore and see where you lost points." },
];

/** `matchesLive` comes from lib/release.ts (the live App Store version). */
export function uspsaFaq(matchesLive: boolean, lifetime = false): Faq[] {
  return [
    {
      q: "Does it work with PractiScore results?",
      a: `${matchesLive ? "Yes." : "Yes, in the next update."} Open your match results in PractiScore, tap Share and choose ZeroPoint. You can also add a .psc match file or a saved results page.`,
    },
    {
      q: "Do I need to type in my scores?",
      a: "No. Sharing your results brings in every stage and every shooter. If you want to track your place during a match, you can log each stage as you shoot it, then import the posted results after.",
    },
    {
      q: "Is it free?",
      a: `Yes. Importing matches, your match page and head to head are free. Pro (${money(pricing.monthly)} a month or ${money(pricing.yearly)} a year in the US${lifetime ? `, or ${money(pricing.lifetime)} once for Founders Lifetime` : ""}) adds the deeper analysis, like the coach’s read, what-ifs and your stages against the stage winner, plus cloud backup and no ads.`,
    },
    {
      q: "How does classification work?",
      a: "Log your classifier runs, from practice or from a match. After four different classifiers, ZeroPoint projects your class in that division and shows how far you are from the next one. It’s a projection from your own runs, so your posted class is still the one that counts.",
    },
    {
      q: "Is my data private?",
      a: (
        <>
          Yes. Your matches are yours. Your log lives on your phone, and your data is never sold. Read the{" "}
          <a href="/privacy">privacy policy</a>.
        </>
      ),
    },
  ];
}
