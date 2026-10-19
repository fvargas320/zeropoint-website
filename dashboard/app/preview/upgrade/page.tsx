import { UpgradeView } from "@/components/upgrade-view";
import { devOnly, previewAccount } from "../guard";

export default async function PreviewUpgrade({ searchParams }: { searchParams: Promise<{ checked?: string }> }) {
  devOnly();
  const { checked } = await searchParams;
  return <UpgradeView account={previewAccount} checked={!!checked} />;
}
