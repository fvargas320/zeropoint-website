import { goalProgress } from "@/lib/compute";
import type { Repo } from "@/lib/repo";

export async function TrainingPage({ repo }: { repo: Repo }) {
  const [goals, drills, sessions, profile] = await Promise.all([repo.goals(), repo.drills(), repo.sessions(), repo.profile()]);
  const sp = profile?.shooter_profile;
  const drillRuns = new Map<string, number>();
  for (const s of sessions) if (s.drill_id) drillRuns.set(s.drill_id, (drillRuns.get(s.drill_id) ?? 0) + 1);
  return (
    <main className="page">
      <div className="page-head"><h1>Training</h1></div>
      <div className="grid-2">
        <section className="card">
          <h2>Goals</h2>
          <p className="sub">Set and change goals on your phone (Train › Goals).</p>
          {goals.length === 0 && <p className="muted">No goals yet.</p>}
          {goals.map((g) => {
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
        <section className="card">
          <h2>Classification</h2>
          <p className="sub">From your shooter profile.</p>
          <dl className="kv">
            <dt>Division</dt><dd>{sp?.division ?? "—"}</dd>
            <dt>Class</dt><dd>{sp?.officialClass ?? sp?.highestClass ?? "—"}</dd>
          </dl>
        </section>
      </div>
      <section className="card" style={{ marginTop: 16 }}>
        <h2>Your drills</h2>
        <p className="sub">Drills you built in the app, and how often you&apos;ve run them.</p>
        <div className="table-wrap">
          <table className="data">
            <thead><tr><th>Drill</th><th>Type</th><th className="num">Rounds</th><th className="num">Par</th><th className="num">Runs</th></tr></thead>
            <tbody>
              {drills.map((d) => (
                <tr key={d.uuid}>
                  <td className="name">{d.name}{d.classifier_code ? <span className="quiet"> · {d.classifier_code}</span> : null}</td>
                  <td>{d.is_classifier ? "Classifier" : d.category ? d.category.replace(/^\w/, (c) => c.toUpperCase()) : "—"}</td>
                  <td className="num">{d.round_count ?? "—"}</td>
                  <td className="num">{d.par_time_seconds != null ? `${d.par_time_seconds}s` : "—"}</td>
                  <td className="num">{drillRuns.get(d.uuid) ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {drills.length === 0 && <p className="muted">No custom drills yet.</p>}
      </section>
    </main>
  );
}
