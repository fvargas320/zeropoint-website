import type { Step } from "@/components/sections/steps";
import type { Faq } from "./faq";
import type { ScreenName } from "./images";
import { money, pricing } from "./site";

// The /idpa landing page: the target of the idpa.com ad (IDPA journey step 1,
// option C). Every claim was checked against the app code on 2026-11-03
// (rangeai master: IDPA batches 1–7 and the teaching layer). Say "for IDPA
// shooters", never "official"; PractiScore is only where results come from.
// Rules figures (seconds per penalty, 5x5 class times, divisions) are the
// app's own data, assets/competition/rules/idpa.json, edition 2026.2. Every
// match number is from the app's demo match (Tri-County IDPA, 106.91 s).
// The Your season view is on rangeai master but not in a released build yet
// (checked 2026-11-27 against 1.5.0+18), so this page does not show it.

export const idpa = {
  campaign: "idpa",
  deepLink: "zeropoint://sport/idpa",
  title: "IDPA match tracker app: scores, points down and class",
  description:
    "Track your IDPA metrics in ZeroPoint: import a match from PractiScore and see time, points down and penalties for every stage. Free on iPhone and Android.",
  eyebrow: "The IDPA match log app",
  h1: "Track your IDPA metrics.",
  lede: "Import a match from PractiScore and see every stage as shooting time, points down and penalties.",
  closing: "Your next match, in seconds.",
};

type Crop = [number, number, number, number];

/** The hero: the app first, the timer over its screen, then the flip board
    under it. Every figure is the demo match's. */
export const idpaHero = {
  timer: { label: "Match time", match: "Tri-County · CO", value: "106.91" },
  chip: { value: "13th of 30", label: "in Carry Optics" },
  board: [
    { label: "Points down", note: "One second each", value: "19", accent: true },
    { label: "Penalties", note: "PE, HNT, FP and FTDR, in seconds", value: "3.00" },
    { label: "Place", note: "In Carry Optics", value: "13/30" },
    { label: "Behind the winner", note: "Stage by stage", value: "23.20" },
    { label: "Costliest stage", note: "9 points down there", value: "STG 2" },
  ],
};

/** 01: five real screens, like a store listing. The middle one leads. */
export const idpaApp: { label: string; title: string; screens: { screen: ScreenName; caption: string }[] } = {
  label: "The app",
  title: "The IDPA app built for match day.",
  screens: [
    { screen: "idpaFullResults", caption: "Full results" },
    { screen: "idpaStage", caption: "Stage detail" },
    { screen: "idpaMatch", caption: "Your match" },
    { screen: "idpaH2h", caption: "Head to head" },
    { screen: "idpaCompete", caption: "Your class" },
  ],
};

/** 02: the match page in pieces around one number. A crop is x0, y0, x1, y1
    on the 750-wide capture. */
export const idpaMetrics: {
  label: string;
  title: string;
  total: { value: string; unit: string; label: string };
  pieces: { screen: ScreenName; crop: Crop; label: string }[];
  chips: { value: string; label: string; accent?: boolean }[];
} = {
  label: "What you track",
  title: "Every IDPA metric from your match.",
  total: { value: "106.91", unit: "s", label: "Your match time" },
  pieces: [
    { screen: "idpaMatch", crop: [40, 560, 710, 1100], label: "Where the time went: 13th, 3rd with no points down, and the time each stage cost" },
    { screen: "idpaCompare", crop: [40, 580, 710, 910], label: "You against the winner: 106.91 s against 83.67 s" },
    { screen: "idpaFullResults", crop: [40, 804, 710, 1150], label: "Full results with your row on top: 13th, 106.91, 19 down, 3 s of penalties" },
    { screen: "idpaCompare", crop: [40, 990, 710, 1620], label: "Dana was 23.2 s faster, and by how much on each stage" },
  ],
  chips: [
    { value: "13th of 30", label: "in your division" },
    { value: "+11.0 s", label: "on Stage 2", accent: true },
    { value: "19", label: "points down" },
  ],
};

/** 03: three features, each a number, a phone and a claim. */
export const idpaChapters: {
  label: string;
  title: string;
  items: { tag: string; stat: string; unit: string; title: string; screen: ScreenName; notes: { title: string; body: string }[] }[];
} = {
  label: "Your match",
  title: "Your IDPA score, place and gap.",
  items: [
    {
      tag: "Your time", stat: "106.91", unit: "s", title: "Your score is your time.", screen: "idpaMatch",
      notes: [
        { title: "Stage by stage", body: "Each stage is the time on the timer, plus 1 second for every point down, plus any penalties." },
        { title: "Your costliest stage", body: "ZeroPoint adds it up and shows which stage cost you the most." },
      ],
    },
    {
      tag: "Your place", stat: "13th", unit: "of 30", title: "Your place, in your division.", screen: "idpaFullResults",
      notes: [
        { title: "Full results", body: "Import from PractiScore and your row sits on top." },
        { title: "Division or overall", body: "Switch between your division and the whole match." },
      ],
    },
    {
      tag: "Head to head", stat: "23.2", unit: "s", title: "The gap to the winner.", screen: "idpaCompare",
      notes: [
        { title: "Anyone in the results", body: "Pick the winner or anyone else. ZeroPoint lines up every stage and shows who was faster, and by how much." },
        { title: "What if", body: "Replay a stage and see your new place, and each stage against its winner. In Pro." },
      ],
    },
  ],
};

