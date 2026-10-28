import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BenchArt } from "@/components/sections/bench-art";
import { FaqList } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { MatchTeaser } from "@/components/sections/matches/match-teaser";
import { ScreenRail } from "@/components/sections/screen-rail";
import { Steps } from "@/components/sections/steps";
import { StickyStoreBar } from "@/components/sections/sticky-store-bar";
import { Strike } from "@/components/ui/strike";
import { getFaq } from "@/content/faq";
import { getRail, getSteps } from "@/content/get";
import { matchesLive } from "@/lib/release";

export const metadata: Metadata = {
  title: { absolute: "Get ZeroPoint — Ditch the notebook" },
  description:
    "ZeroPoint is the shooting range log for iPhone and Android: log a session in seconds, track every firearm and round, see what you spend, and plan range days with your crew. Free to start.",
  alternates: { canonical: "/get" },
  openGraph: { title: "Ditch the notebook. Every range day, logged.", url: "/get" },
};

// Re-check the App Store hourly so Matches go live with app 1.5.0.
export const revalidate = 3600;

// Where ads and social posts send people: the pitch in one screen, then
// proof, with the right store always one tap away.
export default async function GetPage() {
  const live = await matchesLive();
  return (
    <>
      <SiteHeader minimal />
      <main id="main">
        <Hero
          eyebrow="The shooting log"
          title={<>Ditch the <Strike>notebook.</Strike></>}
          lede="Every range day, logged: sessions, ammo, gear and your crew, in one app."
          placement="get-hero"
          stackedStores
          storesId="get-stores"
          art={<BenchArt back="notebook" front="casings" screens={["home", "session", "inventory"]} />}
        />
        <ScreenRail title="Everything from the range, in your pocket." items={getRail} />
        <MatchTeaser live={live} />
        <Steps title="Up and running in a minute." items={getSteps} />
        <FaqList items={getFaq(live)} title="Good to know." />
        <p className="wrap" style={{ paddingBottom: 96, fontWeight: 700 }}>
          <Link href="/">See everything ZeroPoint does →</Link>
        </p>
      </main>
      <SiteFooter />
      <StickyStoreBar watchId="get-stores" />
    </>
  );
}
