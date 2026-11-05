import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppJsonLd, FaqJsonLd } from "@/components/seo/app-json-ld";
import { BrandFilm } from "@/components/sections/brand-film";
import { ClosingCta } from "@/components/sections/closing-cta";
import { CompareTable } from "@/components/sections/compare-table";
import { FactsStrip } from "@/components/sections/facts-strip";
import { FaqList } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { MatchInsights } from "@/components/sections/matches/match-insights";
import { PrivacyCard } from "@/components/sections/privacy-card";
import { ProBreakdown } from "@/components/sections/pro/pro-breakdown";
import { SalePill } from "@/components/sections/pro/sale-pill";
import { Features } from "@/components/sections/story/features";
import { TargetHero } from "@/components/sections/target-hero";
import { WebAppSection } from "@/components/sections/web-app/web-app-section";
import { WhatsNext } from "@/components/sections/whats-next";
import { Announcement } from "@/components/ui/announcement";
import { FactChips } from "@/components/ui/fact-chips";
import { QrInstall } from "@/components/ui/qr-install";
import { RotatingStrike } from "@/components/ui/rotating-strike";
import webSample from "@/assets/images/web-sample.webp";
import { homeFaq } from "@/content/faq";
import { heroStats, heroStrikes } from "@/content/home";
import { salePhase } from "@/content/site";
import { foundersLive, matchesLive } from "@/lib/release";

// Rhythm: cream hero → dark Matches (the headline feature) → cream story →
// the web app → the brand film → cream comparison → dark Pro → cream privacy → dark what's next → cream FAQ →
// orange download.
// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [live, founders] = await Promise.all([matchesLive(), foundersLive()]);
  const phase = salePhase(new Date());
  const faq = homeFaq(live, founders);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          announcement={<SalePill phase={phase} lifetime={founders} fallback={<Announcement tag={live ? "New update" : "Next update"} text="Import your match results" href="#matches" />} />}
          eyebrow="The shooting log app"
          eyebrowInTitle
          title={<>Ditch the <RotatingStrike words={heroStrikes} /></>}
          lede="Every range day, logged: sessions, ammo, gear and your crew, in one app."
          placement="hero"
          stackedStores
          afterStores={<><FactChips /><QrInstall campaign="home" /></>}
          art={<TargetHero screens={["session"]} laptop={webSample} stats={heroStats} />}
        />
        <FactsStrip />
        <MatchInsights live={live} />
        <Features />
        <WebAppSection />
        <BrandFilm />
        <CompareTable />
        <ProBreakdown matchScreen="uspsaMatch" lifetime={founders} phase={phase} placement="home-pro" />
        <PrivacyCard />
        <WhatsNext />
        <FaqList items={faq} />
        <ClosingCta after={<QrInstall campaign="home" />} />
      </main>
      <SiteFooter />
      <AppJsonLd />
      <FaqJsonLd items={faq} />
    </>
  );
}
