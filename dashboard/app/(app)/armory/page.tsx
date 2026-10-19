import { ArmoryPage } from "@/components/pages/armory";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Armory · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { repo } = await getViewer();
  return <ArmoryPage repo={repo} base="" tab={(await searchParams).tab} />;
}
