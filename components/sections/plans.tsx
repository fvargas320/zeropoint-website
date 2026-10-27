import { SectionHeading } from "@/components/ui/section-heading";
import { freePlan, proPlan, roadmap } from "@/content/home";
import { pricing } from "@/content/site";
import styles from "./plans.module.css";

export function Plans() {
  return (
    <section className={`wrap ${styles.section}`} id="pro" aria-labelledby="pro-title">
      <SectionHeading id="pro-title" eyebrow="Free and Pro" title="Start free. Go Pro when you're hooked." />
      <div className={styles.plans}>
        <div className={styles.plan}>
          <h3>Free</h3>
          <p className={styles.price}><b>$0</b> forever</p>
          <ul>{freePlan.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className={`${styles.plan} ${styles.pro}`}>
          <span className={styles.badge}>Pro</span>
          <h3>ZeroPoint Pro</h3>
          <p className={styles.price}><b>{pricing.monthly}</b> a month, or <b>{pricing.yearly}</b> a year</p>
          <ul>{proPlan.map((t) => <li key={t}>{t}</li>)}</ul>
          <small>{pricing.trial}</small>
        </div>
      </div>
      <div className={styles.soon}>
        <h3>Coming soon</h3>
        <div className={styles.chips}>{roadmap.map((r) => <span key={r}>{r}</span>)}</div>
      </div>
    </section>
  );
}
