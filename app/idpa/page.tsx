import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqJsonLd, LandingJsonLd } from "@/components/seo/app-json-ld";
import { FaqList } from "@/components/sections/faq-list";
import { AppScreens } from "@/components/sections/idpa/app-screens";
import { ClassTimes } from "@/components/sections/idpa/class-times";
import { ExplodedMetrics } from "@/components/sections/idpa/exploded-metrics";
import { FreePro } from "@/components/sections/idpa/free-pro";
import { IdpaClosing } from "@/components/sections/idpa/idpa-closing";
import { IdpaHero } from "@/components/sections/idpa/idpa-hero";
import { IdpaSteps } from "@/components/sections/idpa/idpa-steps";
import { MatchFeatures } from "@/components/sections/idpa/match-features";
import { Scoring } from "@/components/sections/idpa/scoring";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { idpa, idpaFaq } from "@/content/idpa";
import { matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: idpa.title,
  description: idpa.description,
  alternates: { canonical: "/idpa" },
  openGraph: { title: `ZeroPoint for IDPA shooters: ${idpa.h1}`, description: idpa.description, url: "/idpa" },
};

// Re-check the App Store hourly, as /uspsa does, so the FAQ follows the live release.
export const revalidate = 3600;

// Where the idpa.com ad and the IDPA email land. Two acts: a dark opening
// (the app, the shot timer, the flip board, five real screens), then a paper
// sheet rising over it (02 metrics, 03 score/place/gap, 04 steps, 05 scoring,
// 06 class times, 07 pricing, 08 questions), and a dark sheet for the close.
// Every section opens with the same numbered label. The App Store link
// carries ct=idpa; phones also get "Open in the app" (zeropoint://sport/idpa).
export default async function IdpaPage() {
  const faq = idpaFaq(await matchesLive());
  return (
    <>
      <SiteHeader dark />
      <main id="main">
        <IdpaHero />
        <AppScreens />
        <ExplodedMetrics />
        <MatchFeatures />
        <IdpaSteps />
        <Scoring />
        <ClassTimes />
        <FreePro />
        <FaqList items={faq} title="IDPA questions, answered." index="08" />
        <IdpaClosing />
      </main>
      <SiteFooter dark />
      <StickyStoreBar watchId="idpa-stores" campaign={idpa.campaign} />
      <FaqJsonLd items={faq} />
      <LandingJsonLd path="/idpa" name={idpa.title} crumb="IDPA" description={idpa.description} />
    </>
  );
}
