// One place for the facts the site repeats. Every claim here was checked
// against the app code on 2026-10-26 (see docs/architecture.md).

export const site = {
  name: "ZeroPoint",
  url: "https://www.zeropointlog.com",
  email: "support@zeropointlog.com",
  // The web log view (live 2026-10-28). The header shows "Log in" only when
  // this is set; null hides it.
  appUrl: "https://app.zeropointlog.com" as string | null,
  // Matches show as the current update. 1.5.0 ships 2026-10-29, so this is
  // forced on a day early on Fernando's call; Lifetime still waits for the
  // App Store itself (lib/release.ts).
  matchesLive: true,
  // Founders Lifetime ships in 1.5.0 and shows once that's live (same check).
  // Set false if the app's "founders-lifetime" PostHog switch turns it off.
  foundersLifetime: true,
};

export const stores = {
  appStoreId: "6757300865",
  appStore: "https://apps.apple.com/us/app/zeropoint-shooting-range-log/id6757300865",
  playStore: "https://play.google.com/store/apps/details?id=com.zeropoint.zeropoint",
};

/** The App Store link with a campaign token (`ct`), keeping any params it
    already has. Used by landing pages an ad points at, e.g. /idpa. */
export function appStoreLink(campaign?: string): string {
  if (!campaign) return stores.appStore;
  const url = new URL(stores.appStore);
  url.searchParams.set("ct", campaign);
  return url.toString();
}

// Real App Store figures. Update when they change; never round up.
export const rating = { value: "5.0", count: 5, source: "App Store" };

export const pricing = {
  monthly: 6.99,
  yearly: 49.99,
  /** Founders Lifetime: one payment, no subscription (app 1.5.0). */
  lifetime: 149.99,
  /** Black Friday price for Lifetime. Must match the temporary price in App
      Store Connect, as founders_lifetime.dart's sale window does. */
  lifetimeSale: { price: 99.99, startsAt: "2026-11-26T00:00:00", endsAt: "2026-12-02T00:00:00" },
  trialDays: 7,
  note: "US prices; your store shows the price in your currency.",
};

export const money = (n: number) => `$${n.toFixed(2)}`;
/** How the sale is shown. Dates read in the visitor's local time, as the app does. */
export type SalePhase = "before" | "on" | "over";
export function salePhase(now: Date): SalePhase {
  if (now < new Date(pricing.lifetimeSale.startsAt)) return "before";
  return now < new Date(pricing.lifetimeSale.endsAt) ? "on" : "over";
}
/** Whether to show the sale. It can be announced ahead of release, but once
    it's on it needs a Lifetime people can actually buy (`lifetimeLive`). */
export const saleShown = (phase: SalePhase, lifetimeLive: boolean) =>
  site.foundersLifetime && (phase === "before" || (phase === "on" && lifetimeLive));
/** The last day of the sale; endsAt is the midnight after it. */
export const saleDates = { start: "Nov 26", end: "Dec 1" };
export const lifetimeSaleSaving = `$${Math.floor(pricing.lifetime - pricing.lifetimeSale.price)}`;
/** What yearly saves against twelve months, rounded down so we never overstate it. */
export const yearlySavingPct = Math.floor((1 - pricing.yearly / (pricing.monthly * 12)) * 100);
export const yearlyPerMonth = money(Math.ceil((pricing.yearly / 12) * 100) / 100);
