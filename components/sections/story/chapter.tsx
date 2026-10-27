import { forwardRef } from "react";
import type { Feature } from "@/content/features";
import styles from "./chapter.module.css";

type Props = { feature: Feature; index: number; active: boolean };

/** One feature chapter of the pinned story; dims when it isn't the focus. */
export const Chapter = forwardRef<HTMLElement, Props>(function Chapter({ feature, index, active }, ref) {
  return (
    <article ref={ref} id={`story-${feature.id}`} className={styles.chapter} data-index={index} data-active={active || undefined}>
      <p className="eyebrow">{feature.eyebrow}</p>
      <h2>{feature.title}</h2>
      <p className={styles.body}>{feature.body}</p>
      {feature.points.length > 0 && (
        <ul className={styles.points}>
          {feature.points.map((p) => (
            <li key={p.text}>
              {p.text}
              {p.pro && <span className={styles.pro}>Pro</span>}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
});
