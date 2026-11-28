"use client";

import { money, pricing, saleDates, saleShown, site, yearlyPerMonth, yearlySavingPct, type SalePhase } from "@/content/site";
import { useSalePhase } from "@/lib/use-sale-phase";
import styles from "./pro-plans.module.css";

const salePrice = money(pricing.lifetimeSale.price);

/** The plan's button; the whole card opens the web app's plans page with this plan picked. */
function PlanLink({ plan, children }: { plan: string; children: React.ReactNode }) {
  if (!site.appUrl) return null;
  return <a className={styles.pick} href={`${site.appUrl}/plans?plan=${plan}`}>{children}</a>;
}

/** The Pro plans on a paper sheet: Monthly, Yearly and, with the sale or once
    it can be bought, Founders Lifetime. The Black Friday offer is said once,
    inside the Lifetime card (while saleShown), which is also where the
    announcement pill lands. No art: the prices are the picture. The sale
    dates follow the visitor's clock, as the app's paywall label does. */
export function ProPlans({ lifetime, phase: initial, short = false }: { lifetime: boolean; phase: SalePhase; short?: boolean }) {
  const phase = useSalePhase(initial);
  const shown = saleShown(phase, lifetime);
  const onSale = shown && phase === "on";
  // The short version swaps in fewer words on a phone.
  const say = (full: React.ReactNode, brief: string) => (short ? <><span className="not-phone">{full}</span><span className={styles.brief}>{brief}</span></> : full);
  const lifetimeBrief = lifetime ? "Pay once. No subscription." : `Coming soon. ${salePrice} on Black Friday.`;
  return (
    <ul className={styles.plans} data-short={short || undefined} aria-label="Pro plans">
      <li className={styles.plan}>
        <h3 className={styles.name}>Monthly</h3>
        <p className={styles.price}><b>{money(pricing.monthly)}</b> {say("/ month", "/mo")}</p>
        <p className={styles.note}>{say(`Starts with a ${pricing.trialDays}-day free trial.`, `${pricing.trialDays} days free`)}</p>
        <PlanLink plan="monthly">Get Monthly</PlanLink>
      </li>
      <li className={styles.plan}>
        <h3 className={styles.name}>Yearly <span className={styles.save}>Save {yearlySavingPct}%</span></h3>
        <p className={styles.price}><b>{money(pricing.yearly)}</b> {say("/ year", "/yr")}</p>
        <p className={styles.note}>{say(`That's ${yearlyPerMonth} a month, billed yearly.`, `${yearlyPerMonth} a month`)}</p>
        <PlanLink plan="yearly">Get Yearly</PlanLink>
      </li>
      {(lifetime || shown) && (
        <li className={`${styles.plan} ${styles.founders}`} id={shown ? "black-friday" : undefined}>
          {shown && <p className={styles.when}>Black Friday · {onSale ? `ends ${saleDates.end}` : `${saleDates.start} – ${saleDates.end}`}</p>}
          <h3 className={styles.name}>Founders Lifetime</h3>
          <p className={styles.price}>
            {onSale && <s>{money(pricing.lifetime)}</s>} <b>{onSale ? salePrice : money(pricing.lifetime)}</b> once
          </p>
          <p className={styles.note}>
            {say(<>
              {lifetime ? "All of Pro for one payment. No subscription." : "Coming in the next update."}
              {phase === "before" && ` ${salePrice} ${saleDates.start} – ${saleDates.end}.`}
            </>, lifetimeBrief)}
          </p>
          {lifetime && <PlanLink plan="lifetime">Get Lifetime <span aria-hidden="true">→</span></PlanLink>}
        </li>
      )}
    </ul>
  );
}
