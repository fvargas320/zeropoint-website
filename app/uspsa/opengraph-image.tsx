import { shareCard } from "@/lib/share-card";

export { contentType, size } from "@/lib/share-card";

export const alt = "ZeroPoint for USPSA shooters: see exactly where you lost points. A USPSA match page from the app. Free on iPhone and Android.";

export default function OpengraphImage() {
  return shareCard({ eyebrow: "For USPSA shooters", lines: ["See where you", "lost points."], titleSize: 76, screens: ["uspsa-match.jpg", "uspsa-live.jpg", "uspsa-class.jpg"], tape: "Oct 4 · Burbank · 210 rounds" });
}
