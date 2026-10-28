import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppJsonLd } from "@/components/seo/app-json-ld";
import { BrandFilm } from "@/components/sections/brand-film";
import { ClosingCta } from "@/components/sections/closing-cta";
import { CompareTable } from "@/components/sections/compare-table";
import { FactsStrip } from "@/components/sections/facts-strip";
import { FaqList } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { HomeHeroArt } from "@/components/sections/hero-scene/home-hero-art";
import { MatchInsights } from "@/components/sections/matches/match-insights";
import { PrivacyCard } from "@/components/sections/privacy-card";
import { ProSpotlight } from "@/components/sections/pro/pro-spotlight";
import { Features } from "@/components/sections/story/features";
import { WebAppSection } from "@/components/sections/web-app/web-app-section";
import { Announcement } from "@/components/ui/announcement";
import { Strike } from "@/components/ui/strike";
import { homeFaq } from "@/content/faq";
import { foundersLive, matchesLive } from "@/lib/release";

// Rhythm: cream hero → dark Matches (the headline feature) → cream story →
// the web app → the brand film → cream comparison → dark Pro → cream privacy and FAQ →
// orange download.
// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

export default async function HomePage() {
  const [live, founders] = await Promise.all([matchesLive(), foundersLive()]);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          announcement={<Announcement tag={live ? "New update" : "Next update"} text="Import your match results" href="#matches" />}
          eyebrow="The shooting log"
          title={<>Ditch the <Strike shot>notebook.</Strike></>}
          lede="Every range day, logged: sessions, ammo, gear and your crew, in one app."
          placement="hero"
          art={<HomeHeroArt />}
        />
        <FactsStrip />
        <MatchInsights live={live} />
        <Features />
        <WebAppSection />
        <BrandFilm />
        <CompareTable />
        <ProSpotlight lifetime={founders} />
        <PrivacyCard />
        <FaqList items={homeFaq(live, founders)} />
        <ClosingCta />
      </main>
      <SiteFooter />
      <AppJsonLd />
    </>
  );
}
