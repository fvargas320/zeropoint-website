import { notFound } from "next/navigation";
import { NewSessionForm } from "@/components/new-session-form";
import { type ExistingMedia, valuesFromRow } from "@/lib/session-form-values";
import { divisionName } from "@/lib/divisions";
import { editLocks } from "@/lib/edit-rules";
import type { SessionInput } from "@/lib/new-session";
import type { Repo } from "@/lib/repo";

export async function EditSessionPage({ repo, base, id, uid, save }: {
  repo: Repo; base: string; id: string; uid: string;
  save?: (input: SessionInput) => Promise<{ error: string } | void>;
}) {
  const [sessions, targets, firearms, ammo, drills, ranges] = await Promise.all([
    repo.sessions(), repo.targets(), repo.firearms(), repo.ammoLots(), repo.drills(), repo.ranges(),
  ]);
  const s = sessions.find((x) => x.uuid === id);
  if (!s) notFound();
  const mine = targets.filter((t) => t.session_id === id && t.cloud_image_path);
  const [imgs, vids] = await Promise.all([
    repo.signedUrls("target-images", mine.map((t) => t.cloud_image_path!)),
    repo.signedUrls("video-vault", s.cloud_video_path ? [s.cloud_video_path] : []),
  ]);
  const existing: ExistingMedia[] = [
    ...(s.cloud_video_path ? [{ uuid: "video", url: vids[s.cloud_video_path] ?? null, kind: "video" as const }] : []),
    ...mine.map((t) => ({ uuid: t.uuid, url: imgs[t.cloud_image_path!] ?? null, kind: (t.image_type === "social" ? "social" : "target") as "social" | "target" })),
  ];
  const locks = editLocks(s);
  return (
    <main className="page" style={{ maxWidth: 1100 }}>
      {s.is_match && (
        <div className="notice" style={{ marginBottom: 16 }}>
          This is a match. Its official results ({[s.match_name, divisionName(s.discipline, s.division), s.match_level].filter(Boolean).join(" · ")}) stay as imported; you can change the details and notes here.
        </div>
      )}
      <NewSessionForm
        uid={uid}
        title={`Edit ${s.name || s.match_name || "session"}`}
        initial={valuesFromRow(s)}
        existing={existing}
        roundsLocked={locks.reason}
        firearms={firearms} ammo={ammo} drills={drills} ranges={ranges} presets={[]}
        save={save}
        preview={!save}
        cancelHref={`${base}/sessions?id=${s.uuid}`}
      />
    </main>
  );
}
