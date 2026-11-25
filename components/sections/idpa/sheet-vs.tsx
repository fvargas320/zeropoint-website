import { Reveal } from "@/components/motion/reveal";
import { idpaVersus } from "@/content/idpa";
import styles from "./sheet-vs.module.css";

/** The reason to download, in two lines: what the posted results give you
    and what ZeroPoint adds. */
export function SheetVs() {
  return (
    <section className={`wrap ${styles.strip}`} aria-label="PractiScore results and ZeroPoint">
      <Reveal className={styles.card}>
        <p className="eyebrow">{idpaVersus.sheet.eyebrow}</p>
        <p className={styles.line}>{idpaVersus.sheet.line}</p>
      </Reveal>
      <Reveal className={`${styles.card} ${styles.ours}`} delay={120}>
        <p className="eyebrow">{idpaVersus.ours.eyebrow}</p>
        <p className={styles.line}>{idpaVersus.ours.line}</p>
      </Reveal>
    </section>
  );
}
