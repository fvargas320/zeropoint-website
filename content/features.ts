import type { ArtName, ScreenName } from "./images";

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: { text: string; pro?: boolean }[];
  screen: ScreenName;
  prop: ArtName;
  /** A card laid over the phone, e.g. the low-stock notification. */
  overlay?: ArtName;
};

// Same order and headlines as the App Store screenshot set.
export const features: Feature[] = [
  {
    id: "log",
    eyebrow: "Log a session",
    title: "Log a session in seconds.",
    body: "Gun, rounds, target photo. Done. Range, position, buddies and cost go with it, so next time you know exactly what you did.",
    points: [
      { text: "Rounds and cost per session" },
      { text: "Target photos attached to the day" },
      { text: "Range, firearm, caliber and who you shot with" },
    ],
    screen: "session",
    prop: "targetPrints",
  },
  {
    id: "armory",
    eyebrow: "Armory & ammo",
    title: "Every firearm. Every round.",
    body: "Your armory and ammo, always up to date. Rounds come off your stock as you log, and ZeroPoint tells you before a caliber runs dry.",
    points: [
      { text: "Firearms with caliber and last session" },
      { text: "Ammo on hand, counted for you" },
      { text: "Low-stock alerts before the next trip" },
    ],
    screen: "inventory",
    prop: "ammoBoxes",
    overlay: "notification",
  },
  {
    id: "history",
    eyebrow: "History & spending",
    title: "What you shoot, what it costs.",
    body: "Every range day on a calendar, with rounds, sessions and spend adding up underneath. Build a weekly streak and watch the progress stack up.",
    points: [
      { text: "Calendar of every session" },
      { text: "Rounds fired, ranges and buddies" },
      { text: "Spend and cost per round", pro: true },
    ],
    screen: "spending",
    prop: "receipts",
  },
  {
    id: "train",
    eyebrow: "Training",
    title: "Train with purpose.",
    body: "Give every range trip a plan. Run proven drills, log the result, and see it against your last attempt.",
    points: [
      { text: "Dot Torture, 5×5, the Bill Drill and more" },
      { text: "Personal bests that update themselves" },
      { text: "Custom drills and session presets", pro: true },
    ],
    screen: "train",
    prop: "target",
  },
  {
    id: "crew",
    eyebrow: "Crews",
    title: "Bring your crew.",
    body: "Turn “we should go sometime” into a plan. Add friends, start a crew, chat, and put the next range day on the calendar with who’s going.",
    points: [
      { text: "Crew chat and a crew leaderboard" },
      { text: "Range days with going, maybe and can’t" },
      { text: "Shooting buddies remembered on every session" },
    ],
    screen: "crew",
    prop: "crewPrints",
  },
];
