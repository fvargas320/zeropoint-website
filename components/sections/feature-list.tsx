import type { Feature } from "@/content/features";
import { FeatureRow } from "./feature-row";
import styles from "./feature-list.module.css";

type Props = {
  items: Feature[];
  id?: string;
  /** Home shows the pinned FeatureStory on desktop instead. */
  phonesOnly?: boolean;
};

export function FeatureList({ items, id, phonesOnly = false }: Props) {
  return (
    <div className={`wrap ${styles.list}`} id={id} data-phones-only={phonesOnly || undefined}>
      {items.map((f, i) => <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />)}
    </div>
  );
}
