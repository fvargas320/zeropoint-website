import { rating } from "@/content/site";
import styles from "./rating.module.css";

/** The real store rating plus a short note, "Free to start" unless a page has its own. */
export function Rating({ className, note = "Free to start" }: { className?: string; note?: string }) {
  return (
    <p className={[styles.proof, className].filter(Boolean).join(" ")}>
      <span className={styles.stars} aria-hidden="true">★★★★★</span>
      <span><b>{rating.value}</b> on the {rating.source}</span>
      <span className={styles.dot} aria-hidden="true">·</span>
      <span>{note}</span>
    </p>
  );
}
