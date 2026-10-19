import { redirect } from "next/navigation";
import { NewSessionForm } from "@/components/new-session-form";
import { createSession } from "@/lib/session-writes";
import type { NewSessionInput } from "@/lib/new-session";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Log a session · ZeroPoint" };
export const dynamic = "force-dynamic";

async function save(input: NewSessionInput) {
  "use server";
  const { supabase, user, pro } = await getViewer();
  if (!pro.pro) return { error: "Logging sessions on the web is part of ZeroPoint Pro." };
  const res = await createSession(supabase, user.id, input);
  if ("error" in res) return res;
  redirect(`/sessions?id=${res.uuid}`);
}

export default async function Page() {
  const { repo, user } = await getViewer();
  const [firearms, ammo, drills, ranges, presets] = await Promise.all([repo.firearms(), repo.ammoLots(), repo.drills(), repo.ranges(), repo.presets()]);
  return (
    <main className="page" style={{ maxWidth: 1100 }}>
      <NewSessionForm uid={user.id} firearms={firearms} ammo={ammo} drills={drills} ranges={ranges} presets={presets} save={save} cancelHref="/sessions" />
    </main>
  );
}
