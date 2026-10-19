import { UpgradeView } from "@/components/upgrade-view";
import { devOnly, previewAccount } from "../guard";

export default async function PreviewUpgrade({ searchParams }: { searchParams: Promise<{ checked?: string }> }) {
  devOnly();
  return <UpgradeView account={previewAccount} checked={!!(await searchParams).checked} />;
}
