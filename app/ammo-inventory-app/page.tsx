import { KeywordPage, keywordMetadata } from "@/components/pages/keyword-page";
import { ammoInventory } from "@/content/keyword-pages";

export const metadata = keywordMetadata(ammoInventory);

export default function Page() {
  return <KeywordPage page={ammoInventory} />;
}
