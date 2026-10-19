import { SeasonView } from "@/components/season-view";
import { accountLabel } from "@/lib/account";
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
  return <SeasonView account={accountLabel(user)} matches={matches} failed={!!error} />;
}
