import { notFound } from "next/navigation";
import { NewSessionForm } from "@/components/new-session-form";
import { ArmoryPage } from "@/components/pages/armory";
import { EditSessionPage } from "@/components/pages/edit-session";
import { MatchesPage } from "@/components/pages/matches";
import { MetricsPage } from "@/components/pages/metrics";
import { OverviewPage } from "@/components/pages/overview";
import { ProfilePage } from "@/components/pages/profile";
import { SessionsPage } from "@/components/pages/sessions";
import { TrainingPage } from "@/components/pages/training";
import { sampleRepo as repo } from "@/lib/repo-sample";
import { devOnly, previewAccount } from "../../guard";

const base = "/preview";

export default async function Preview({ params, searchParams }: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  devOnly();
  const slug = (await params).slug?.join("/") ?? "";
  const q = await searchParams;
  const edit = /^sessions\/([^/]+)\/edit$/.exec(slug);
  if (edit) return <EditSessionPage repo={repo} base={base} id={edit[1]} uid="preview" />;
  switch (slug) {
    case "": return <OverviewPage repo={repo} base={base} />;
    case "sessions": return <SessionsPage repo={repo} base={base} query={q} />;
    case "sessions/new": {
      const [firearms, ammo, drills, ranges, presets] = await Promise.all([repo.firearms(), repo.ammoLots(), repo.drills(), repo.ranges(), repo.presets()]);
      return <main className="page" style={{ maxWidth: 1100 }}><NewSessionForm uid="preview" preview firearms={firearms} ammo={ammo} drills={drills} ranges={ranges} presets={presets} cancelHref={`${base}/sessions`} /></main>;
    }
    case "matches": return <MatchesPage repo={repo} />;
    case "metrics": return <MetricsPage repo={repo} base={base} period={q.period} />;
    case "armory": return <ArmoryPage repo={repo} base={base} tab={q.tab} />;
    case "training": return <TrainingPage repo={repo} />;
    case "profile":
      return <ProfilePage repo={repo} base={base} account={previewAccount} pro={{ pro: true, source: "subscription", expiresAt: "2026-11-03T00:00:00Z", productId: "zeropoint_pro_annual" }} />;
    default: notFound();
  }
}
