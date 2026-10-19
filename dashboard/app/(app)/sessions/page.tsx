import { redirect } from "next/navigation";
import { SessionsPage, type SessionsQuery } from "@/components/pages/sessions";
import { getViewer } from "@/lib/session";
import { deleteSession } from "@/lib/session-writes";

export const metadata = { title: "Sessions · ZeroPoint" };
export const dynamic = "force-dynamic";

async function remove(uuid: string) {
  "use server";
  const { supabase, user, pro } = await getViewer();
  if (!pro.pro) return { error: "Deleting on the web is part of ZeroPoint Pro." };
  const res = await deleteSession(supabase, user.id, uuid);
  if ("error" in res) return res;
  redirect("/sessions");
}

export default async function Page({ searchParams }: { searchParams: Promise<SessionsQuery> }) {
  const { repo } = await getViewer();
  return <SessionsPage repo={repo} base="" query={await searchParams} deleteAction={remove} />;
}
