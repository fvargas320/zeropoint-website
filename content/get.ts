import type { RailItem } from "@/components/sections/screen-rail";
import type { Step } from "@/components/sections/steps";
import type { ArtName, ScreenName } from "./images";
import { idpa } from "./idpa";
import { ammoInventory, shootingLog } from "./keyword-pages";
import { uspsa } from "./uspsa";

export const getRail: RailItem[] = [
  { screen: "session", title: "Log the day", caption: "Gun, rounds, target photo. Done." },
  { screen: "inventory", title: "Know your ammo", caption: "Firearms and rounds on hand, always current." },
  { screen: "spending", title: "See what it costs", caption: "Sessions, rounds and spend at a glance." },
  { screen: "crew", title: "Bring your crew", caption: "Chat and plan the next range day." },
];

export const getSteps: Step[] = [
  { title: "Download free", body: "On iPhone or Android. No card needed." },
  { title: "Add your firearms and ammo", body: "Up to 3 firearms free, with the ammo you have on hand." },
  { title: "Log your next range day", body: "Rounds come off your stock and the session lands on your calendar." },
];

/** Under the hero's store buttons: the usual "is there a catch?" answers. */
export const factChips = ["No card needed", "iPhone & Android", "Works offline"];

export type GetVariant = {
  slug: string;
  /** Ad campaign names (utm_campaign) that open this version; middleware.ts. */
  matches: RegExp;
  eyebrow: string;
  /** null keeps the default "Ditch the notebook." with the strike. */
  h1: string | null;
  lede: string;
  back: ArtName;
  front?: ArtName;
  screens: ScreenName[];
  closing: string;
  closingProp: ArtName;
};

const defaultLede = "Every range day, logged: sessions, ammo, gear and your crew, in one app.";

// /get, and the same page opened with the promise of the ad that sent the
// visitor (served at /get/<slug>, never indexed). Copy comes from the page
// that already makes that promise, so every claim is one the site makes.
export const getVariants: GetVariant[] = [
  { slug: "uspsa", matches: /uspsa/i, eyebrow: uspsa.eyebrow, h1: uspsa.h1, lede: uspsa.lede, back: "target", front: "casings", screens: ["uspsaMatch", "uspsaLive", "uspsaCompete"], closing: uspsa.closing, closingProp: "target" },
  { slug: "idpa", matches: /idpa/i, eyebrow: idpa.eyebrow, h1: idpa.h1, lede: idpa.lede, back: "target", front: "casings", screens: ["idpaMatch", "idpaLive", "idpaClass"], closing: idpa.closing, closingProp: "target" },
  { slug: "ammo", matches: /ammo|inventory/i, eyebrow: ammoInventory.eyebrow, h1: ammoInventory.h1, lede: ammoInventory.lede, back: "ammoBoxes", screens: ["inventory", "lowstock", "spending"], closing: ammoInventory.closing, closingProp: "ammoBoxes" },
  { slug: "log", matches: /(^|[^a-z])(log|journal|logbook)/i, eyebrow: shootingLog.eyebrow, h1: shootingLog.h1, lede: shootingLog.lede, back: "targetPrints", screens: ["session", "calendar", "train"], closing: shootingLog.closing, closingProp: "targetPrints" },
];

export const getDefault: GetVariant = {
  slug: "get", matches: /$^/, eyebrow: "The shooting log", h1: null, lede: defaultLede,
  back: "notebook", screens: ["home", "session", "inventory"], closing: "Let the next one count.", closingProp: "ammoBoxes",
};
