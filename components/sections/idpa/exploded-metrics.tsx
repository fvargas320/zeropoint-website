import { SectionIndex } from "@/components/ui/section-index";
import { idpaMetrics } from "@/content/idpa";
import { ScreenPiece } from "./screen-piece";
import styles from "./exploded-metrics.module.css";

/** 02, where the paper sheet rises over the dark opening: the match page cut
    into pieces around the one number that matters. */
export function ExplodedMetrics() {
  const { total, pieces, chips } = idpaMetrics;
  return (
    <section className={styles.act} id="metrics" aria-labelledby="metrics-title">
      <div className={styles.sheet}>
        <div className="wrap">
          <SectionIndex index="02" label={idpaMetrics.label} />
          <h2 id="metrics-title">{idpaMetrics.title}</h2>
          <div className={styles.stage}>
            <svg className={styles.ring} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.25" aria-hidden="true">
              {[49.5, 38, 26, 14].map((r) => <circle key={r} cx="50" cy="50" r={r} />)}
            </svg>
            <p className={styles.total}><b>{total.value}<small>{total.unit}</small></b><span>{total.label}</span></p>
            {pieces.map((p, i) => <ScreenPiece key={p.label} {...p} className={`${styles.piece} ${styles[`p${i}`]}`} />)}
            {chips.map((c, i) => (
              <p key={c.label} className={`${styles.chip} ${styles[`c${i}`]}`} data-accent={c.accent || undefined}><b>{c.value}</b>{c.label}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
