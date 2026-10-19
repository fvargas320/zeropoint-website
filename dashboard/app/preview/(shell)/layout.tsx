import { Shell } from "@/components/shell";
import { devOnly } from "../guard";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  devOnly();
  return <Shell base="/preview" name="Alex Rivera" banner="Design preview with made-up data (local development only).">{children}</Shell>;
}
