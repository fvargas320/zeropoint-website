import { Reveal } from "@/components/motion/reveal";
import { uspsaCompare } from "@/content/uspsa";
import styles from "./sheet-compare.module.css";

/** Results sheet vs ZeroPoint: what you already get, and what ZeroPoint adds. */
export function SheetCompare() {
  return (
    <section className={styles.section} aria-labelledby="sheet-title">
      <div className={`wrap ${styles.card}`}>
        <p className="eyebrow">Results sheet vs ZeroPoint</p>
        <h2 id="sheet-title">The sheet tells you how you did. ZeroPoint tells you why.</h2>
        <div className={styles.cols}>
          <Reveal className={styles.col}>
            <h3>The results sheet</h3>
            <ul className={styles.sheet}>
              {uspsaCompare.sheet.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
          <Reveal className={`${styles.col} ${styles.ours}`} delay={120}>
            <h3>What ZeroPoint adds</h3>
            <ul className={styles.adds}>
              {uspsaCompare.zeropoint.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
