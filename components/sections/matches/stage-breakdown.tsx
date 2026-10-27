import { exampleStage } from "@/content/matches";
import styles from "./stage-breakdown.module.css";

const max = Math.max(...exampleStage.rows.map((r) => Math.abs(r.value)));

/** "Where the points went" for one example stage, drawn as a waterfall whose
    bars grow in when the card is revealed. Built in HTML, not a screenshot. */
export function StageBreakdown() {
  return (
    <figure className={styles.card}>
      <figcaption className={styles.head}>
        <span className={styles.kicker}>Example · {exampleStage.name}</span>
        <b>Where the points went</b>
      </figcaption>
      <ul className={styles.rows}>
        {exampleStage.rows.map((r, i) => (
          <li key={r.label} className={styles.row} data-kind={r.kind}>
            <span className={styles.label}>{r.label}</span>
            <span className={styles.track}>
              <span
                className={styles.bar}
                style={{ width: `${(Math.abs(r.value) / max) * 100}%`, transitionDelay: `${200 + i * 120}ms` }}
              />
            </span>
            <span className={styles.value}>{r.value > 0 ? r.value : `−${Math.abs(r.value)}`}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
