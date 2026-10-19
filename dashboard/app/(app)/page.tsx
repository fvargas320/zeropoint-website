import { SeasonBoard } from "@/components/season-board";
import { TopBar } from "@/components/top-bar";
import { fromSessionRow, type SessionRow } from "@/lib/season";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Season · ZeroPoint" };
export const dynamic = "force-dynamic";

// Phase 1 Season page: the match sessions the phone already syncs
// (sessions.is_match). Stage data, points lost and imports arrive with the
// match archive tables and the shared metrics engine (proposal §1, §2).
export default async function SeasonPage() {
  const { supabase, user } = await getViewer();
  const { data, error } = await supabase
    .from("sessions")
    .select("uuid, date_time, match_name, name, match_level, division, discipline, round_count, match_result_json")
    .eq("is_match", true)
    .order("date_time", { ascending: true })
    .limit(500);
  const matches = ((data ?? []) as SessionRow[]).map(fromSessionRow);
  const year = new Date().getFullYear();

  return (
    <>
      <TopBar user={user} current="season" />
      <main className="page">
        <div className="page-head">
          <h1>Your season</h1>
          <span className="quiet">All matches synced from your phone</span>
          <div className="spacer" />
          <span className="pill" aria-disabled="true" title="Coming soon">Export</span>
        </div>
        {error ? (
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
        <p className="quiet" style={{ marginTop: 16 }}>© {year} ZeroPoint</p>
      </main>
    </>
  );
}
