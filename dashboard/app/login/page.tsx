import { SeasonBoard } from "@/components/season-board";
import { Wordmark } from "@/components/wordmark";
import { env } from "@/lib/env";
import { sampleSeason } from "@/lib/sample-season";
import { SignInOptions } from "./sign-in-options";

export const metadata = { title: "Sign in · ZeroPoint" };

// Web round 3 C: same account as the phone, sample season beside it.
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
  return (
    <main className="split">
      <section className="side">
        <Wordmark />
        <h1>
          Your season,
          <br />
          on a big screen<span className="dot">.</span>
        </h1>
        <p className="lead">Sign in with the same account you use on your phone.</p>
        {error && <div className="notice warn" role="alert">Sign-in didn&apos;t finish. Please try again.</div>}
        <SignInOptions next={safeNext} />
        <p className="muted" style={{ marginTop: 18 }}>
          New here?{" "}
          <a className="link" href={env.appStoreUrl()}>
            Get the app
          </a>{" "}
          first. Your account starts there.
        </p>
        <p className="quiet">The web app is part of ZeroPoint Pro.</p>
      </section>
      <section className="preview" aria-label="Sample season">
        <SeasonBoard matches={sampleSeason} compact />
        <p className="caption">Sample season</p>
      </section>
    </main>
  );
}
