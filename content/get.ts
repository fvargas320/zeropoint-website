import type { Feature } from "@/components/sections/get/feature-run";
import type { HeroStat } from "@/components/sections/target-hero";
import type { ArtName, ScreenName } from "./images";
import type { MenuLink } from "./nav";
import { idpa } from "./idpa";
import { ammoInventory, shootingLog } from "./keyword-pages";
import { uspsa } from "./uspsa";

export const getRail: Feature[] = [
  { screen: "session", word: "LOG", title: "Log the day", caption: "Gun, rounds, target photo. Done.", prop: "targetPrints", stat: { to: 200, label: "rounds" } },
  { screen: "inventory", word: "AMMO", title: "Know your ammo", caption: "Firearms and rounds on hand, always current.", prop: "ammoBoxes", stat: { to: 1900, label: "rounds on hand" } },
  { screen: "spending", word: "COST", title: "See what it costs", caption: "Sessions, rounds and spend at a glance.", prop: "dollars", stat: { to: 75, prefix: "$", decimals: 2, label: "spent" } },
  { screen: "crew", word: "CREW", title: "Bring your crew", caption: "Chat and plan the next range day.", prop: "crewPrints", stat: { to: 4, label: "members" } },
];

/** The header's menus on /get, as on Home but staying on the paid pages:
    jumps to the rail's cards and Matches, and this page's USPSA and IDPA versions. */
export const getMenus: { label: string; items: MenuLink[] }[] = [
  { label: "Features", items: getRail.map((r) => ({ href: `#rail-${r.screen}`, label: r.title, note: r.caption })) },
  {
    label: "Matches",
    items: [
      { href: "#matches", label: "Match analysis", note: "Import results, see where points went" },
      { href: "/get/uspsa", label: "USPSA", note: "See exactly where you lost points" },
      { href: "/get/idpa", label: "IDPA", note: "See where your seconds went" },
    ],
  },
];

/** The header's other jumps on /get. */
export const getNav = [
  { href: "#pro", label: "Pro" },
  { href: "#next", label: "What's next" },
  { href: "#questions", label: "Questions" },
];

/** Under the hero on Home: the usual "is there a catch?" answers. */
export const factChips = ["No card needed", "Works offline"];

export type GetVariant = {
  slug: string;
  /** Ad campaign names (utm_campaign) that open this version; middleware.ts. */
  matches: RegExp;
  eyebrow: string;
  h1: string;
  lede: string;
  /** The hero phones: front, then left and right behind it. A computer shows the first two. */
  screens: [ScreenName, ScreenName, ScreenName];
  /** Written on the phone hero's tape, from the front screen, so the two agree. */
  tape: string;
  /** Figures on the computer hero's target, from the same screens. */
  stats: [HeroStat, HeroStat, HeroStat];
  closing: string;
  closingProp: ArtName;
};

const defaultLede = "Sessions, ammo, gear and your crew, in one app.";

export const getDefault: GetVariant = {
  slug: "get", matches: /$^/, eyebrow: "Built for every type of shooter", h1: "Your range days, logged.", lede: defaultLede,
  screens: ["home", "session", "inventory"], tape: "Oct 7 · Burbank · 25 yd", stats: [{ value: "200", label: "rounds" }, { value: "$25.00", label: "spent" }, { value: "3", label: "target photos" }], closing: "Let the next one count.", closingProp: "ammoBoxes",
};

// /get, and the same page opened with the promise of the ad that sent the
// visitor (served at /get/<slug>, never indexed). Copy comes from the page
// that already makes that promise, so every claim is one the site makes.
export const getVariants: GetVariant[] = [
  { slug: "uspsa", matches: /uspsa/i, eyebrow: uspsa.eyebrow, h1: uspsa.h1, lede: uspsa.lede, screens: ["uspsaMatch", "uspsaLive", "uspsaClass"], tape: "Oct 4 · Burbank · 210 rounds", stats: [{ value: "82.0%", label: "in Carry Optics" }, { value: "14.7 s", label: "lost to time" }, { value: "75 pts", label: "lost to penalties" }], closing: uspsa.closing, closingProp: "target" },
  { slug: "idpa", matches: /idpa/i, eyebrow: idpa.eyebrow, h1: idpa.h1, lede: idpa.lede, screens: ["idpaMatch", "idpaClass", "idpaLive"], tape: "Sep 20 · Burbank · 210 rounds", stats: [{ value: "106.91 s", label: "match time" }, { value: "19 s", label: "points down" }, { value: "23.2 s", label: "behind the winner" }], closing: idpa.closing, closingProp: "target" },
  { slug: "ammo", matches: /ammo|inventory/i, eyebrow: ammoInventory.eyebrow, h1: ammoInventory.h1, lede: ammoInventory.lede, screens: ["inventory", "spending", "home"], tape: "1,900 rounds on hand", stats: [{ value: "1,900", label: "rounds on hand" }, { value: "10", label: "firearms" }, { value: "$75.00", label: "total spent" }], closing: ammoInventory.closing, closingProp: "ammoBoxes" },
  { slug: "log", matches: /(^|[^a-z])(log|journal|logbook)/i, eyebrow: shootingLog.eyebrow, h1: shootingLog.h1, lede: shootingLog.lede, screens: ["session", "calendar", "home"], tape: "Jan 14 · Session with Danny", stats: [{ value: "200", label: "rounds" }, { value: "$25.00", label: "spent" }, { value: "6", label: "sessions in January" }], closing: shootingLog.closing, closingProp: "targetPrints" },
  // The guns.com promo tile: the default page, kept separate so the QR code
  // carries the campaign too.
  { ...getDefault, slug: "gunscom", matches: /guns\.?com/i },
];
