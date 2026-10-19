import { SessionsPage, type SessionsQuery } from "@/components/pages/sessions";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Sessions · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<SessionsQuery> }) {
  const { repo } = await getViewer();
  return <SessionsPage repo={repo} base="" query={await searchParams} />;
}
