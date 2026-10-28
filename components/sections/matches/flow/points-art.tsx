import styles from "./flow-art.module.css";

// Stage 4 from the example: 175 possible, −14 C/D, −20 misses, −4 procedural.
const bars = [
  { label: "C/D", value: 14 },
  { label: "Misses", value: 20, worst: true },
  { label: "Proc.", value: 4 },
];

/** Step 3: the stage's losses grow in and the biggest one gets called out. */
export function PointsArt() {
  return (
    <div className={styles.screen} aria-hidden="true">
      <div className={styles.bars}>
        {bars.map((b, i) => (
          <span key={b.label} className={styles.barCol} data-worst={b.worst || undefined}>
            <span className={styles.barFill} style={{ height: `${Math.round((b.value / 20) * 84)}px`, transitionDelay: `${400 + i * 180}ms` }} />
            <small>{b.label}</small>
          </span>
        ))}
      </div>
      <span className={styles.callout}>Misses cost you 20 points</span>
    </div>
  );
}
