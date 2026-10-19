import { MetricsPage } from "@/components/pages/metrics";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Metrics · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
  const { repo } = await getViewer();
  return <MetricsPage repo={repo} base="" period={(await searchParams).period} />;
}
