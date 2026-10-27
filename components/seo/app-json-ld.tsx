import { rating, site, stores } from "@/content/site";

/** schema.org MobileApplication with the real store rating. */
export function AppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "ZeroPoint - Shooting Range Log",
    operatingSystem: "iOS, Android",
    applicationCategory: "SportsApplication",
    description: "A shooting range log: sessions, firearms, ammo inventory with low-stock alerts, costs, drills and crews.",
    url: `${site.url}/`,
    installUrl: stores.appStore,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: rating.value, ratingCount: String(rating.count), bestRating: "5" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
