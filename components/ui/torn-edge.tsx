import styles from "./torn-edge.module.css";

type Props = {
  /** Which edge of the parent section the tear runs along. */
  edge?: "top" | "bottom";
  /** The section's own background colour, so the tear reads as its edge. */
  color: string;
  /** Different seeds give different tears; same seed, same tear (no hydration drift). */
  seed?: number;
};

// A seeded jagged line across a 1440×48 box: small fibres on top of a few
// longer waves, like hand-torn paper.
function tearPath(seed: number) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const points: string[] = [];
  for (let x = 0; x <= 1440; x += 12 + rand() * 16) {
    const wave = Math.sin(x / 140 + seed) * 7 + Math.sin(x / 47) * 3;
    points.push(`${x.toFixed(1)},${(22 + wave + (rand() - 0.5) * 10).toFixed(1)}`);
  }
  return `M0,48 L0,22 L${points.join(" L")} L1440,22 L1440,48 Z`;
}

/** A torn-paper boundary between a light section and a dark one. */
export function TornEdge({ edge = "top", color, seed = 7 }: Props) {
  return (
    <svg
      className={styles.edge}
      data-edge={edge}
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ color }}
    >
      <path d={tearPath(seed)} fill="currentColor" />
    </svg>
  );
}
