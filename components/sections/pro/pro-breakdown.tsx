import { Phone } from "@/components/media/phone";
import { Prop } from "@/components/media/prop";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { StoreButtons } from "@/components/ui/store-buttons";
import { TornEdge } from "@/components/ui/torn-edge";
import type { ScreenName } from "@/content/images";
import { freeLine, proBenefits, proPerks } from "@/content/pro";
import { pricing, type SalePhase } from "@/content/site";
import { ProPlans } from "./pro-plans";
import styles from "./pro-breakdown.module.css";

type Props = {
  /** The match screen for the big tile, in the visitor's sport. */
  matchScreen: ScreenName;
  lifetime: boolean;
  phase: SalePhase;
};

/** What Pro adds and what it costs, for a paid page: the two biggest features
    on real screens, the rest as tiles, then the plans and any sale. */
export function ProBreakdown({ matchScreen, lifetime, phase }: Props) {
  const { matches, analytics, more } = proBenefits;
  return (
    <section className={styles.section} id="pro" aria-labelledby="pro-title" data-track-view="pro">
      <TornEdge color="var(--night)" seed={11} />
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>ZeroPoint Pro</p>
            <h2 id="pro-title" className={styles.title}>What Pro gets you.</h2>
            <p className={styles.lede}>{freeLine} Pro adds the numbers behind every range day, and keeps them safe.</p>
          </div>
          <Prop name="notepadPro" sizes="(min-width: 800px) 240px, 0px" className={styles.notepad} />
        </div>

        <div className={styles.big}>
          {[{ ...matches, screen: matchScreen }, { ...analytics, screen: "spending" as const }].map((b, i) => (
            <Reveal key={b.title} delay={i * 80} className={styles.tile}>
              <div className={styles.tileCopy}>
                <Icon name={b.icon} className={styles.icon} />
                <h3>{b.title}</h3>
                <ul>{b.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <Phone screen={b.screen} sizes="(min-width: 800px) 240px, 46vw" decorative className={styles.phone} />
            </Reveal>
          ))}
        </div>

        <ul className={styles.more}>
          {more.map((m, i) => (
            <li key={m.title}>
              <Reveal delay={i * 70} className={styles.small}>
                <Icon name={m.icon} className={styles.icon} />
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <ul className={styles.perks} aria-label="Also in Pro">
          {proPerks.map((p) => <li key={p}>{p}</li>)}
        </ul>

        <ProPlans lifetime={lifetime} phase={phase} />

        <div className={styles.cta}>
          <div>
            <p className={styles.ctaTitle}>Download free, then pick a plan in the app.</p>
            <p className={styles.fine}>{pricing.note}</p>
          </div>
          <StoreButtons placement="get-pro" />
        </div>
      </div>
      <TornEdge edge="bottom" color="var(--night)" seed={4} />
    </section>
  );
}
