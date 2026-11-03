import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { ProofStrip } from "@/components/sections/uspsa/proof-strip";
import { SheetCompare } from "@/components/sections/uspsa/sheet-compare";
import { uspsa, uspsaFaq, uspsaFeatures, uspsaSteps } from "@/content/uspsa";
import { foundersLive, matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: uspsa.title,
  description: uspsa.description,
  alternates: { canonical: "/uspsa" },
  openGraph: { title: `ZeroPoint for USPSA shooters: ${uspsa.h1}`, description: uspsa.description, url: "/uspsa" },
};

// Re-check the App Store hourly, as Home does, so the FAQ and the Pro
// prices follow the live release.
export const revalidate = 3600;

// The page a USPSA club or uspsa.org could link to: the pitch, one real match
// in numbers, the results sheet vs ZeroPoint, five real USPSA screens, how it
// works, a short FAQ and the store buttons. Sibling of /idpa.
export default async function UspsaPage() {
  const [live, founders] = await Promise.all([matchesLive(), foundersLive()]);
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
        <ProofStrip />
        <SheetCompare />
        <FeatureList items={uspsaFeatures} />
        <Steps title="How it works." items={uspsaSteps} />
        <FaqList items={uspsaFaq(live, founders)} title="Good to know." />
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
