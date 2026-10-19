import { SeasonView } from "@/components/season-view";
import { sampleSeason } from "@/lib/sample-season";
import { devOnly, previewAccount } from "../guard";

export default function PreviewSeason() {
  devOnly();
  return <SeasonView account={previewAccount} matches={sampleSeason} failed={false} />;
}
