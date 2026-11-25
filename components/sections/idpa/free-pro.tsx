import { Reveal } from "@/components/motion/reveal";
import { idpaPlans } from "@/content/idpa";
import { money, pricing } from "@/content/site";
import styles from "./free-pro.module.css";

/** What is free and what Pro adds for an IDPA shooter, with the price. */
export function FreePro() {
  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className="wrap">
        <p className="eyebrow">Pricing</p>
        <h2 id="pricing-title">{idpaPlans.title}</h2>
        <div className={styles.cards}>
          <Reveal className={styles.card}>
            <h3>Free</h3>
            <ul>
              {idpaPlans.free.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
          <Reveal className={`${styles.card} ${styles.pro}`} delay={120}>
            <h3>Pro <span className={styles.tag}>{pricing.trialDays} days free</span></h3>
            <ul>
              {idpaPlans.pro.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <p className={styles.price}>{money(pricing.yearly)} a year or {money(pricing.monthly)} a month</p>
            <a className={styles.more} href="/#pro">See everything in Pro <span aria-hidden="true">→</span></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
