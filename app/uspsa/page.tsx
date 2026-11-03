import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { uspsa, uspsaFeatures, uspsaSteps } from "@/content/uspsa";

export const metadata: Metadata = {
  title: uspsa.title,
  description: uspsa.description,
  alternates: { canonical: "/uspsa" },
  openGraph: { title: `ZeroPoint for USPSA shooters: ${uspsa.h1}`, description: uspsa.description, url: "/uspsa" },
};

// The page a USPSA club or uspsa.org could link to: the pitch, five real
// USPSA screens, how it works, and the store buttons. Sibling of /idpa.
export default function UspsaPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          eyebrow={uspsa.eyebrow}
          title={uspsa.h1}
          lede={uspsa.lede}
          placement="uspsa-hero"
          storesId="uspsa-stores"
          art={<BenchArt back="target" front="casings" screens={["uspsaMatch", "uspsaLive", "uspsaCompete"]} />}
        />
        <FeatureList items={uspsaFeatures} />
        <Steps title="How it works." items={uspsaSteps} />
        <ClosingCta
          title={uspsa.closing}
          lede={<>Free to start on iPhone and Android. <a href="/">See everything ZeroPoint does</a>.</>}
          prop="target"
        />
      </main>
      <SiteFooter />
      <StickyStoreBar watchId="uspsa-stores" />
    </>
  );
}