/** 04: from posted results to the match page. */
export const idpaStepsHead = { label: "How it works", title: "Import IDPA results in three steps." };
export const idpaSteps: Step[] = [
  { title: "Open your results", body: "Find your match in PractiScore once the scores are posted." },
  { title: "Share to ZeroPoint", body: "Tap Share and choose ZeroPoint. No file? Paste the results table or type in your place and times." },
  { title: "See where the time went", body: "Every stage split into shooting time, points down and penalties, with the costliest stage on top." },
];

/** How a stage score adds up. The sum is the app's own example
    (term_examples.dart, idpaFinal): 14.21 + 4 + 3 = 21.21. */
export const idpaScoring = {
  label: "IDPA scoring",
  title: "How IDPA scoring works.",
  lede: "Your score is your time, and the lowest time wins. Each stage is the time on the timer, plus one second for every point down, plus any penalties.",
  sum: [
    { value: "14.21 s", label: "on the timer" },
    { value: "4 s", label: "4 points down" },
    { value: "3 s", label: "1 procedural" },
  ],
  total: { value: "21.21 s", label: "stage score" },
  costs: [
    { name: "Point down", cost: "1 s", note: "A hit in the -1 zone is 1 point down, the -3 zone is 3, a miss is 5." },
    { name: "Procedural error (PE)", cost: "3 s", note: "Breaking a stage procedure or a cover rule." },
    { name: "Hit on a non-threat (HNT)", cost: "5 s", note: "A hit on a target you shouldn’t shoot." },
    { name: "Flagrant penalty (FP)", cost: "10 s", note: "An infraction that gained you more than 3 seconds." },
    { name: "Failure to do right (FTDR)", cost: "20 s", note: "Gross unsportsmanlike conduct." },
  ],
};

/** 5x5 classifier times by division: the time, with points down added, at or
    under which you make each class. From the app's rules data (in effect
    since Jan 1, 2020). */
export const idpaClassTimes = {
  label: "IDPA classifier",
  title: "IDPA 5x5 classifier times by division.",
  lede: "The 5x5 is 25 rounds at 10 yards in four strings. Your time, with points down added, sets your class. Shoot at or under the time shown to make that class; slower than Marksman is Novice.",
  classes: [
    { code: "MA", name: "Master" },
    { code: "EX", name: "Expert" },
    { code: "SS", name: "Sharpshooter" },
    { code: "MM", name: "Marksman" },
  ],
  rows: [
    { code: "SSP", name: "Stock Service Pistol", times: [19.07, 23.49, 29.36, 36.97] },
    { code: "ESP", name: "Enhanced Service Pistol", times: [18.75, 23.28, 28.8, 36.27] },
    { code: "CO", name: "Carry Optics", times: [18.47, 22.93, 28.39, 36.18] },
    { code: "CDP", name: "Custom Defensive Pistol", times: [19.18, 24.09, 29.92, 37.63] },
    { code: "CCP", name: "Compact Carry Pistol", times: [19.6, 24.98, 31.07, 39.26] },
    { code: "REV", name: "Revolver", times: [20.15, 26.78, 33.34, 41.91] },
    { code: "BUG", name: "Back-Up Gun", times: [23.25, 28.12, 35.43, 44.65] },
    { code: "PCC", name: "Pistol Caliber Carbine", times: [10.63, 12.98, 15.82, 18.33] },
  ],
  note: "Times in seconds, in effect since January 1, 2020. Log a 5x5 in ZeroPoint and it shows your class and the time you need for the next one.",
};

/** Free against Pro for an IDPA shooter. Free and Pro lines follow
    uspsaFaq's "Is it free?" and pro.ts; keep the three in step. */
export const idpaPlans = {
  label: "Pricing",
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
      q: "What do PE, HNT, FP and FTDR mean?",
      a: "They are penalties, each a fixed number of seconds. A procedural error (PE) adds 3 seconds, a hit on a non-threat (HNT) adds 5, a flagrant penalty (FP) adds 10 and a failure to do right (FTDR) adds 20.",
    },
    {
      q: "What are the IDPA classes?",
      a: "Novice, Marksman, Sharpshooter, Expert, Master and Distinguished Master. You hold a class in each division you shoot, and you move up with a faster classifier or a match promotion.",
    },
    {
      q: "What are the IDPA divisions?",
      a: "There are eight: Stock Service Pistol (SSP), Enhanced Service Pistol (ESP), Carry Optics (CO), Custom Defensive Pistol (CDP), Compact Carry Pistol (CCP), Revolver (REV), Back-Up Gun (BUG) and Pistol Caliber Carbine (PCC). ZeroPoint tracks your class in each.",
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
      q: "Is there an IDPA app for Android?",
      a: "Yes. ZeroPoint is on iPhone and Android, with the same log on both.",
    },
    {
      q: "Is ZeroPoint free?",
      a: `Yes. Importing matches, your match page and head to head are free. Pro (${money(pricing.monthly)} a month or ${money(pricing.yearly)} a year in the US, with a ${pricing.trialDays}-day free trial) adds what-ifs, your stages against the stage winner, cloud backup and no ads.`,
    },
  ];
}
