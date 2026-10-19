"use client";

import { useMemo, useState } from "react";
import { type SeasonMatch, ordinal, summarize } from "@/lib/season";

type SortKey = "date" | "name" | "place" | "percent" | "rounds";

const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString("en-US", opts);

/// The approved Season layout (web round 1b E): one card where every match
/// is a bar above its own table row; hovering or selecting either lights both.
export function SeasonBoard({ matches, compact = false }: { matches: SeasonMatch[]; compact?: boolean }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "date", dir: 1 });
  const [active, setActive] = useState<string | null>(null);
  const byDate = useMemo(() => [...matches].sort((a, b) => a.date.localeCompare(b.date)), [matches]);
  const rows = useMemo(() => {
    const val = (m: SeasonMatch): string | number =>
      sort.key === "date" ? m.date : sort.key === "name" ? m.name : (m[sort.key] ?? (sort.dir === 1 ? 1e9 : -1e9));
    return [...matches].sort((a, b) => (val(a) < val(b) ? -sort.dir : val(a) > val(b) ? sort.dir : 0));
  }, [matches, sort]);
  const { count, avg, best } = summarize(matches);

  const scored = byDate.filter((m) => m.percent != null);
  const min = Math.max(0, Math.floor((Math.min(...scored.map((m) => m.percent!), 100) - 10) / 10) * 10);
  const scale = (p: number) => ((p - min) / (100 - min)) * 100;
  const ticks = [100, min + (100 - min) * 0.5, min].map((t) => Math.round(t));

  const head = (key: SortKey, label: string, num = false) => (
    <th className={num ? "num" : undefined} aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      <button onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : 1 }))}>
        {label} {sort.key === key ? (sort.dir === 1 ? "↑" : "↓") : ""}
      </button>
    </th>
  );

  return (
    <div className="card">
      <p className="summary">
        <b>{count}</b> {count === 1 ? "match" : "matches"}
        {best?.place != null && best.of != null && (
          <>
            {" · "}best <b>{ordinal(best.place)}</b> of {best.of}
          </>
        )}
        {avg != null && (
          <>
            {" · "}average <b>{avg.toFixed(1)}%</b>
          </>
        )}
      </p>

      {scored.length > 0 && (
        <>
          <div className="chart" aria-hidden={compact}>
            <div className="axis">
              {ticks.map((t) => (
                <span key={t} style={{ bottom: `${scale(t)}%` }}>{t}%</span>
              ))}
            </div>
            <div className="plot">
              {ticks.slice(0, 2).map((t) => (
                <div key={t} className="grid" style={{ bottom: `${scale(t)}%` }} />
              ))}
              {avg != null && (
                <div className="avg" style={{ bottom: `${scale(avg)}%` }}>
                  <em>{avg.toFixed(1)}% avg</em>
                </div>
              )}
              <div className="bars">
                {byDate.map((m) =>
                  m.percent == null ? (
                    <span key={m.id} style={{ flex: 1, maxWidth: 28 }} />
                  ) : (
                    <button
                      key={m.id}
                      className="bar"
                      data-on={active === m.id}
                      style={{ height: `${Math.max(2, scale(m.percent))}%` }}
                      onMouseEnter={() => setActive(m.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(m.id)}
                      onBlur={() => setActive(null)}
                      aria-label={`${m.name}, ${m.percent.toFixed(2)}%`}
                    >
                      {active === m.id && (
                        <span className="tip">
                          {fmtDate(m.date, { month: "short", day: "numeric" })}
                          <b>{m.percent.toFixed(2)}%</b>
                        </span>
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
          {!compact && (
            <div className="xlabels" aria-hidden>
              {byDate.map((m) => (
                <span key={m.id}>{fmtDate(m.date, { month: "short", day: "numeric" })}</span>
              ))}
            </div>
          )}
        </>
      )}

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {head("date", "Date")}
              {head("name", "Match")}
              <th>Level</th>
              <th>Division</th>
              <th>Class</th>
              {head("place", "Place / of", true)}
              {head("percent", "Match %", true)}
              {head("rounds", "Rounds", true)}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr
                key={m.id}
                data-on={active === m.id}
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
              >
                <td>{fmtDate(m.date, { month: "short", day: "2-digit", year: "numeric" })}</td>
                <td className="name">{m.name}</td>
                <td>{m.level ?? "—"}</td>
                <td>{m.division ?? "—"}</td>
                <td>{m.classLetter ?? "—"}</td>
                <td className="num">{m.dq ? "DQ" : m.place != null ? `${m.place} / ${m.of ?? "—"}` : "—"}</td>
                <td className="num">{m.percent != null ? `${m.percent.toFixed(2)}%` : "—"}</td>
                <td className="num">{m.rounds ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
