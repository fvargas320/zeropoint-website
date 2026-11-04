import { Phone } from "@/components/media/phone";
import type { ScreenName } from "@/content/images";
import styles from "./target-hero.module.css";

export type HeroStat = { value: string; label: string };

type Props = {
  /** Front phone, then the one behind it. */
  screens: [ScreenName, ScreenName];
  /** Figures shown on those screens, one per hole, top left round to bottom right. */
  stats: [HeroStat, HeroStat, HeroStat];
};

const RINGS = [41, 35, 29, 23, 17, 11];
// Holes in the 100 × 98 drawing. The first three carry a stat.
const HOLES = [[27, 15], [85, 24], [90, 62], [13, 58], [66, 7]];
// From under each card to its hole.
const LEADERS = ["M12 10 27 15", "M90 12 85 24", "M90 82 90 62"];

/** The paid-page hero: a printed target whose holes read as data points, each
    tied by a leader line to a figure from the real screens in front of it.
    Holes, lines and cards are separate elements so they can animate in. */
export function TargetHero({ screens, stats }: Props) {
  const [front, rear] = screens;
  return (
    <div className={styles.art} aria-hidden="true">
      <svg className={styles.target} viewBox="0 0 100 98">
        <defs>
          <radialGradient id="target-sheen" cx="38%" cy="30%" r="80%">
            <stop offset="0" stopColor="#ffb07a" stopOpacity="0.5" />
            <stop offset="0.6" stopColor="#ff5a1f" stopOpacity="0" />
            <stop offset="1" stopColor="#7a2600" stopOpacity="0.32" />
          </radialGradient>
          <filter id="target-tear" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.3" />
          </filter>
        </defs>
        <circle cx="52" cy="50" r="46" fill="var(--orange)" />
        <circle cx="52" cy="50" r="46" fill="url(#target-sheen)" />
        {RINGS.map((r) => <circle key={r} cx="52" cy="50" r={r} fill="none" stroke="var(--paper)" strokeWidth="0.55" opacity="0.85" />)}
        {HOLES.map(([x, y]) => (
          <g key={x} className={styles.hole}>
            <circle cx={x} cy={y} r="2.1" fill="#5a1d00" opacity="0.35" filter="url(#target-tear)" />
            <circle cx={x} cy={y} r="1.25" fill="#14100c" filter="url(#target-tear)" />
          </g>
        ))}
        {LEADERS.map((d) => <path key={d} className={styles.leader} d={d} />)}
      </svg>
      <Phone screen={rear} sizes="(min-width: 960px) 16vw, 32vw" decorative className={`${styles.phone} ${styles.rear}`} />
      <Phone screen={front} sizes="(min-width: 960px) 20vw, 40vw" decorative priority className={`${styles.phone} ${styles.front}`} />
      {stats.map((s, i) => (
        <p key={s.label} className={styles.stat} data-at={i}><b>{s.value}</b>{s.label}</p>
      ))}
    </div>
  );
}
