import Link from "next/link";
import { SeasonBoard } from "@/components/season-board";
import { sampleSeason } from "@/lib/sample-season";

export const metadata = { title: "Sample season · ZeroPoint" };

// Public: what the marketing site's "See the whole season" section links to.
export default function SamplePage() {
  return (
    <>
      <header className="topbar">
        <Link className="brandmark" href="/">ZeroPoint</Link>
        <div className="spacer" />
        <Link className="pill brand" href="/login">Sign in</Link>
      </header>
      <main className="page">
        <div className="page-head">
          <h1>Season 2026</h1>
          <span className="quiet">Sample season, not a real shooter</span>
        </div>
        <SeasonBoard matches={sampleSeason} />
      </main>
    </>
  );
}
