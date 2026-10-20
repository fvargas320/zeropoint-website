import Link from "next/link";
import { Bars, HBars, Line, Scatter, Stacked } from "@/components/charts";
import { byMonth, costPerRound, firearmUsage, groupTrend, inRange, money, rounds, spendByCaliber, startOf } from "@/lib/compute";
import type { Repo } from "@/lib/repo";

const PERIODS = [
  { key: "month", label: "Month", months: 1 },
  { key: "quarter", label: "Quarter", months: 3 },
  { key: "year", label: "Year", months: 12 },
  { key: "all", label: "All time", months: 24 },
] as const;

export async function MetricsPage({ repo, base, period = "year" }: { repo: Repo; base: string; period?: string }) {
  const p = PERIODS.find((x) => x.key === period) ?? PERIODS[2];
  const [all, targets] = await Promise.all([repo.sessions(), repo.targets()]);
  const from = p.key === "all" ? new Date(0) : startOf(p.key);
  const list = inRange(all, from);
  const total = list.reduce((a, s) => a + rounds(s), 0);
  const cpr = costPerRound(list);
  const months = Math.max(p.months, 6);
  const trend = groupTrend(targets.filter((t) => new Date(t.created_at) >= from));
  const first = trend.slice(0, 5), last = trend.slice(-5);
  const avg = (xs: { v: number }[]) => xs.reduce((a, x) => a + x.v, 0) / Math.max(1, xs.length);

  return (
    <main className="page">
      <div className="page-head">
        <h1>Metrics</h1>
        <nav className="segmented" aria-label="Period">
          {PERIODS.map((x) => (
            <Link key={x.key} href={`${base}/metrics?period=${x.key}`} aria-current={x.key === p.key ? "true" : undefined}>{x.label}</Link>
          ))}
        </nav>
      </div>
      <p className="inline-figures"><b>{list.length}</b> {list.length === 1 ? "session" : "sessions"} · <b>{total.toLocaleString()}</b> rounds{cpr != null && <> · <b>{money(cpr)}</b> per round</>}</p>
      <div className="stack">
        <div className="grid-2">
          <section className="card">
            <h2>Rounds fired</h2>
            <p className="sub">Rounds per month, last {months} months.</p>
            <Bars data={byMonth(all, months, (l) => l.reduce((a, s) => a + rounds(s), 0)).map((d) => ({ label: d.label, value: d.value ?? 0 }))} />
          </section>
          <section className="card">
            <div className="headrow"><h2>Cost per round</h2>{cpr != null && <span className="right">{money(cpr)} avg</span>}</div>
            <p className="sub">Session cost divided by rounds, sessions with a cost only.</p>
            <Line data={byMonth(all, months, costPerRound)} format={(v) => `$${v.toFixed(2)}`} />
          </section>
        </div>
        <div className="grid-3">
          <section className="card">
            <h2>Spend by caliber</h2>
            <p className="sub">Session costs in this period.</p>
            <Stacked items={spendByCaliber(list)} format={money} />
          </section>
          <section className="card">
            <h2>Firearm usage</h2>
            <p className="sub">Rounds by firearm in this period.</p>
            {list.length ? <HBars items={firearmUsage(list, 5)} /> : <p className="quiet">No sessions in this period.</p>}
          </section>
          <section className="card">
            <div className="headrow"><h2>Group size</h2>{trend.length >= 4 && <span className="right">{avg(first).toFixed(1)} in → {avg(last).toFixed(1)} in</span>}</div>
            <p className="sub">Measured target groups over time.</p>
            <Scatter points={trend} w={380} />
          </section>
        </div>
        <p className="quiet">Worked out here from your synced sessions. Your phone&apos;s Metrics can count a few things differently (e.g. drills).</p>
      </div>
    </main>
  );
}
