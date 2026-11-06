import type { Feature } from "@/content/features";
import { FeatureRow } from "./feature-row";
import styles from "./feature-list.module.css";

type Props = {
  items: Feature[];
  id?: string;
};

export function FeatureList({ items, id }: Props) {
  return (
    <div className={`wrap ${styles.list}`} id={id}>
      {items.map((f, i) => <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />)}
    </div>
  );
}
