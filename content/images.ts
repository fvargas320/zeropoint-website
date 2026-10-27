import type { StaticImageData } from "next/image";
import calendar from "@/assets/images/app/calendar.webp";
import crew from "@/assets/images/app/crew.webp";
import home from "@/assets/images/app/home.webp";
import inventory from "@/assets/images/app/inventory.webp";
import lowstock from "@/assets/images/app/lowstock-app.webp";
import metrics from "@/assets/images/app/metrics.webp";
import spending from "@/assets/images/app/metrics-spending.webp";
import session from "@/assets/images/app/session.webp";
import train from "@/assets/images/app/train.webp";
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
  home: { src: home, alt: "ZeroPoint home: last session, this week's range days and a training card" },
  session: { src: session, alt: "A logged session: 200 rounds, $25 spent, Glock 19 at Burbank, with target photos" },
  inventory: { src: inventory, alt: "Inventory listing firearms with their calibers and last session" },
  lowstock: { src: lowstock, alt: "Notification settings for low-stock and maintenance alerts" },
  calendar: { src: calendar, alt: "Calendar of range days with sessions highlighted" },
  metrics: { src: metrics, alt: "Metrics: sessions, rounds fired, firearms used and ranges visited" },
  spending: { src: spending, alt: "Metrics showing sessions per month, total spent and shooting buddies" },
  train: { src: train, alt: "Train tab with a 5×5 drill and drills like Dot Torture" },
  crew: { src: crew, alt: "A crew chat planning a Saturday range day" },
} satisfies Record<string, Shot>;

// Cut-out props from the App Store set; decorative, so no alt text.
export const art = {
  ammoBoxes, casings, crewPrints, dollars, notebook, notification, receipts, target, targetPrints,
} satisfies Record<string, StaticImageData>;

export type ScreenName = keyof typeof screens;
export type ArtName = keyof typeof art;
