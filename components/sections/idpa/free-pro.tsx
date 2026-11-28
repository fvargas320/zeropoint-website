import { SectionIndex } from "@/components/ui/section-index";
import { idpaPlans } from "@/content/idpa";
import { money, pricing } from "@/content/site";
import styles from "./free-pro.module.css";

/** 07: what is free and what Pro adds for an IDPA shooter, with the price. */
export function FreePro() {
  return (
    <section className={styles.section} id="pricing" aria-labelledby="pricing-title">
      <div className="wrap">
        <SectionIndex index="07" label={idpaPlans.label} />
        <h2 id="pricing-title">{idpaPlans.title}</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Free</h3>
            <p className={styles.amount}><b>$0</b></p>
            <ul>{idpaPlans.free.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className={styles.btn} href="#download">Get the app</a>
          </div>
          <div className={`${styles.card} ${styles.pro}`}>
            <h3>Pro <span className={styles.tag}>{pricing.trialDays} days free</span></h3>
            <p className={styles.amount}><b>{money(pricing.yearly)}</b> a year, or {money(pricing.monthly)} a month</p>
            <ul>{idpaPlans.pro.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className={styles.btn} href="/#pro">See everything in Pro <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
