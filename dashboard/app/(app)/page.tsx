import { OverviewPage } from "@/components/pages/overview";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Overview · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const { repo } = await getViewer();
  return <OverviewPage repo={repo} base="" />;
}
