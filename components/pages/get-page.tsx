import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { MatchTeaser } from "@/components/sections/matches/match-teaser";
import { ScreenRail } from "@/components/sections/screen-rail";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { FactChips } from "@/components/ui/fact-chips";
import { QrInstall } from "@/components/ui/qr-install";
import { Strike } from "@/components/ui/strike";
import { getFaq } from "@/content/faq";
import { getRail, getSteps, type GetVariant } from "@/content/get";

/**
 * Where ads send people: the pitch in one screen, then proof, with a store
 * one tap away the whole way down and no links off to the rest of the site.
 * Each section reports when it's seen (data-track-view) so PostHog can show
 * where visitors stop.
 */
export function GetPage({ variant, live }: { variant: GetVariant; live: boolean }) {
  const idpa = variant.slug === "idpa";
  return (
    <>
      <SiteHeader minimal />
      <main id="main">
        <Hero
          eyebrow={variant.eyebrow}
          title={variant.h1 ?? <>Ditch the <Strike>notebook.</Strike></>}
          lede={variant.lede}
          placement="get-hero"
          stackedStores
          storesId="get-stores"
          afterStores={<><FactChips /><QrInstall campaign={variant.slug} /></>}
          art={<BenchArt back={variant.back} front={variant.front} screens={variant.screens} />}
        />
        <div data-track-view="rail"><ScreenRail title="Everything from the range, in your pocket." items={getRail} /></div>
        <MatchTeaser live={live} more={false} screens={idpa ? ["idpaMatch", "idpaClass"] : ["uspsaMatch", "uspsaClass"]} />
        <div data-track-view="steps"><Steps title="Up and running in a minute." items={getSteps} /></div>
        <div data-track-view="faq"><FaqList items={getFaq(live)} title="Good to know." /></div>
        <div data-track-view="closing">
          <ClosingCta title={variant.closing} prop={variant.closingProp} web={false} after={<QrInstall campaign={variant.slug} />} />
        </div>
      </main>
      <SiteFooter minimal />
      <StickyStoreBar watchId="get-stores" />
    </>
  );
}
