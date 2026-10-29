import { site } from "./site";

// The web log view (zeropoint-web-app repo). Facts from its README,
// 2026-10-28: Pro only, same account and data as the phone; Pro is sold in
// the phone app for now; /sample is public.
export const webApp = {
  url: site.appUrl ?? "https://app.zeropointlog.com",
  host: "app.zeropointlog.com",
  sample: `${site.appUrl ?? "https://app.zeropointlog.com"}/sample`,
  eyebrow: "On every screen",
  title: "Your whole log on the big screen.",
  lede: "Log at the range on your phone, then pick it up on your computer. One account, always in sync, with room to dig into every match and metric.",
  points: [
    "Your whole match season on one board, with bulk results import",
    "Cost per round, spend by caliber and group-size trends",
    "Every session with its target photos and video",
    "Export your sessions to a spreadsheet",
  ],
  note: "Included with ZeroPoint Pro.",
};
