import { shareCard } from "@/lib/share-card";

export { contentType, size } from "@/lib/share-card";

export const alt = "ZeroPoint: Your range days, logged. The app taped to an orange target backer. Free on iPhone and Android.";

export default function OpengraphImage() {
  return shareCard({ eyebrow: "Built for every type of shooter", lines: ["Your range", "days, logged."], screens: ["home.jpg", "session.jpg", "inventory.jpg"], tape: "Oct 7 · Burbank · 25 yd" });
}
