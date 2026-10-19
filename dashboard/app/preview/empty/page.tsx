import { SeasonView } from "@/components/season-view";
import { devOnly, previewAccount } from "../guard";

export default function PreviewEmpty() {
  devOnly();
  return <SeasonView account={previewAccount} matches={[]} failed={false} />;
}
