import { shareCard } from "@/lib/share-card";

export { contentType, size } from "@/lib/share-card";

export const alt = "ZeroPoint for IDPA shooters: see where your seconds went. A real IDPA match page from the app. Free on iPhone and Android.";

export default function OpengraphImage() {
  return shareCard({ eyebrow: "For IDPA shooters", lines: ["See where your", "seconds went."], titleSize: 76, screens: ["idpa-match.jpg", "idpa-class.jpg", "idpa-live.jpg"], tape: "Sep 20 · Burbank · 210 rounds" });
}
