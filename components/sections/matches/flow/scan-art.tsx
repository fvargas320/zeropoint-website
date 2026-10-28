import styles from "./flow-art.module.css";

// Example rows: same numbers as the example stage further up (stage 4: 6.42).
const rows = [
  { stage: "1", hf: "7.10", pts: "142" },
  { stage: "2", hf: "5.88", pts: "118" },
  { stage: "3", hf: "6.95", pts: "160" },
  { stage: "4", hf: "6.42", pts: "137" },
];

/** Step 2: a results table is scanned and each stage row lands with a tick. */
export function ScanArt() {
  return (
    <div className={styles.screen} aria-hidden="true">
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.headRow}`}><span>Stage</span><span>HF</span><span>Pts</span></div>
        {rows.map((r, i) => (
          <div key={r.stage} className={styles.row} style={{ transitionDelay: `${500 + i * 260}ms` }}>
            <span>{r.stage}</span><span>{r.hf}</span><span>{r.pts}</span>
            <b className={styles.tick}>✓</b>
          </div>
        ))}
        <span className={styles.scan} />
      </div>
    </div>
  );
}
