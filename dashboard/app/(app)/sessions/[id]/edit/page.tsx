import { redirect } from "next/navigation";
import { EditSessionPage } from "@/components/pages/edit-session";
import type { SessionInput } from "@/lib/new-session";
import { getViewer } from "@/lib/session";
import { updateSession } from "@/lib/session-writes";

export const metadata = { title: "Edit session · ZeroPoint" };
export const dynamic = "force-dynamic";

async function save(input: SessionInput) {
  "use server";
  const { supabase, user, pro } = await getViewer();
  if (!pro.pro) return { error: "Editing on the web is part of ZeroPoint Pro." };
  const res = await updateSession(supabase, user.id, input);
  if ("error" in res) return res;
  redirect(`/sessions?id=${res.uuid}`);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { repo, user } = await getViewer();
  return <EditSessionPage repo={repo} base="" id={(await params).id} uid={user.id} save={save} />;
}
