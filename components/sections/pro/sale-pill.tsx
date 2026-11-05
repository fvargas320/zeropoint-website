"use client";

import { Announcement } from "@/components/ui/announcement";
import { money, pricing, saleDates, saleShown, type SalePhase } from "@/content/site";
import { useSalePhase } from "@/lib/use-sale-phase";

/** The Black Friday pill above a hero headline while the sale is shown, then `fallback`. */
export function SalePill({ phase: initial, lifetime, fallback = null }: { phase: SalePhase; lifetime: boolean; fallback?: React.ReactNode }) {
  const phase = useSalePhase(initial);
  if (!saleShown(phase, lifetime)) return fallback;
  const price = money(pricing.lifetimeSale.price);
  const text = phase === "on" ? `Lifetime ${price} to ${saleDates.end}` : `Lifetime ${price} ${saleDates.start}`;
  return <Announcement tag="Black Friday" text={text} href="#black-friday" />;
}
