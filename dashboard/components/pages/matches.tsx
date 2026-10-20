import Link from "next/link";
import { SeasonBoard } from "@/components/season-board";
import type { Repo } from "@/lib/repo";
import { fromSessionRow } from "@/lib/season";

export async function MatchesPage({ repo, base = "", tz }: { repo: Repo; base?: string; tz?: string }) {
  const matches = (await repo.sessions()).filter((s) => s.is_match).map((s) => fromSessionRow(s));
  return (
    <main className="page">
      <div className="page-head">
        <h1>Matches</h1>
        <span className="quiet">Every match synced from your phone</span>
        <div className="spacer" />
        <Link className="pill brand" href={`${base}/matches/import`}>Import results</Link>
      </div>
      {matches.length === 0 ? (
        <div className="card empty">
          <h2>No matches yet</h2>
          <p className="muted">Matches you log or import in the ZeroPoint app show up here once they sync, or import results files here.</p>
        </div>
      ) : (
        <SeasonBoard matches={matches} tz={tz} />
      )}
    </main>
  );
}
