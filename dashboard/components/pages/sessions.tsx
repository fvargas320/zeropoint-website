import Link from "next/link";
import { DeleteSession } from "@/components/delete-session";
import { fmtDate, money } from "@/lib/compute";
import { wall } from "@/lib/tz";
import { divisionName } from "@/lib/divisions";
import { editLocks, roundsGivenBack } from "@/lib/edit-rules";
import type { Repo } from "@/lib/repo";
import type { SessionRow, TargetRow } from "@/lib/types";

export interface SessionsQuery { id?: string; firearm?: string; range?: string; year?: string; q?: string }

const yd = (s: SessionRow) => (s.distance != null ? `${s.distance} ${s.distance_unit === "meters" ? "m" : "yd"}` : null);

export async function SessionsPage({ repo, base, query, deleteAction, tz }: {
  repo: Repo; base: string; query: SessionsQuery; tz?: string;
  /// Server action bound per session id; absent on the dev preview.
  deleteAction?: (uuid: string) => Promise<{ error: string } | void>;
}) {
  const [all, targets, lots] = await Promise.all([repo.sessions(), repo.targets(), repo.ammoLots()]);
  const yearOf = (s: SessionRow) => String(wall(new Date(s.date_time), tz).y);
  const years = [...new Set(all.map(yearOf))].sort().reverse();
  const firearms = [...new Set(all.map((s) => s.firearm_label).filter(Boolean))] as string[];
  const ranges = [...new Set(all.map((s) => s.range_name).filter(Boolean))] as string[];
  const q = query.q?.trim().toLowerCase();
  const list = all.filter(
    (s) =>
      (!query.firearm || s.firearm_label === query.firearm) &&
      (!query.range || s.range_name === query.range) &&
      (!query.year || yearOf(s) === query.year) &&
      (!q || [s.name, s.range_name, s.firearm_label, s.notes, s.match_name].some((v) => v?.toLowerCase().includes(q))),
  );
  const selected = list.find((s) => s.uuid === query.id) ?? list[0];

  const bySession = new Map<string, TargetRow[]>();
  for (const t of targets) (bySession.get(t.session_id) ?? bySession.set(t.session_id, []).get(t.session_id)!).push(t);
  const visible = list.slice(0, 200);
  const thumbPaths = visible.map((s) => bySession.get(s.uuid)?.find((t) => t.cloud_image_path)?.cloud_image_path ?? "").filter(Boolean);
  const selTargets = selected ? bySession.get(selected.uuid) ?? [] : [];
  const [thumbs, selImages, others, video] = await Promise.all([
    repo.signedUrls("target-images", thumbPaths.slice(0, 80)),
    repo.signedUrls("target-images", selTargets.map((t) => t.cloud_image_path ?? "")),
    repo.signedUrls("other-images", selected?.cloud_other_image_paths ?? []),
    repo.signedUrls("video-vault", selected?.cloud_video_path ? [selected.cloud_video_path] : []),
  ]);

  const qs = (patch: Partial<SessionsQuery>) => {
    const p = new URLSearchParams(Object.entries({ ...query, ...patch }).filter(([, v]) => v) as [string, string][]);
    const s = p.toString();
    return `${base}/sessions${s ? `?${s}` : ""}`;
  };

  return (
    <main className="page">
      <div className="page-head">
        <h1>Sessions</h1>
        <form className="filters" action={`${base}/sessions`}>
          <select className="chip" name="firearm" defaultValue={query.firearm ?? ""} aria-label="Firearm">
            <option value="">All firearms</option>
            {firearms.map((f) => <option key={f}>{f}</option>)}
          </select>
          <select className="chip" name="range" defaultValue={query.range ?? ""} aria-label="Range">
            <option value="">All ranges</option>
            {ranges.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select className="chip" name="year" defaultValue={query.year ?? ""} aria-label="Year">
            <option value="">All years</option>
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
          <input className="chip" name="q" defaultValue={query.q ?? ""} placeholder="Search sessions" aria-label="Search" style={{ minWidth: 200 }} />
          <button className="pill">Apply</button>
        </form>
        <div className="spacer" />
        <Link className="pill brand" href={`${base}/sessions/new`}>Log a session</Link>
      </div>
      {list.length === 0 ? (
        <div className="card empty"><h2>No sessions here</h2><p className="muted">Try other filters, or log a session.</p></div>
      ) : (
        <div className="split-pane">
          <section className="card">
            <p className="summary"><b>{list.length}</b> {list.length === 1 ? "session" : "sessions"} · <b>{list.reduce((a, s) => a + (s.round_count ?? 0), 0).toLocaleString()}</b> rounds</p>
            <div className="table-wrap">
              <table className="data compact">
                <thead><tr><th>Date</th><th>Session</th><th>Firearm</th><th className="num">Rounds</th><th aria-label="Photo" /></tr></thead>
                <tbody>
                  {visible.map((s) => {
                    const p = bySession.get(s.uuid)?.find((t) => t.cloud_image_path)?.cloud_image_path;
                    return (
                      <tr key={s.uuid} data-on={s.uuid === selected?.uuid}>
                        <td><Link href={qs({ id: s.uuid })} style={{ textDecoration: "none" }}>{fmtDate(s.date_time, undefined, tz)}</Link></td>
                        <td className="name"><Link href={qs({ id: s.uuid })} style={{ textDecoration: "none" }}>{s.name || (s.is_match ? s.match_name : null) || "Session"}</Link>{s.is_match && <span className="quiet"> · match</span>}{s.range_name && <><br /><span className="quiet" style={{ fontWeight: 400 }}>{s.range_name}</span></>}</td>
                        <td>{s.firearm_label ?? "—"}</td>
                        <td className="num">{s.round_count ?? "—"}</td>
                        <td>{p && thumbs[p] ? <img className="thumb" src={thumbs[p]} alt="" style={{ width: 34, height: 34 }} /> : null}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {list.length > visible.length && <p className="quiet">Showing the latest 200. Filter to see older sessions.</p>}
          </section>
          {selected && (
            <SessionDetail
              tz={tz}
              s={selected} targets={selTargets} images={selImages} others={others} video={video} base={base}
              lotLabel={(() => { const l = lots.find((x) => x.uuid === selected.ammo_lot_uuid); return l ? [l.caliber, l.brand, l.product_name].filter(Boolean).join(" ") : null; })()}
              deleteAction={deleteAction ? deleteAction.bind(null, selected.uuid) : undefined}
            />
          )}
        </div>
      )}
    </main>
  );
}

// Hit factors and times are stored unrounded; 4 places is how results sheets print them.
const fmtScore = (v: number) => (Number.isInteger(v) ? String(v) : String(Number(v.toFixed(4))));

function SessionDetail({ s, targets, images, others, video, base, lotLabel, deleteAction, tz }: {
  tz?: string;
  s: SessionRow; targets: TargetRow[]; images: Record<string, string>; others: Record<string, string>; video: Record<string, string>;
  base: string; lotLabel: string | null; deleteAction?: () => Promise<{ error: string } | void>;
}) {
  const locks = editLocks(s);
  const hero = targets.find((t) => t.cloud_image_path && images[t.cloud_image_path]);
  const videoUrl = s.cloud_video_path ? video[s.cloud_video_path] : undefined;
  const strip = [
    ...targets.filter((t) => t !== hero && t.cloud_image_path && images[t.cloud_image_path]).map((t) => ({ key: t.uuid, url: images[t.cloud_image_path!] })),
    ...(s.cloud_other_image_paths ?? []).filter((p) => others[p]).map((p) => ({ key: p, url: others[p] })),
  ];
  const facts: [string, string | null][] = [
    ["Date", fmtDate(s.date_time, { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }, tz)],
    ["Range", s.range_name],
    ["Firearm", s.firearm_label],
    ["Ammo", [s.ammo_brand, s.ammo_product, s.ammo_grain ? `${s.ammo_grain}gr` : null].filter(Boolean).join(" ") || null],
    ["Distance", s.distance != null ? `${s.distance} ${s.distance_unit === "meters" ? "m" : "yd"}` : null],
    ["Rounds", s.round_count != null ? s.round_count.toLocaleString() : null],
    ["Score", s.score != null ? `${fmtScore(s.score)}${s.max_score ? ` / ${fmtScore(s.max_score)}` : ""}${s.score_label ? ` ${s.score_label}` : ""}` : null],
    ["Cost", s.cost ? money(s.cost) : null],
    ["Weather", [s.temperature_f != null ? `${Math.round(s.temperature_f)}°F` : null, s.wind_mph != null ? `wind ${Math.round(s.wind_mph)} mph` : null, s.weather].filter(Boolean).join(" · ") || null],
    ["Match", s.is_match ? [s.match_name, divisionName(s.discipline, s.division), s.match_level].filter(Boolean).join(" · ") : null],
  ];
  const notes: [string, string | null][] = [["Went well", s.went_well], ["Needs work", s.needs_work], ["Focus next", s.focus_next], ["Notes", s.notes]];
  return (
    <aside className="card detail" aria-label="Session details">
      <h2 style={{ marginBottom: 12 }}>{s.name || s.match_name || "Session"}</h2>
      <div className="detail-actions">
        <Link className="pill" href={`${base}/sessions/${s.uuid}/edit`}>Edit</Link>
        <DeleteSession name={s.name || s.match_name || "this session"} givesBack={roundsGivenBack(s)} lotLabel={lotLabel} isMatch={!!s.is_match} action={deleteAction} />
      </div>
      {locks.roundsLocked && <p className="lock-note">{s.is_match ? "Official results stay as imported." : "Rounds and ammo are managed on your phone."}</p>}
      {videoUrl && <video className="player" src={videoUrl} controls preload="metadata" />}
      {hero ? (
        <>
          <a href={images[hero.cloud_image_path!]} target="_blank" rel="noreferrer"><img className="hero-media" src={images[hero.cloud_image_path!]} alt="Target" /></a>
          <p className="media-caption">
            {[hero.group_size_inches ? `Group ${hero.group_size_inches.toFixed(2)} in` : null, hero.group_size_moa ? `${hero.group_size_moa.toFixed(1)} MOA` : null, hero.shot_count ? `${hero.shot_count} shots` : null, yd(s)].filter(Boolean).join(" · ") || hero.caption || "Target"}
          </p>
        </>
      ) : !videoUrl && <p className="quiet" style={{ marginBottom: 12 }}>No photos or video on this session.</p>}
      {strip.length > 0 && (
        <div className="media-strip">
          {strip.slice(0, 8).map((m) => <a key={m.key} href={m.url} target="_blank" rel="noreferrer"><img src={m.url} alt="" /></a>)}
        </div>
      )}
      <dl className="kv">
        {facts.filter(([, v]) => v).map(([k, v]) => (<div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
      {notes.some(([, v]) => v) && (
        <>
          <h2 style={{ fontSize: 17, marginTop: 20 }}>Notes</h2>
          <dl className="notes">{notes.filter(([, v]) => v).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
        </>
      )}
    </aside>
  );
}
