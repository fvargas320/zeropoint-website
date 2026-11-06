import { rating } from "@/content/site";
import styles from "./rating.module.css";

/** The real store rating plus "Free to start"; `note={null}` leaves that off. */
export function Rating({ className, note = "Free to start" }: { className?: string; note?: string | null }) {
  return (
    <p className={[styles.proof, className].filter(Boolean).join(" ")}>
      <span className={styles.stars} aria-hidden="true">★★★★★</span>
      <span><b>{rating.value}</b> on the {rating.source}</span>
      {note && <span className={styles.dot} aria-hidden="true">·</span>}
      {note && <span>{note}</span>}
    </p>
  );
}
