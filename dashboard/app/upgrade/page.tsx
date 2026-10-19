import { redirect } from "next/navigation";
import { SeasonBoard } from "@/components/season-board";
import { Wordmark } from "@/components/wordmark";
import { accountLabel } from "@/lib/account";
import { env } from "@/lib/env";
import { sampleSeason } from "@/lib/sample-season";
import { getViewer } from "@/lib/session";

export const metadata = { title: "ZeroPoint Pro" };
export const dynamic = "force-dynamic";

async function checkAgain() {
  "use server";
  const { pro } = await getViewer();
  redirect(pro.pro ? "/" : "/upgrade?checked=1");
}

// Web round 4 C, phase 1: Pro is sold only in the app, so nobody can end up
// paying twice (proposal: "Never paying twice"). Web Billing replaces the
// store buttons in phase 2.
export default async function UpgradePage({ searchParams }: { searchParams: Promise<{ checked?: string }> }) {
  const { user, pro } = await getViewer();
  if (pro.pro) redirect("/");
  const { checked } = await searchParams;
  const { email, provider } = accountLabel(user);

  return (
    <main className="split">
      <section className="side">
        <Wordmark />
        <div className="whoami">
          <span>
            Signed in as <b>{email}</b> with {provider}
          </span>
          <span aria-hidden>·</span>
          <form action="/auth/signout" method="post" style={{ display: "inline" }}>
            <button className="textbutton" style={{ padding: 0, minHeight: 0 }}>Sign out</button>
          </form>
        </div>
        <h1>
          One step left<span className="dot">.</span>
        </h1>
        <p className="lead">
          The web app is part of ZeroPoint Pro. Get Pro in the ZeroPoint app, and your matches show up here as soon
          as they sync.
        </p>
        <div className="stores">
          <a className="pill brand" href={env.appStoreUrl()}>Get Pro on iPhone</a>
          <a className="pill" href={env.playStoreUrl()}>Get Pro on Android</a>
        </div>
        {checked && (
          <div className="notice warn" role="status">
            Still not seeing Pro on this account. If you subscribed on your phone, sign in here the same way you do
            there. In the app, Settings › Account shows which account that is.
          </div>
        )}
        <form action={checkAgain}>
          <button className="pill block">Already Pro on your phone? Check again</button>
        </form>
        <p className="quiet">Subscribed on your phone? Sign in here the same way you do there.</p>
      </section>
      <section className="preview" aria-label="Sample season">
        <SeasonBoard matches={sampleSeason} />
        <p className="caption">Sample season · hover around</p>
      </section>
    </main>
  );
}
