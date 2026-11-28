import styles from "./flip-tiles.module.css";

type Props = {
  /** What the tiles show, right-aligned; blank slots stay as empty tiles. */
  value: string;
  slots?: number;
  /** Orange digits, for the figure that matters most. */
  accent?: boolean;
  /** Orange digits with a glow, for a total. */
  glow?: boolean;
  className?: string;
};

/** A row of flip-board tiles, like a range scoreboard. Decorative: the
    figure it shows is always said in the text next to it. */
export function FlipTiles({ value, slots = value.length, accent = false, glow = false, className }: Props) {
  const chars = value.padStart(slots, " ").split("");
  return (
    <span className={[styles.tiles, className].filter(Boolean).join(" ")} data-accent={accent || undefined} data-glow={glow || undefined} aria-hidden="true">
      {chars.map((c, i) => <i key={i} data-off={c === " " || undefined}>{c === " " ? "" : c}</i>)}
    </span>
  );
}
