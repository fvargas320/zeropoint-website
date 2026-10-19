import { redirect } from "next/navigation";
import { getViewer } from "@/lib/session";

// Everything in (app) is Pro-only. The check runs on the server per request;
// editing the page in the browser can't skip it.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { pro } = await getViewer();
  if (!pro.pro) redirect("/upgrade");
  return <>{children}</>;
}
