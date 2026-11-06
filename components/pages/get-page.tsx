import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingCta } from "@/components/sections/closing-cta";
import { FaqList } from "@/components/sections/faq-list";
import { FeatureRun } from "@/components/sections/get/feature-run";
import { GetHero } from "@/components/sections/get/get-hero";
import { marker } from "@/components/sections/get/marker";
import { MatchTeaser } from "@/components/sections/matches/match-teaser";
import { ProBreakdown } from "@/components/sections/pro/pro-breakdown";
import { SalePill } from "@/components/sections/pro/sale-pill";
import { ScreenRail } from "@/components/sections/screen-rail";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { WhatsNext } from "@/components/sections/whats-next";
import { QrInstall } from "@/components/ui/qr-install";
import { Rating } from "@/components/ui/rating";
import { getFaq } from "@/content/faq";
import { getMenus, getNav, getRail, type GetVariant } from "@/content/get";
import { pricing, salePhase } from "@/content/site";

/**
 * Where ads send people: the pitch in one screen, then the features, then what
 * Pro adds and any sale, with a store one tap away the whole way down and no
 * links off to the rest of the site.
 * Each section reports when it's seen (data-track-view) so PostHog can show
 * where visitors stop.
 */
export function GetPage({ variant, live, founders }: { variant: GetVariant; live: boolean; founders: boolean }) {
  const idpa = variant.slug === "idpa";
  const phase = salePhase(new Date());
  const railTitle = "Everything from the range, in your pocket.";
  return (
    <>
      <SiteHeader minimal pageMenus={getMenus} pageNav={getNav} />
      <main id="main" className={marker.variable}>
        <GetHero
          announcement={<SalePill phase={phase} lifetime={founders} />}
          eyebrow={variant.eyebrow}
          title={variant.h1}
          lede={variant.lede}
          screens={variant.screens}
          tape={variant.tape}
          stats={variant.stats}
          storesId="get-stores"
          qr={<QrInstall campaign={variant.slug} />}
          proof={<Rating note={null} />}
        />
        <div id="features" data-track-view="rail"><FeatureRun title={railTitle} items={getRail} wide={<ScreenRail title={railTitle} items={getRail} />} /></div>
        <div id="matches"><div className="not-phone"><MatchTeaser live={live} more={false} screens={idpa ? ["idpaMatch", "idpaClass"] : ["uspsaMatch", "uspsaClass"]} /></div></div>
        <ProBreakdown matchScreen={idpa ? "idpaMatch" : "uspsaMatch"} lifetime={founders} phase={phase} placement="get-pro" swipe />
        <WhatsNext ask={false} swipe />
        <div id="questions" data-track-view="faq"><FaqList items={getFaq(live, founders)} title="Good to know." /></div>
        <div data-track-view="closing">
          <ClosingCta title={variant.closing} lede={`Try Pro free for ${pricing.trialDays} days on the Monthly plan.`} prop={variant.closingProp} web={false} short after={<QrInstall campaign={variant.slug} />} />
        </div>
      </main>
      <SiteFooter minimal />
      <StickyStoreBar watchId="get-stores" top />
    </>
  );
}
