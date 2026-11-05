"use client";

import Image from "next/image";
import coin from "@/assets/images/pro/founders-coin.webp";
import blackFriday from "@/assets/images/pro/black-friday.webp";
import { lifetimeSaleSaving, money, pricing, saleDates, saleShown, site, yearlyPerMonth, yearlySavingPct, type SalePhase } from "@/content/site";
import { useSalePhase } from "@/lib/use-sale-phase";
import styles from "./pro-plans.module.css";

const salePrice = money(pricing.lifetimeSale.price);

/** The whole card opens the web app's plans page with this plan picked. */
function PlanLink({ plan, children }: { plan: string; children: React.ReactNode }) {
  if (!site.appUrl) return null;
  return <a className={styles.pick} href={`${site.appUrl}/plans?plan=${plan}`}>{children} <span aria-hidden="true">→</span></a>;
}

/** The Black Friday banner (while saleShown) over the plans. Lifetime appears
    with the sale or once it can be bought. The sale dates follow the visitor's clock, as the app's paywall label does. */
export function ProPlans({ lifetime, phase: initial }: { lifetime: boolean; phase: SalePhase }) {
  const phase = useSalePhase(initial);
  const shown = saleShown(phase, lifetime);
  const onSale = shown && phase === "on";
  return (
    <>
      {shown && (
        <div className={styles.banner} id="black-friday">
          <Image src={blackFriday} alt="" sizes="(min-width: 800px) 90vw, 100vw" className={styles.art} />
          <div className={styles.bannerCopy}>
            <p className={styles.when}>Black Friday · {saleDates.start} – {saleDates.end}</p>
            <h3 className={styles.bannerTitle}>Founders Lifetime, {lifetimeSaleSaving} off.</h3>
            <p className={styles.bannerPrice}><s>{money(pricing.lifetime)}</s> <b>{salePrice}</b> once</p>
            <p className={styles.bannerNote}>
              All of Pro for one payment, no subscription. {onSale ? `On now, ends ${saleDates.end}.` : `Starts ${saleDates.start}.`}
            </p>
          </div>
        </div>
      )}

      <ul className={styles.plans} aria-label="Pro plans">
        <li className={styles.plan}>
          <h3 className={styles.name}>Monthly</h3>
          <p className={styles.price}><b>{money(pricing.monthly)}</b> / month</p>
          <p className={styles.note}>Starts with a {pricing.trialDays}-day free trial.</p>
          <PlanLink plan="monthly">Get Monthly</PlanLink>
        </li>
        <li className={styles.plan}>
          <h3 className={styles.name}>Yearly <span className={styles.save}>Save {yearlySavingPct}%</span></h3>
          <p className={styles.price}><b>{money(pricing.yearly)}</b> / year</p>
          <p className={styles.note}>That's {yearlyPerMonth} a month, billed yearly.</p>
          <PlanLink plan="yearly">Get Yearly</PlanLink>
        </li>
        {(lifetime || shown) && (
          <li className={`${styles.plan} ${styles.founders}`}>
            <Image src={coin} alt="" sizes="88px" className={styles.coin} />
            <h3 className={styles.name}>Founders Lifetime</h3>
            <p className={styles.price}>
              {onSale && <s>{money(pricing.lifetime)}</s>} <b>{onSale ? salePrice : money(pricing.lifetime)}</b> once
            </p>
            <p className={styles.note}>
              {onSale ? "Black Friday price. " : ""}{lifetime ? "Pay once, no subscription." : "Coming in the next update."}
              {phase === "before" && ` ${salePrice} ${saleDates.start} – ${saleDates.end}.`}
            </p>
            {lifetime && <PlanLink plan="lifetime">Get Lifetime</PlanLink>}
          </li>
        )}
      </ul>
    </>
  );
}
