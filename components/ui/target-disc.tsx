const RINGS = [39, 28, 17];

/** The page's shooting target as a backdrop for a phone: the orange disc of
    the paid-page hero, or the same rings drawn in the page's line colour. */
export function TargetDisc({ tone = "orange", className }: { tone?: "orange" | "line"; className?: string }) {
  const orange = tone === "orange";
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {orange && <circle cx="50" cy="50" r="50" fill="var(--orange)" />}
      <g stroke={orange ? "var(--paper)" : "var(--line)"} strokeWidth={orange ? 0.55 : 0.7} opacity={orange ? 0.85 : 1}>
        {!orange && <circle cx="50" cy="50" r="49.6" />}
        {RINGS.map((r) => <circle key={r} cx="50" cy="50" r={r} />)}
      </g>
    </svg>
  );
}
