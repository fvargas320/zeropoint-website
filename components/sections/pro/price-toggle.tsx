"use client";

import { useEffect, useState } from "react";
import { money, pricing, yearlyPerMonth, yearlySavingPct } from "@/content/site";
import styles from "./price-toggle.module.css";

type Plan = "monthly" | "yearly" | "lifetime";

const sale = pricing.lifetimeSale;
const inSale = (now: Date) => now >= new Date(sale.startsAt) && now < new Date(sale.endsAt);

/**
 * Monthly / Yearly (and Lifetime once app 1.5.0 is live) with the price under
 * it. Monthly leads so the first price is the plain one; Yearly carries its
 * saving, worked out from the prices. Lifetime shows
 * the Black Friday price in the same window the app does (visitor's local time).
 */
export function PriceToggle({ lifetime = false }: { lifetime?: boolean }) {
  const plans: Plan[] = lifetime ? ["monthly", "yearly", "lifetime"] : ["monthly", "yearly"];
  const [plan, setPlan] = useState<Plan>("monthly");
  const [onSale, setOnSale] = useState(false);
  useEffect(() => setOnSale(inSale(new Date())), []);

  const price = { monthly: pricing.monthly, yearly: pricing.yearly, lifetime: onSale ? sale.price : pricing.lifetime }[plan];
  const per = { monthly: "/ month", yearly: "/ year", lifetime: "once" }[plan];
  const note = {
    monthly: `Starts with a ${pricing.trialDays}-day free trial.`,
    yearly: `That's ${yearlyPerMonth} a month, billed yearly.`,
    lifetime: `${onSale ? "Black Friday price. " : ""}Founders Lifetime: pay once, no subscription.`,
  }[plan];

  return (
    <div className={styles.block}>
      <div className={styles.toggle} role="radiogroup" aria-label="Billing period" style={{ "--n": plans.length } as React.CSSProperties}>
        {plans.map((p) => (
          <button key={p} type="button" role="radio" aria-checked={plan === p} className={styles.option} onClick={() => setPlan(p)}>
            {p === "monthly" ? "Monthly" : p === "yearly" ? "Yearly" : "Lifetime"}
            {p === "yearly" && (
              <span className={styles.save}>
                <span className={styles.wide}>Save </span>
                <span className={styles.narrow}>−</span>
                {yearlySavingPct}%
              </span>
            )}
          </button>
        ))}
        <span className={styles.thumb} style={{ translate: `${plans.indexOf(plan) * 100}% 0` }} aria-hidden="true" />
      </div>

      <p className={styles.price} aria-live="polite">
        <span key={plan} className={styles.amount}>{money(price)}</span>
        <span className={styles.per}>{per}</span>
      </p>
      <p className={styles.note}>{note}</p>
    </div>
  );
}
