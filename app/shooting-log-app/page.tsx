import { KeywordPage, keywordMetadata } from "@/components/pages/keyword-page";
import { shootingLog } from "@/content/keyword-pages";

export const metadata = keywordMetadata(shootingLog);

export default function Page() {
  return <KeywordPage page={shootingLog} />;
}
