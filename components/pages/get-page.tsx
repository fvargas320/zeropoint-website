import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { GetHero } from "@/components/sections/get/get-hero";
import { MatchTeaser } from "@/components/sections/matches/match-teaser";
import { ProBreakdown } from "@/components/sections/pro/pro-breakdown";
import { SalePill } from "@/components/sections/pro/sale-pill";
import { ScreenRail } from "@/components/sections/screen-rail";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { WhatsNext } from "@/components/sections/whats-next";
import { FactChips } from "@/components/ui/fact-chips";
import { QrInstall } from "@/components/ui/qr-install";
import { Rating } from "@/components/ui/rating";
import { getFaq } from "@/content/faq";
import { getMenus, getNav, getRail, getSteps, type GetVariant } from "@/content/get";
import { salePhase } from "@/content/site";

/**
 * Where ads send people: the pitch in one screen, then proof, then what Pro
 * adds and any sale, with a store one tap away the whole way down and no links
 * off to the rest of the site.
 * Each section reports when it's seen (data-track-view) so PostHog can show
 * where visitors stop.
 */
export function GetPage({ variant, live, founders }: { variant: GetVariant; live: boolean; founders: boolean }) {
  const idpa = variant.slug === "idpa";
  const phase = salePhase(new Date());
  return (
    <>
      <SiteHeader minimal pageMenus={getMenus} pageNav={getNav} />
      <main id="main">
        <GetHero
          announcement={<SalePill phase={phase} lifetime={founders} />}
          eyebrow={variant.eyebrow}
          title={variant.h1}
          lede={variant.lede}
          screens={variant.screens}
          tape={variant.tape}
          storesId="get-stores"
          qr={<QrInstall campaign={variant.slug} />}
          proof={<><FactChips /><Rating /></>}
        />
        <div id="features" data-track-view="rail"><ScreenRail title="Everything from the range, in your pocket." items={getRail} /></div>
        <div id="matches"><MatchTeaser live={live} more={false} screens={idpa ? ["idpaMatch", "idpaClass"] : ["uspsaMatch", "uspsaClass"]} /></div>
        <div data-track-view="steps"><Steps eyebrow="Getting started" title="Up and running in a minute." items={getSteps} /></div>
        <ProBreakdown matchScreen={idpa ? "idpaMatch" : "uspsaMatch"} lifetime={founders} phase={phase} placement="get-pro" />
        <WhatsNext ask={false} />
        <div id="questions" data-track-view="faq"><FaqList items={getFaq(live, founders)} title="Good to know." /></div>
        <div data-track-view="closing">
          <ClosingCta title={variant.closing} prop={variant.closingProp} web={false} after={<QrInstall campaign={variant.slug} />} />
        </div>
      </main>
      <SiteFooter minimal />
      <StickyStoreBar watchId="get-stores" pinned />
    </>
  );
}
