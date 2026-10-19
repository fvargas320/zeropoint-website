import { SeasonBoard } from "@/components/season-board";
import type { Repo } from "@/lib/repo";
import { fromSessionRow } from "@/lib/season";

export async function MatchesPage({ repo }: { repo: Repo }) {
  const matches = (await repo.sessions()).filter((s) => s.is_match).map((s) => fromSessionRow(s));
  return (
    <main className="page">
      <div className="page-head">
        <h1>Matches</h1>
        <span className="quiet">Every match synced from your phone</span>
        <div className="spacer" />
        <span className="pill" aria-disabled="true" title="Coming next">Import results</span>
      </div>
      {matches.length === 0 ? (
        <div className="card empty">
          <h2>No matches yet</h2>
          <p className="muted">Matches you log or import in the ZeroPoint app show up here once they sync.</p>
        </div>
      ) : (
        <SeasonBoard matches={matches} />
      )}
    </main>
  );
}
