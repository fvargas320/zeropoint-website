import { factChips } from "@/content/get";
import styles from "./fact-chips.module.css";

/** The answers to "is there a catch?", under the hero. */
export function FactChips() {
  return (
    <ul className={styles.chips} aria-label="At a glance">
      {factChips.map((f) => <li key={f}>{f}</li>)}
    </ul>
  );
}
