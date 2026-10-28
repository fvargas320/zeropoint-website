import { Reveal } from "@/components/motion/reveal";
import { importSteps } from "@/content/matches";
import { PointsArt } from "./points-art";
import { ScanArt } from "./scan-art";
import { ShareArt } from "./share-art";
import styles from "./import-flow.module.css";

const art = [ShareArt, ScanArt, PointsArt];

/** How a match gets in: three steps, each with a small animated picture of
    what happens, joined by arrows. `compact` drops the body text (/get). */
export function ImportFlow({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={styles.flow} data-compact={compact || undefined}>
      {importSteps.map((s, i) => {
        const Art = art[i];
        return (
          <li key={s.title} className={styles.item}>
            <Reveal className={styles.step} delay={i * 140}>
              <Art />
              <div className={styles.text}>
                <span className={styles.num}>Step {i + 1}</span>
                <h3>{s.title}</h3>
                {!compact && <p>{s.body}</p>}
              </div>
            </Reveal>
            {i < importSteps.length - 1 && <span className={styles.arrow} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
