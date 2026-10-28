import { Phone } from "@/components/media/phone";
import { Reveal } from "@/components/motion/reveal";
import { TornEdge } from "@/components/ui/torn-edge";
import { freeLine } from "@/content/pro";
import { pricing } from "@/content/site";
import { PriceToggle } from "./price-toggle";
import { ProTiles } from "./pro-tiles";
import styles from "./pro-spotlight.module.css";

/** ZeroPoint Pro on a dark, lit stage: one price, six short features, one
    call to action. The free plan is a single line, not a second card. */
export function ProSpotlight({ lifetime = false }: { lifetime?: boolean }) {
  return (
    <section className={styles.section} id="pro" aria-labelledby="pro-title">
      <TornEdge color="var(--night)" seed={11} />
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>ZeroPoint Pro</p>
          <h2 id="pro-title" className={styles.title}>More from every range day.</h2>
          <PriceToggle lifetime={lifetime} />
          <ProTiles />
          <div className={styles.actions}>
            <a className={styles.cta} href="#download">Start free <span aria-hidden="true">→</span></a>
            <p className={styles.free}>{freeLine}</p>
          </div>
          <p className={styles.fine}>{pricing.note}</p>
        </div>
        <Reveal className={styles.stage} delay={150}>
          <span className={styles.glow} aria-hidden="true" />
          <Phone screen="spending" sizes="(min-width: 960px) 24vw, 60vw" decorative className={styles.phone} />
        </Reveal>
      </div>
      <TornEdge edge="bottom" color="var(--night)" seed={4} />
    </section>
  );
}
