import { isValidElement, type ReactNode } from "react";
import type { Faq } from "@/content/faq";
import { rating, site, stores } from "@/content/site";

/** schema.org ZeroPoint as an organization, a site and an app with the real store rating. */
export function AppJsonLd() {
  const org = `${site.url}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        url: `${site.url}/`,
        logo: `${site.url}/icon.png`,
        sameAs: [stores.appStore, stores.playStore],
        contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, url: `${site.url}/support` },
      },
      { "@type": "WebSite", name: site.name, url: `${site.url}/`, publisher: { "@id": org } },
      {
        "@type": "MobileApplication",
        name: "ZeroPoint - Shooting Range Log",
        operatingSystem: "iOS, Android",
        applicationCategory: "SportsApplication",
        description: "A shooting range log: sessions, firearms, ammo inventory with low-stock alerts, costs, drills and crews.",
        url: `${site.url}/`,
        installUrl: stores.appStore,
        publisher: { "@id": org },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: rating.value, ratingCount: String(rating.count), bestRating: "5" },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** schema.org data for a landing page: the page, its breadcrumb and the app
    it is about, with the real store rating. */
export function LandingJsonLd({ path, name, crumb, description }: { path: string; name: string; crumb: string; description: string }) {
  const url = `${site.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@type": "WebSite", name: site.name, url: `${site.url}/` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: {
          "@type": "MobileApplication",
          name: "ZeroPoint - Shooting Range Log",
          operatingSystem: "iOS, Android",
          applicationCategory: "SportsApplication",
          description,
          url,
          installUrl: stores.appStore,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: rating.value, ratingCount: String(rating.count), bestRating: "5" },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** An answer's words, without the links some of them hold. */
function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement(node)) return plainText((node.props as { children?: ReactNode }).children);
  return "";
}

/** schema.org FAQPage from the questions shown on the page. */
export function FaqJsonLd({ items }: { items: Faq[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
