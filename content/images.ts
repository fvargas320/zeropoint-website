import type { StaticImageData } from "next/image";
import calendar from "@/assets/images/app/calendar.webp";
import crew from "@/assets/images/app/crew.webp";
import home from "@/assets/images/app/home.webp";
import idpaClass from "@/assets/images/app/idpa-class.webp";
import idpaLive from "@/assets/images/app/idpa-live.webp";
import idpaMatch from "@/assets/images/app/idpa-match.webp";
import idpaResults from "@/assets/images/app/idpa-results.webp";
import idpaTerms from "@/assets/images/app/idpa-terms.webp";
import inventory from "@/assets/images/app/inventory.webp";
import lowstock from "@/assets/images/app/lowstock-app.webp";
import metrics from "@/assets/images/app/metrics.webp";
import spending from "@/assets/images/app/metrics-spending.webp";
import session from "@/assets/images/app/session.webp";
import train from "@/assets/images/app/train.webp";
import uspsaClass from "@/assets/images/app/uspsa-class.webp";
import uspsaCompete from "@/assets/images/app/uspsa-compete.webp";
import uspsaImport from "@/assets/images/app/uspsa-import.webp";
import uspsaLive from "@/assets/images/app/uspsa-live.webp";
import uspsaMatch from "@/assets/images/app/uspsa-match.webp";
import uspsaResults from "@/assets/images/app/uspsa-results.webp";
import ammoBoxes from "@/assets/images/art/ammo-boxes.webp";
import casings from "@/assets/images/art/casings-tape.webp";
import crewPrints from "@/assets/images/art/crew-prints.webp";
import dollars from "@/assets/images/art/dollars.webp";
import notebook from "@/assets/images/art/notebook-x.webp";
import notification from "@/assets/images/art/notification.webp";
import receipts from "@/assets/images/art/receipts.webp";
import target from "@/assets/images/art/target.webp";
import targetPrints from "@/assets/images/art/target-prints.webp";

export type Shot = { src: StaticImageData; alt: string };

// Real app captures (demo data, iPhone 6.9", Oct 9 2026).
export const screens = {
  // USPSA renders from the app's own screen tests (synthetic demo data, 375pt
  // dark to match the device captures, docs/design/competition in rangeai),
  // cropped to the first screen with the device status bar added on top.
  uspsaMatch: { src: uspsaMatch, alt: "A USPSA match page for Area 6 Championship: 82.0% in Carry Optics, 17th of 30, with Biggest costs of 14.7 s lost to time and 75 points lost to penalties" },
  uspsaResults: { src: uspsaResults, alt: "Full match results, overall, with your row pinned at the top: 23rd, C class Carry Optics, 81.95% and 811.8 points, above the match leaders" },
  uspsaImport: { src: uspsaImport, alt: "Bring in your results from PractiScore in three steps: open the results, tap Share, choose ZeroPoint" },
  uspsaClass: { src: uspsaClass, alt: "USPSA Classification in Carry Optics: A class, 79.8% projected and 5.2% to M, with the fastest path to M listing the classifier runs that would get you there" },
  uspsaLive: { src: uspsaLive, alt: "A live USPSA match after stage 3 of 8: 17th of 30 so far, down 2 places, with 6 of 8 stages in and an Update results button" },
  uspsaCompete: { src: uspsaCompete, alt: "The Compete tab: Area 6 Championship in 3 days, a packing checklist, and a Start a classifier button" },
  home: { src: home, alt: "ZeroPoint home: last session, this week's range days and a training card" },
  session: { src: session, alt: "A logged session: 200 rounds, $25 spent, Glock 19 at Burbank, with target photos" },
  inventory: { src: inventory, alt: "Inventory listing firearms with their calibers and last session" },
  lowstock: { src: lowstock, alt: "Notification settings for low-stock and maintenance alerts" },
  calendar: { src: calendar, alt: "Calendar of range days with sessions highlighted" },
  metrics: { src: metrics, alt: "Metrics: sessions, rounds fired, firearms used and ranges visited" },
  spending: { src: spending, alt: "Metrics showing sessions per month, total spent and shooting buddies" },
  train: { src: train, alt: "Train tab with a 5×5 drill and drills like Dot Torture" },
  crew: { src: crew, alt: "A crew chat planning a Saturday range day" },
  // IDPA renders, the same way (375pt dark, docs/design/competition).
  idpaMatch: { src: idpaMatch, alt: "An IDPA match page: 106.91 s match time, split into shooting, points down and penalties, with a How to read this card" },
  idpaClass: { src: idpaClass, alt: "IDPA Classification: Marksman projected from a best 5x5 of 31.26 s, classifier due by Nov 22, and the times needed for Sharpshooter" },
  idpaLive: { src: idpaLive, alt: "A live IDPA match: 77.40 s so far after 3 of 6 stages, with a Score stage 4 button" },
  idpaResults: { src: idpaResults, alt: "Enter results by hand: place in division, overall place, class, class place, categories and Promoted to" },
  idpaTerms: { src: idpaTerms, alt: "IDPA terms: final time, raw time, points down, misses and penalties, each in plain words" },
} satisfies Record<string, Shot>;

// Cut-out props from the App Store set; decorative, so no alt text.
export const art = {
  ammoBoxes, casings, crewPrints, dollars, notebook, notification, receipts, target, targetPrints,
} satisfies Record<string, StaticImageData>;

export type ScreenName = keyof typeof screens;
export type ArtName = keyof typeof art;
