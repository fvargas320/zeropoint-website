import { MatchesPage } from "@/components/pages/matches";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Matches · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const { repo, tz } = await getViewer();
  return <MatchesPage repo={repo} tz={tz} />;
}
