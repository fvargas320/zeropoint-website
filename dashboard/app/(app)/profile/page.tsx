import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/pages/profile";
import { accountLabel } from "@/lib/account";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Profile · ZeroPoint" };
export const dynamic = "force-dynamic";

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

async function saveProfile(form: FormData) {
  "use server";
  const { supabase, user, pro } = await getViewer();
  if (!pro.pro) redirect("/upgrade");
  const { data } = await supabase.from("user_profiles").select("shooter_profile").eq("user_id", user.id).maybeSingle();
  const current = (data?.shooter_profile ?? {}) as Record<string, unknown>;
  const memberNumbers: Record<string, string> = { ...((current.memberNumbers as Record<string, string>) ?? {}) };
  for (const [k, v] of form.entries()) {
    if (!k.startsWith("member:")) continue;
    const body = k.slice(7).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24);
    const value = clean(v, 20);
    if (!body) continue;
    if (value) memberNumbers[body] = value;
    else delete memberNumbers[body];
  }
  const division = clean(form.get("division"), 40);
  const officialClass = clean(form.get("officialClass"), 12);
  // Merge: keep every field the app owns; only these three change.
  const next: Record<string, unknown> = { ...current, memberNumbers };
  if (division) next.division = division; else delete next.division;
  if (officialClass) next.officialClass = officialClass; else delete next.officialClass;
  const { error } = await supabase
    .from("user_profiles")
    .update({ shooter_profile: next, updated_at: new Date().toISOString() })
    .eq("user_id", user.id);
  redirect(error ? "/profile?error=1" : "/profile?saved=1");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { repo, user, pro } = await getViewer();
  return <ProfilePage repo={repo} base="" account={accountLabel(user)} pro={pro} saveProfile={saveProfile} saved={!!(await searchParams).saved} />;
}
