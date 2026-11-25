import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqJsonLd } from "@/components/seo/app-json-ld";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { FreePro } from "@/components/sections/idpa/free-pro";
import { HeroPhones } from "@/components/sections/idpa/hero-phones";
import { SheetVs } from "@/components/sections/idpa/sheet-vs";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { OpenInApp } from "@/components/ui/open-in-app";
import { idpa, idpaFaq, idpaFeatures } from "@/content/idpa";
import { matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: idpa.title,
  description: idpa.description,
  alternates: { canonical: "/idpa" },
  openGraph: { title: `ZeroPoint for IDPA shooters: ${idpa.h1}`, description: idpa.description, url: "/idpa" },
};

// Re-check the App Store hourly, as /uspsa does, so the FAQ follows the live release.
export const revalidate = 3600;

// Where the idpa.com ad and the IDPA email land: the pitch with the email's
// picture, PractiScore against ZeroPoint, four real IDPA screens, Free against
// Pro, the questions, and the App Store (ct=idpa) one tap away. Phones also get "Open in
// the app" (zeropoint://sport/idpa), which pre-selects IDPA in sign-up.
export default async function IdpaPage() {
  const faq = idpaFaq(await matchesLive());
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          eyebrow={idpa.eyebrow}
          title={idpa.h1}
          lede={idpa.lede}
          placement="idpa-hero"
          storesId="idpa-stores"
          campaign={idpa.campaign}
          afterStores={<OpenInApp href={idpa.deepLink} />}
          art={<HeroPhones />}
        />
        <SheetVs />
        <FeatureList items={idpaFeatures} />
        <FreePro />
        <FaqList items={faq} title="IDPA questions, answered." />
        <ClosingCta
          title={idpa.closing}
          lede={<>Free to start on iPhone and Android. <a href="/">See everything ZeroPoint does</a>.</>}
          prop="target"
          campaign={idpa.campaign}
        />
      </main>
      <SiteFooter />
      <StickyStoreBar watchId="idpa-stores" campaign={idpa.campaign} />
      <FaqJsonLd items={faq} />
    </>
  );
}
