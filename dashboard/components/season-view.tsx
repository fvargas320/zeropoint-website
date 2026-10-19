import { SeasonBoard } from "@/components/season-board";
import { type Account, TopBar } from "@/components/top-bar";
import type { SeasonMatch } from "@/lib/season";

/// The signed-in Season page body, shared by the real route and the dev preview.
export function SeasonView({ account, matches, failed }: { account: Account; matches: SeasonMatch[]; failed: boolean }) {
  return (
    <>
      <TopBar account={account} current="season" />
      <main className="page">
        <div className="page-head">
          <h1>Your season</h1>
          <span className="quiet">All matches synced from your phone</span>
          <div className="spacer" />
          <span className="pill" aria-disabled="true" title="Coming soon">Export</span>
        </div>
        {failed ? (
          <div className="card empty" role="alert">
            <h2>We couldn&apos;t load your matches</h2>
            <p className="muted">Refresh the page to try again.</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="card empty">
            <h2>No matches yet</h2>
            <p className="muted">
              Matches you log or import in the ZeroPoint app show up here once they sync. Logged one already? Open
              the app so it can sync, then refresh.
            </p>
          </div>
        ) : (
          <SeasonBoard matches={matches} />
        )}
      </main>
    </>
  );
}
