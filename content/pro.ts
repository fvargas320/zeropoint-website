import type { IconName } from "@/components/ui/icon";

export const freeLine = "Free forever: unlimited sessions, 3 firearms, crews and drills.";

// The Pro breakdown, in the words of pro_benefits.dart, where each line is
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
