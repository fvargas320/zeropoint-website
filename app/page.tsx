import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppJsonLd, FaqJsonLd } from "@/components/seo/app-json-ld";
import { BrandFilm } from "@/components/sections/brand-film";
import { ClosingCta } from "@/components/sections/closing-cta";
import { CompareTable } from "@/components/sections/compare-table";
import { FactsStrip } from "@/components/sections/facts-strip";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureRun } from "@/components/sections/get/feature-run";
import { GetHero } from "@/components/sections/get/get-hero";
import { marker } from "@/components/sections/get/marker";
import { MatchInsights } from "@/components/sections/matches/match-insights";
import { PrivacyCard } from "@/components/sections/privacy-card";
import { ProBreakdown } from "@/components/sections/pro/pro-breakdown";
import { SalePill } from "@/components/sections/pro/sale-pill";
import { ScreenRail } from "@/components/sections/screen-rail";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { TargetHero } from "@/components/sections/target-hero";
import { WebAppSection } from "@/components/sections/web-app/web-app-section";
import { WhatsNext } from "@/components/sections/whats-next";
import { Announcement } from "@/components/ui/announcement";
import { FactChips } from "@/components/ui/fact-chips";
import { QrInstall } from "@/components/ui/qr-install";
import { RotatingStrike } from "@/components/ui/rotating-strike";
import webSample from "@/assets/images/web-sample.webp";
import { homeFaq } from "@/content/faq";
import { homeRail } from "@/content/get";
import { heroStats, heroStrikes } from "@/content/home";
import { salePhase } from "@/content/site";
import { foundersLive, matchesLive } from "@/lib/release";

// Rhythm: cream and orange hero → cream features → dark Matches (the headline
// feature) → the web app → the brand film → cream comparison → dark Pro → cream privacy → dark what's next → cream FAQ →
// orange download.
// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

export const metadata: Metadata = { alternates: { canonical: "/" } };

const railTitle = "Everything from the range, in your pocket.";

export default async function HomePage() {
  const [live, founders] = await Promise.all([matchesLive(), foundersLive()]);
  const phase = salePhase(new Date());
  const faq = homeFaq(live, founders);
  return (
    <>
      <SiteHeader landing />
      <main id="main" className={marker.variable}>
        <GetHero
          announcement={<SalePill phase={phase} lifetime={founders} fallback={<Announcement tag={live ? "New update" : "Next update"} text="Import your match results" href="#matches" />} />}
          eyebrow="The shooting log app"
          eyebrowInTitle
          title={<>Ditch the <RotatingStrike words={heroStrikes} /></>}
          lede="Every range day, logged: sessions, ammo, gear and your crew, in one app."
          screens={["home", "session", "inventory"]}
          tape="Oct 7 · Burbank · 25 yd"
          art={<TargetHero screens={["session"]} laptop={webSample} stats={heroStats} />}
          placement="hero"
          storesId="hero-stores"
          qr={<QrInstall campaign="home" />}
          proof={<FactChips />}
        />
        <FactsStrip />
        <div id="features"><FeatureRun title={railTitle} items={homeRail} wide={<ScreenRail title={railTitle} items={homeRail} />} spaced /></div>
        <MatchInsights live={live} />
        <WebAppSection />
        <BrandFilm />
        <CompareTable />
        <ProBreakdown matchScreen="uspsaMatch" lifetime={founders} phase={phase} placement="home-pro" swipe />
        <PrivacyCard />
        <WhatsNext swipe />
        <FaqList items={faq} />
        <ClosingCta short after={<QrInstall campaign="home" />} />
      </main>
      <SiteFooter />
      <StickyStoreBar watchId="hero-stores" top login />
      <AppJsonLd />
      <FaqJsonLd items={faq} />
    </>
  );
}
