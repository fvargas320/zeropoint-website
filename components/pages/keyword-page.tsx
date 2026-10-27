import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureList } from "@/components/sections/feature-list";
import { Hero } from "@/components/sections/hero";
import type { KeywordPage as Page } from "@/content/keyword-pages";

export function keywordMetadata(page: Page): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `/${page.slug}` },
  };
}

/** A search landing page: hero, three feature rows, FAQ, download. */
export function KeywordPage({ page }: { page: Page }) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero
          eyebrow={page.eyebrow}
          title={page.h1}
          lede={page.lede}
          placement="hero"
          art={<BenchArt back={page.heroProp} screens={page.heroScreens} />}
        />
        <FeatureList items={page.features} />
        <FaqList items={page.faq} title="Good to know." />
        <ClosingCta title={page.closing} lede={<>Free to start on iPhone and Android. <a href="/">See everything ZeroPoint does</a>.</>} />
      </main>
      <SiteFooter />
    </>
  );
}
