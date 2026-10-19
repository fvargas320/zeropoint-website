import { redirect } from "next/navigation";
import { Shell } from "@/components/shell";
import { getViewer } from "@/lib/session";

// Everything in (app) is Pro-only. The check runs on the server per request;
// editing the page in the browser can't skip it.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { pro, repo } = await getViewer();
  if (!pro.pro) redirect("/upgrade");
  const profile = await repo.profile();
  return <Shell base="" name={profile?.display_name || "Profile"}>{children}</Shell>;
}
