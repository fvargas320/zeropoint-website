import type { Feature } from "@/content/features";
import { FeatureRow } from "./feature-row";

export function FeatureList({ items, id }: { items: Feature[]; id?: string }) {
  return (
    <div className="wrap" id={id} style={{ paddingTop: "clamp(48px, 8vw, 110px)", scrollMarginTop: 72 }}>
      {items.map((f, i) => <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />)}
    </div>
  );
}
