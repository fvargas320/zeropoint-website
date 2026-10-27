import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppJsonLd } from "@/components/seo/app-json-ld";
import { BenchArt } from "@/components/sections/bench-art";
import { BrandFilm } from "@/components/sections/brand-film";
import { ClosingCta } from "@/components/sections/closing-cta";
import { CompareTable } from "@/components/sections/compare-table";
import { FactsStrip } from "@/components/sections/facts-strip";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import { Plans } from "@/components/sections/plans";
import { PrivacyCard } from "@/components/sections/privacy-card";
import { Strike } from "@/components/ui/strike";
import { homeFaq } from "@/content/faq";
import { features } from "@/content/features";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          eyebrow="The shooting log"
          title={<>Ditch the <Strike>notebook.</Strike></>}
          lede="Every range day, logged: sessions, ammo, gear and your crew, in one app."
          placement="hero"
          art={<BenchArt back="notebook" front="casings" screens={["home", "session", "inventory", "spending"]} />}
        />
        <FactsStrip />
        <FeatureList items={features} id="features" />
        <BrandFilm />
        <CompareTable />
        <Plans />
        <PrivacyCard />
        <FaqList items={homeFaq} />
        <ClosingCta />
      </main>
      <SiteFooter />
      <AppJsonLd />
    </>
  );
}
