import { Strike } from "@/components/ui/strike";
import { compareRows } from "@/content/home";
import styles from "./compare-table.module.css";

export function CompareTable() {
  return (
    <section className={styles.section} aria-labelledby="compare-title">
      <div className={`wrap ${styles.card}`}>
        <p className="eyebrow">Why not a notebook?</p>
        <h2 id="compare-title">The <Strike>notebook</Strike> did its best.</h2>
        <div className={styles.table} role="table" aria-label="Notebook compared with ZeroPoint">
          <div className={`${styles.row} ${styles.head}`} role="row">
            <span role="columnheader">On the range</span>
            <span role="columnheader">Notebook</span>
            <span role="columnheader">ZeroPoint</span>
          </div>
          {compareRows.map((r) => (
            <div key={r.task} className={styles.row} role="row">
              <b role="rowheader">{r.task}</b>
              <span className={styles.old} role="cell">{r.notebook}</span>
              <span className={styles.new} role="cell">{r.zeropoint}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
