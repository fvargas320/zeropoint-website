"use client";

import { useState } from "react";
import { money, pricing, yearlyPerMonth, yearlySavingPct } from "@/content/site";
import styles from "./price-toggle.module.css";

type Plan = "monthly" | "yearly";

/** Monthly / Yearly switch with the price under it. Yearly leads, and its
    saving is worked out from the two prices so the badge can't drift. */
export function PriceToggle() {
  const [plan, setPlan] = useState<Plan>("yearly");
  const yearly = plan === "yearly";

  return (
    <div className={styles.block}>
      <div className={styles.toggle} role="radiogroup" aria-label="Billing period">
        <button type="button" role="radio" aria-checked={!yearly} className={styles.option} onClick={() => setPlan("monthly")}>
          Monthly
        </button>
        <button type="button" role="radio" aria-checked={yearly} className={styles.option} onClick={() => setPlan("yearly")}>
          Yearly <span className={styles.save}>Save {yearlySavingPct}%</span>
        </button>
        <span className={styles.thumb} data-plan={plan} aria-hidden="true" />
      </div>

      <p className={styles.price} aria-live="polite">
        <span key={plan} className={styles.amount}>{money(yearly ? pricing.yearly : pricing.monthly)}</span>
        <span className={styles.per}>/ {yearly ? "year" : "month"}</span>
      </p>
      <p className={styles.note}>
        {yearly ? `That's ${yearlyPerMonth} a month, billed yearly.` : `Starts with a ${pricing.trialDays}-day free trial.`}
      </p>
    </div>
  );
}
