import { TrainingPage } from "@/components/pages/training";
import { getViewer } from "@/lib/session";

export const metadata = { title: "Training · ZeroPoint" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const { repo } = await getViewer();
  return <TrainingPage repo={repo} />;
}
