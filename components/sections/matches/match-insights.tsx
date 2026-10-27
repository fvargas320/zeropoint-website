import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Prop } from "@/components/media/prop";
import { Icon } from "@/components/ui/icon";
import { TornEdge } from "@/components/ui/torn-edge";
import { exampleStats, matchesCopy } from "@/content/matches";
import { site } from "@/content/site";
import { StageBreakdown } from "./stage-breakdown";
import styles from "./match-insights.module.css";

/** Match results, decoded: a stage waterfall with stats that count up.
    Tagged "Coming in the next update" until site.matchesLive is true. */
export function MatchInsights() {
  return (
    <section className={styles.section} id="matches" aria-labelledby="matches-title">
      <TornEdge color="var(--night)" seed={23} />
      <Prop name="casings" sizes="220px" className={styles.casings} />
      <div className={`wrap ${styles.grid}`}>
        <div>
          {!site.matchesLive && <p className={styles.soon}>Coming in the next update</p>}
          <p className={`eyebrow ${styles.eyebrow}`}>{matchesCopy.eyebrow}</p>
          <h2 id="matches-title" className={styles.title}>{matchesCopy.title}</h2>
          <p className={`lede ${styles.lede}`}>{matchesCopy.lede}</p>
          <ul className={styles.sports} aria-label="Supported match types">
            {matchesCopy.sports.map((s) => (
              <li key={s}><Icon name="target" className={styles.sportIcon} />{s}</li>
            ))}
          </ul>
          <p className={styles.how}>{matchesCopy.howTo}</p>
        </div>
        <Reveal className={styles.visual} delay={120}>
          <StageBreakdown />
          <div className={styles.stats}>
            {exampleStats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statLabel}>{s.label}</span>
                <b className={styles.statValue}><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></b>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <TornEdge edge="bottom" color="var(--night)" seed={8} />
    </section>
  );
}
