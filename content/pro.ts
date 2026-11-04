import type { IconName } from "@/components/ui/icon";

// Six short, shipped Pro features (checked against pro_benefits.dart and the
// tier limits, 2026-10-26). Match insights joins this list when 1.5.0 is live.
// The sync tile names the computer: the web app is a Pro feature.
export const proTiles: { icon: IconName; label: string }[] = [
  { icon: "armory", label: "Unlimited armory" },
  { icon: "devices", label: "Synced to phone & computer" },
  { icon: "cost", label: "Cost per round" },
  { icon: "forecast", label: "Ammo pace forecasts" },
  { icon: "timer", label: "Custom drills & presets" },
  { icon: "noAds", label: "No ads" },
];

export const freeLine = "Free forever: unlimited sessions, 3 firearms, crews and drills.";

// The breakdown on /get, in the words of pro_benefits.dart, where each line is
// pinned to the feature behind it. Only what free users don't get.
type BigBenefit = { icon: IconName; title: string; points: string[] };
export const proBenefits: { matches: BigBenefit; analytics: BigBenefit; sync: BigBenefit; more: { icon: IconName; title: string; body: string }[] } = {
  matches: {
    icon: "target",
    title: "Match analysis",
    points: ["What if: replay a stage, see your new place", "Your place in the field and your rival record", "Each stage: what it cost, splits, a clip of the run"],
  },
  analytics: {
    icon: "cost",
    title: "Spending and training stats",
    points: ["Cost per round, range fees, ammo spend", "Low-ammo alerts before you run out", "Drill, position and distance breakdowns"],
  },
  sync: {
    icon: "devices",
    title: "Your log on phone and computer",
    points: ["The same log in the app and on the web", "Auto backup of sessions and photos", "Unlimited target photos and 25 GB of video"],
  },
  more: [
    { icon: "armory", title: "Unlimited armory", body: "Every gun, past the 3-firearm cap, with usage and service stats." },
    { icon: "timer", title: "Custom drills and presets", body: "Build your own drills and log a session in one tap." },
  ],
};

export const proPerks = ["Ad-free", "Find ranges", "Pro colors"];
