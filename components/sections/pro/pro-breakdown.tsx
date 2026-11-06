import { Laptop } from "@/components/media/laptop";
import { Phone } from "@/components/media/phone";
import { Reveal } from "@/components/motion/reveal";
import { SwipeRow } from "@/components/motion/swipe-row";
import { StoreButtons } from "@/components/ui/store-buttons";
import { TornEdge } from "@/components/ui/torn-edge";
import webSample from "@/assets/images/web-sample.webp";
import type { ScreenName } from "@/content/images";
import { proBenefits, proPerks } from "@/content/pro";
import { pricing, type SalePhase } from "@/content/site";
import { ProPlans } from "./pro-plans";
import styles from "./pro-breakdown.module.css";

type Props = {
  /** The match screen for the big tile, in the visitor's sport. */
  matchScreen: ScreenName;
  lifetime: boolean;
  phase: SalePhase;
  /** Sent with store_click. */
  placement: string;
  /** The tiles swipe sideways on a phone. */
  swipe?: boolean;
};

/** What Pro adds and what it costs: the biggest features on
    real screens, the same log on laptop and phone, the rest as tiles, then the
    plans and any sale. */
export function ProBreakdown({ matchScreen, lifetime, phase, placement, swipe = false }: Props) {
  const { matches, analytics, sync, more } = proBenefits;
  const tiles = (
    <div className={styles.big}>
      {[{ ...matches, screen: matchScreen }, { ...analytics, screen: "spending" as const }].map((b, i) => (
        <Reveal key={b.title} delay={i * 80} className={styles.tile}>
          <div className={styles.tileCopy}>
            <p className={styles.label}>{b.label}</p>
            <h3>{b.title}</h3>
            <ul>{b.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <Phone screen={b.screen} sizes="(min-width: 800px) 240px, 46vw" decorative className={styles.phone} />
        </Reveal>
      ))}
      <Reveal delay={160} className={`${styles.tile} ${styles.wide}`}>
        <div className={styles.tileCopy}>
          <p className={styles.label}>{sync.label}</p>
          <h3>{sync.title}</h3>
          <ul>{sync.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className={styles.devices}>
          <Laptop src={webSample} sizes="(min-width: 800px) 44vw, 80vw" className={styles.laptop} />
          <Phone screen="session" sizes="(min-width: 800px) 13vw, 26vw" decorative className={styles.devicePhone} />
        </div>
      </Reveal>
    </div>
  );
  return (
    <section className={styles.section} data-short={swipe || undefined} id="pro" aria-labelledby="pro-title" data-track-view="pro">
      <TornEdge color="var(--night)" seed={11} />
      <div className="wrap">
        <p className={`eyebrow ${styles.eyebrow}`}>ZeroPoint Pro</p>
        <h2 id="pro-title" className={styles.title}>What Pro gets you.</h2>
        <p className={styles.lede}>Pro adds the numbers behind every range day, and keeps them safe.</p>

        {swipe ? <SwipeRow labels={[matches.title, analytics.title, sync.title]} className={styles.run} dotsClassName={styles.runDots}>{tiles}</SwipeRow> : tiles}

        <ul className={`${styles.more} ${swipe ? "not-phone" : ""}`}>
          {more.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={i * 70} className={styles.small}>
                <p className={styles.label}>{m.label}</p>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <ul className={`${styles.perks} ${swipe ? "not-phone" : ""}`} aria-label="Also in Pro">
          {proPerks.map((p) => <li key={p}>{p}</li>)}
        </ul>

        <ProPlans lifetime={lifetime} phase={phase} short={swipe} />

        <div className={styles.cta}>
          <div>
            <p className={`${styles.ctaTitle} ${swipe ? "not-phone" : ""}`}>Or download the app and pick a plan there.</p>
            <p className={styles.fine}>{pricing.note}</p>
          </div>
          <StoreButtons placement={placement} className={swipe ? "not-phone" : undefined} />
        </div>
      </div>
      <TornEdge edge="bottom" color="var(--night)" seed={4} />
    </section>
  );
}
