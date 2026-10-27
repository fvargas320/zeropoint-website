import type { IconName } from "@/components/ui/icon";

// Six short, shipped Pro features (checked against pro_benefits.dart and the
// tier limits, 2026-10-26). Match insights joins this list when 1.5.0 is live.
export const proTiles: { icon: IconName; label: string }[] = [
  { icon: "armory", label: "Unlimited armory" },
  { icon: "cloud", label: "Cloud backup & sync" },
  { icon: "cost", label: "Cost per round" },
  { icon: "forecast", label: "Ammo pace forecasts" },
  { icon: "timer", label: "Custom drills & presets" },
  { icon: "noAds", label: "No ads" },
];

export const freeLine = "Free forever: unlimited sessions, 3 firearms, crews and drills.";
