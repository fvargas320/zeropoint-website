import Link from "next/link";
import { Bars } from "@/components/charts";
import { byWeek, fmtDate, goalProgress, inRange, rounds, startOf } from "@/lib/compute";
import type { Repo } from "@/lib/repo";
import { wall } from "@/lib/tz";

function greeting(tz?: string) {
  const h = wall(new Date(), tz).h;
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export async function OverviewPage({ repo, base, tz }: { repo: Repo; base: string; tz?: string }) {
  const [sessions, targets, goals, profile] = await Promise.all([repo.sessions(), repo.targets(), repo.goals(), repo.profile()]);
  const month = inRange(sessions, startOf("month", new Date(), tz));
  const monthRounds = month.reduce((a, s) => a + rounds(s), 0);
  const monthMatches = month.filter((s) => s.is_match).length;
  const recent = sessions.slice(0, 6);
  const firstTarget = new Map<string, string>();
  for (const t of targets) if (t.cloud_image_path && !firstTarget.has(t.session_id)) firstTarget.set(t.session_id, t.cloud_image_path);
  const urls = await repo.signedUrls("target-images", recent.map((s) => firstTarget.get(s.uuid) ?? "").filter(Boolean));
  const name = profile?.display_name?.split(" ")[0];
  const upcoming = sessions
    .filter((s) => s.is_match && new Date(s.date_time) > new Date())
    .sort((a, b) => a.date_time.localeCompare(b.date_time))[0];
  const activeGoals = goals.filter((g) => g.status !== "archived" && g.status !== "completed").slice(0, 4);

  return (
    <main className="page">
      <h1 className="greeting">{greeting(tz)}{name ? `, ${name}` : ""}</h1>
      <p className="inline-figures">
        {new Date().toLocaleDateString("en-US", { month: "long", timeZone: tz })} · <b>{month.length}</b> {month.length === 1 ? "session" : "sessions"} · <b>{monthRounds.toLocaleString()}</b> rounds · <b>{monthMatches}</b> {monthMatches === 1 ? "match" : "matches"}
      </p>
      <div className="stack">
        <section className="card">
          <div className="headrow"><h2>Rounds by week</h2><span className="right quiet">last 26 weeks</span></div>
          <p className="sub">Every session&apos;s round count, week by week.</p>
          <Bars data={byWeek(sessions, 26, tz)} w={1100} height={180} />
        </section>
        <div className="grid-2">
          <section className="card">
            <div className="headrow"><h2>Recent sessions</h2><Link className="right link" href={`${base}/sessions`}>All sessions</Link></div>
            <div className="rows" style={{ marginTop: 10 }}>
              {recent.length === 0 && <p className="muted">No sessions yet. Log one with + New, or on your phone.</p>}
              {recent.map((s) => {
                const img = urls[firstTarget.get(s.uuid) ?? ""];
                return (
                  <Link key={s.uuid} className="rowitem" href={`${base}/sessions?id=${s.uuid}`}>
                    <span>
                      <b>{s.name || s.range_name || "Session"}</b>
                      <span className="quiet"> · {fmtDate(s.date_time, undefined, tz)}</span>
                      <br />
                      <span className="muted">{[s.range_name, s.firearm_label, s.round_count != null ? `${s.round_count} rounds` : null].filter(Boolean).join(" · ")}</span>
                    </span>
                    {img ? <img className="thumb" src={img} alt="" /> : <span className="thumb" aria-hidden />}
                  </Link>
                );
              })}
            </div>
          </section>
          <section className="card">
            <div className="headrow"><h2>Goals</h2><Link className="right link" href={`${base}/training`}>Training</Link></div>
            {activeGoals.length === 0 && <p className="muted" style={{ marginTop: 10 }}>No goals yet. Set them on your phone under Train › Goals.</p>}
            {activeGoals.map((g) => {
              const p = goalProgress(g, sessions);
              const pct = p.value == null ? 0 : Math.min(100, (p.value / Math.max(1, p.target)) * 100);
              return (
                <div key={g.uuid} className="goal">
                  <div className="top"><span>{p.label}</span><b>{p.value == null ? "—" : p.value.toLocaleString()} / {p.target.toLocaleString()}</b></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </section>
        </div>
        {upcoming && (
          <Link className="card rowitem" href={`${base}/matches`} style={{ padding: "18px 24px" }}>
            <span><h2 style={{ margin: 0 }}>Next match</h2><span className="muted">{fmtDate(upcoming.date_time, undefined, tz)} · {upcoming.match_name || upcoming.name}{upcoming.match_level ? ` · ${upcoming.match_level}` : ""}</span></span>
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </main>
  );
}
