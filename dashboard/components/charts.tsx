// Small dependency-free SVG charts. Values only; colours come from CSS tokens.

export function Bars({ data, height = 160, w = 560, format = (v: number) => v.toLocaleString() }: {
  data: { label: string; value: number }[];
  height?: number;
  /// Roughly the rendered width in px, so 11px labels stay 11px.
  w?: number;
  format?: (v: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const gap = 6;
  const bw = Math.max(2, (w - 40) / Math.max(1, data.length) - gap);
  const every = Math.ceil(data.length / Math.max(3, Math.floor(w / 80)));
  return (
    <svg className="svgchart" viewBox={`0 0 ${w} ${height + 24}`} role="img" aria-label="Bar chart">
      {[0.5, 1].map((t) => (
        <g key={t}>
          <line x1={40} x2={w} y1={height - height * t * 0.92} y2={height - height * t * 0.92} stroke="rgba(255,255,255,.07)" strokeDasharray="3 4" />
          <text x={0} y={height - height * t * 0.92 + 4}>{format(Math.round(max * t))}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * height * 0.92;
        const x = 40 + i * (bw + gap);
        return (
          <g key={i}>
            <rect x={x} y={height - h} width={bw} height={Math.max(h, d.value ? 2 : 0)} rx={3} fill="var(--brand)" opacity={0.85}>
              <title>{`${d.label}: ${format(d.value)}`}</title>
            </rect>
            {i % every === 0 && (
              <text x={x + bw / 2} y={height + 18} textAnchor="middle">{d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Line({ data, height = 160, w = 560, format = (v: number) => v.toFixed(2) }: {
  data: { label: string; value: number | null }[];
  height?: number;
  w?: number;
  format?: (v: number) => string;
}) {
  const vals = data.map((d) => d.value).filter((v): v is number => v != null);
  if (!vals.length) return <p className="quiet">Not enough data yet.</p>;
  const max = Math.max(...vals) * 1.15;
  const step = (w - 60) / Math.max(1, data.length - 1);
  const pts = data
    .map((d, i) => (d.value == null ? null : ([50 + i * step, height - (d.value / max) * height] as const)))
    .filter((p): p is readonly [number, number] => p != null);
  const every = Math.ceil(data.length / Math.max(3, Math.floor(w / 80)));
  return (
    <svg className="svgchart" viewBox={`0 0 ${w} ${height + 24}`} role="img" aria-label="Line chart">
      {[0.5, 1].map((t) => (
        <g key={t}>
          <line x1={50} x2={w} y1={height - height * t} y2={height - height * t} stroke="rgba(255,255,255,.07)" strokeDasharray="3 4" />
          <text x={0} y={height - height * t + 4}>{format(max * t)}</text>
        </g>
      ))}
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="var(--brand)" strokeWidth={2.5} />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={4} fill="var(--brand)" />)}
      {data.map((d, i) => i % every === 0 && <text key={i} x={50 + i * step} y={height + 18} textAnchor="middle">{d.label}</text>)}
    </svg>
  );
}

export function Scatter({ points, height = 180, w = 400, unit = "in" }: { points: { t: number; v: number }[]; height?: number; w?: number; unit?: string }) {
  if (points.length < 2) return <p className="quiet">Group sizes show up here once your targets are measured.</p>;
  const t0 = Math.min(...points.map((p) => p.t));
  const t1 = Math.max(...points.map((p) => p.t));
  const vmax = Math.max(...points.map((p) => p.v)) * 1.15;
  const x = (t: number) => 56 + ((t - t0) / Math.max(1, t1 - t0)) * (w - 64);
  const y = (v: number) => height - (v / vmax) * height;
  // least-squares trend
  const n = points.length;
  const mx = points.reduce((s, p) => s + p.t, 0) / n;
  const my = points.reduce((s, p) => s + p.v, 0) / n;
  const slope = points.reduce((s, p) => s + (p.t - mx) * (p.v - my), 0) / Math.max(1e-9, points.reduce((s, p) => s + (p.t - mx) ** 2, 0));
  const at = (t: number) => my + slope * (t - mx);
  return (
    <svg className="svgchart" viewBox={`0 0 ${w} ${height + 10}`} role="img" aria-label="Group size over time">
      {[0.5, 1].map((t) => (
        <g key={t}>
          <line x1={50} x2={w} y1={height - height * t} y2={height - height * t} stroke="rgba(255,255,255,.07)" strokeDasharray="3 4" />
          <text x={0} y={height - height * t + 4}>{(vmax * t).toFixed(1)} {unit}</text>
        </g>
      ))}
      {points.map((p, i) => <circle key={i} cx={x(p.t)} cy={y(p.v)} r={4} fill="var(--brand)" opacity={0.55} />)}
      <line x1={x(t0)} y1={y(at(t0))} x2={x(t1)} y2={y(at(t1))} stroke="var(--brand)" strokeWidth={2.5} />
    </svg>
  );
}

export function HBars({ items, format = (v: number) => v.toLocaleString() }: { items: { label: string; value: number }[]; format?: (v: number) => string }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="rows">
      {items.map((it, i) => (
        <div key={it.label} className="goal">
          <div className="top"><span>{i + 1}. {it.label}</span><b>{format(it.value)}</b></div>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${(it.value / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

const STACK = ["var(--brand)", "#b8481f", "#7d4a36", "#5b5b63", "#3f3f46"];
export function Stacked({ items, format }: { items: { label: string; value: number }[]; format: (v: number) => string }) {
  const total = items.reduce((s, i) => s + i.value, 0);
  if (!total) return <p className="quiet">No data yet.</p>;
  return (
    <>
      <div style={{ display: "flex", height: 28, borderRadius: 8, overflow: "hidden" }}>
        {items.map((it, i) => (
          <div key={it.label} style={{ width: `${(it.value / total) * 100}%`, background: STACK[i % STACK.length] }} title={`${it.label}: ${format(it.value)}`} />
        ))}
      </div>
      <div className="legend">
        {items.map((it, i) => (
          <div key={it.label} style={{ display: "contents" }}>
            <i style={{ background: STACK[i % STACK.length] }} />
            <span>{it.label}</span>
            <b>{format(it.value)}</b>
            <span className="quiet">{Math.round((it.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
