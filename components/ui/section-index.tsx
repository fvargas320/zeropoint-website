import styles from "./section-index.module.css";

/** The label every section on a long landing page opens with: its number and
    name on a hairline, so the page reads as one numbered sequence. */
export function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <p className={styles.index}>
      <span>{index}</span>
      {label}
    </p>
  );
}
