// Ring radii from the outside in; the score bands between them run 5 to 9.
const RINGS = [96, 80, 64, 48, 32, 16];

/** A faint printed shooting target for section backdrops. Colour and opacity
    come from the parent (`currentColor`); `numbered` prints the band scores
    up the top of the target like a real NRA-style sheet. */
export function TargetRings({ numbered = false, className }: { numbered?: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden="true">
      {RINGS.map((r) => <circle key={r} cx="100" cy="100" r={r} />)}
      <path d="M96 100h8M100 96v8" />
      {numbered && (
        <g fill="currentColor" stroke="none" fontSize="7" fontWeight="700" textAnchor="middle" fontFamily="inherit">
          {RINGS.slice(0, -1).map((r, i) => <text key={r} x="100" y={100 - r + 10.5}>{5 + i}</text>)}
        </g>
      )}
    </svg>
  );
}
