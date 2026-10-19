import { redirect } from "next/navigation";
import { UpgradeView } from "@/components/upgrade-view";
import { accountLabel } from "@/lib/account";
import { getViewer } from "@/lib/session";

export const metadata = { title: "ZeroPoint Pro" };
export const dynamic = "force-dynamic";

async function checkAgain() {
  "use server";
  const { pro } = await getViewer();
  redirect(pro.pro ? "/" : "/upgrade?checked=1");
}

export default async function UpgradePage({ searchParams }: { searchParams: Promise<{ checked?: string }> }) {
  const { user, pro } = await getViewer();
  if (pro.pro) redirect("/");
  const { checked } = await searchParams;
  return <UpgradeView account={accountLabel(user)} checked={!!checked} checkAgain={checkAgain} />;
}
