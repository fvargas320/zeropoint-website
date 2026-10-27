import { Reveal } from "@/components/motion/reveal";
import { importSteps } from "@/content/matches";
import styles from "./import-steps.module.css";

/** How match results get in: three numbered steps on a line that draws
    across as they come into view. `compact` is the /get teaser version. */
export function ImportSteps({ compact = false }: { compact?: boolean }) {
  return (
    <Reveal className={styles.wrap}>
      <ol className={styles.steps} data-compact={compact || undefined}>
        {importSteps.map((s, i) => (
          <li key={s.title} className={styles.step} style={{ transitionDelay: `${150 + i * 160}ms` }}>
            <span className={styles.num} aria-hidden="true">{i + 1}</span>
            <h3 className={styles.title}>{s.title}</h3>
            {!compact && <p className={styles.body}>{s.body}</p>}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
