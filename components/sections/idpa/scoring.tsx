import { FlipTiles } from "@/components/ui/flip-tiles";
import { SectionIndex } from "@/components/ui/section-index";
import { idpaScoring } from "@/content/idpa";
import styles from "./scoring.module.css";

/** 05: IDPA scoring as one worked stage on the scoreboard, then what each
    penalty costs. The page's answer to "how is IDPA scored". */
export function Scoring() {
  const { sum, total, costs } = idpaScoring;
  const digits = (v: string) => v.replace(/\s*s$/, "");
  return (
    <section className={styles.section} id="scoring" aria-labelledby="scoring-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <SectionIndex index="05" label={idpaScoring.label} />
            <h2 id="scoring-title">{idpaScoring.title}</h2>
          </div>
          <p className={styles.lede}>{idpaScoring.lede}</p>
        </div>
        <div className={styles.card}>
          <div className={styles.sum} role="img" aria-label="A worked stage: 14.21 seconds on the timer, plus 4 seconds for 4 points down, plus 3 seconds for 1 procedural, is a stage score of 21.21 seconds">
            {sum.map((part, i) => (
              <span key={part.label} className={styles.part}>
                {i > 0 && <span className={styles.op}>+</span>}
                <span className={styles.fig}><FlipTiles value={digits(part.value)} /><span className={styles.cap}>{part.label}</span></span>
              </span>
            ))}
            <span className={styles.part}>
              <span className={styles.op}>=</span>
              <span className={`${styles.fig} ${styles.total}`}><FlipTiles value={digits(total.value)} glow /><span className={styles.cap}>{total.label}</span></span>
            </span>
          </div>
          <table className={styles.costs}>
            <caption className="sr-only">What each one adds to your time</caption>
            <tbody>
              {costs.map((c, i) => (
                <tr key={c.name}>
                  <th scope="row">{c.name}<span>{c.note}</span></th>
                  <td><span className="sr-only">+{c.cost}</span><FlipTiles value={digits(c.cost)} slots={2} accent={i === 0} /><span className={styles.unit} aria-hidden="true">s</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
