import { ImportPage } from "@/components/import/import-page";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Import results · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const { user, repo } = await getViewer();
  const profile = await repo.profile();
  return (
    <ImportPage
      uid={user.id}
      base=""
      displayName={profile?.display_name ?? null}
      memberNumbers={profile?.shooter_profile?.memberNumbers ?? {}}
    />
  );
}
