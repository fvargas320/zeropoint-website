import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { OpenInApp } from "@/components/ui/open-in-app";
import { idpa, idpaFeatures, idpaSteps } from "@/content/idpa";

export const metadata: Metadata = {
  title: idpa.title,
  description: idpa.description,
  alternates: { canonical: "/idpa" },
  openGraph: { title: `ZeroPoint for IDPA shooters: ${idpa.h1}`, description: idpa.description, url: "/idpa" },
};

// Where the idpa.com ad lands: the pitch, four real IDPA screens, how it
// works, and the App Store (ct=idpa) one tap away. Phones also get "Open in
// the app" (zeropoint://sport/idpa), which pre-selects IDPA in sign-up.
export default function IdpaPage() {
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
          art={<BenchArt back="target" front="casings" screens={["idpaMatch", "idpaClass", "idpaTerms"]} />}
        />
        <FeatureList items={idpaFeatures} />
        <Steps title="How it works." items={idpaSteps} />
        <ClosingCta
          title={idpa.closing}
          lede={<>Free to start on iPhone and Android. <a href="/">See everything ZeroPoint does</a>.</>}
          prop="target"
          campaign={idpa.campaign}
        />
      </main>
      <SiteFooter />
      <StickyStoreBar watchId="idpa-stores" campaign={idpa.campaign} />
    </>
  );
}
