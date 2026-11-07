import { shareCard } from "@/lib/share-card";

export { contentType, size } from "@/lib/share-card";

export const alt = "ZeroPoint: The all-in-one shooting log. The app taped to an orange target backer. Free on iPhone and Android.";

// The share card for every page without its own.
export default function OpengraphImage() {
  return shareCard({ eyebrow: "Built for every type of shooter", lines: ["The all-in-one", "shooting log."], titleSize: 80, screens: ["home.jpg", "session.jpg", "inventory.jpg"], tape: "Oct 7 · Burbank · 25 yd" });
}
