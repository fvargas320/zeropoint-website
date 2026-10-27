import { matchInsights, matchesFreeNote } from "@/content/matches";
import styles from "./insight-list.module.css";

/** What an imported match shows, with the Pro items marked. */
export function InsightList() {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>What you get from every match</h3>
      <ul className={styles.list}>
        {matchInsights.map((m) => (
          <li key={m.label}>
            <span className={styles.check} aria-hidden="true">✓</span>
            <span>{m.label}</span>
            {m.pro && <span className={styles.pro}>Pro</span>}
          </li>
        ))}
      </ul>
      <p className={styles.note}>{matchesFreeNote}</p>
    </div>
  );
}
