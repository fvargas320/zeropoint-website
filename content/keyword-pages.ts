import type { Faq } from "./faq";
import type { Feature } from "./features";
import type { ArtName, ScreenName } from "./images";

export type KeywordPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  heroProp: ArtName;
  heroScreens: ScreenName[];
  features: Feature[];
  faq: Faq[];
  closing: string;
};

const both: Faq = { q: "Does it work on Android?", a: "Yes. ZeroPoint is on the App Store and Google Play." };

export const shootingLog: KeywordPage = {
  slug: "shooting-log-app",
  title: "Shooting log app for iPhone and Android",
  description:
    "ZeroPoint is a shooting log app: record every range session with rounds, cost, firearm, distance and target photos, then see your history and progress. Free on iPhone and Android.",
  eyebrow: "Shooting log app",
  h1: "A shooting log that keeps up with you.",
  lede: "Record every range session in seconds: rounds, cost, firearm, distance and target photos, all on your phone.",
  heroProp: "targetPrints",
  heroScreens: ["session", "calendar", "train"],
  features: [
    {
      id: "what",
      eyebrow: "What goes in the log",
      title: "Everything you used to write down.",
      body: "Date, range, firearm, caliber, distance, position, rounds fired, cost, weather, the drill you ran and your score, who you shot with, and notes on what went well and what to work on next.",
      points: [],
      screen: "session",
      prop: "targetPrints",
    },
    {
      id: "history",
      eyebrow: "Your history",
      title: "Every session on a calendar.",
      body: "Find any range day in a tap. See rounds fired, sessions logged and the ranges and buddies you go with, and keep a weekly streak going.",
      points: [],
      screen: "calendar",
      prop: "receipts",
    },
    {
      id: "progress",
      eyebrow: "Progress",
      title: "Know if you are getting better.",
      body: "Run drills like Dot Torture, 5×5 and the Bill Drill, log the result, and personal bests update themselves.",
      points: [],
      screen: "train",
      prop: "target",
    },
  ],
  faq: [
    {
      q: "Is there a free shooting log app?",
      a: "Yes. ZeroPoint is free to start with unlimited sessions and target photos. Pro adds unlimited firearms, cloud backup, spending stats and more.",
    },
    {
      q: "Does it work at a range with no signal?",
      a: "Yes. Sessions are saved on your phone, so you can log with no reception.",
    },
    {
      q: "Can I log different firearms and calibers?",
      a: "Yes. Choose the firearm and ammo for each session. The free plan holds up to 3 firearms; Pro is unlimited.",
    },
    both,
  ],
  closing: "Start your shooting log today.",
};

export const ammoInventory: KeywordPage = {
  slug: "ammo-inventory-app",
  title: "Ammo inventory app with low-stock alerts",
  description:
    "Track ammo on hand by caliber, let rounds come off your stock as you log range sessions, and get a heads-up before you run low. Free on iPhone and Android.",
  eyebrow: "Ammo inventory app",
  h1: "Low on 9mm? Know first.",
  lede: "Track every box by caliber. Rounds come off your stock as you log, and ZeroPoint warns you before a caliber runs dry.",
  heroProp: "ammoBoxes",
  heroScreens: ["inventory", "lowstock", "spending"],
  features: [
    {
      id: "inventory",
      eyebrow: "Inventory",
      title: "Ammo on hand, counted for you.",
      body: "Add what you buy by caliber, brand and grain. Log a session and the rounds you fired come off that ammo automatically, so the count stays honest.",
      points: [],
      screen: "inventory",
      prop: "ammoBoxes",
    },
    {
      id: "alerts",
      eyebrow: "Alerts",
      title: "A heads-up before the range trip.",
      body: "ZeroPoint flags a caliber when it runs low. With Pro it also forecasts how many sessions you have left at your pace and checks your gear before a range day.",
      points: [],
      screen: "lowstock",
      prop: "casings",
      overlay: "notification",
    },
    {
      id: "cost",
      eyebrow: "Cost",
      title: "What every round really costs.",
      body: "See what you spend on ammo and range days, and the cost per round, with ZeroPoint Pro.",
      points: [],
      screen: "spending",
      prop: "dollars",
    },
  ],
  faq: [
    {
      q: "Is the ammo tracker free?",
      a: "Yes. Ammo inventory and basic low-stock alerts are free. Pro adds pace forecasts, a range-day gear check and spending stats.",
    },
    {
      q: "Does it subtract rounds automatically?",
      a: "Yes. When you log a session with the ammo you used, those rounds come off that ammo.",
    },
    {
      q: "Who can see my ammo inventory?",
      a: "Only you. Your inventory is private to your account and never sold.",
    },
    both,
  ],
  closing: "Never run dry at the range.",
};
