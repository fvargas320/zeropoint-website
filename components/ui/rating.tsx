import { rating } from "@/content/site";
import styles from "./rating.module.css";

/** The real store rating plus "Free to start". */
export function Rating({ className }: { className?: string }) {
  return (
    <p className={[styles.proof, className].filter(Boolean).join(" ")}>
      <span className={styles.stars} aria-hidden="true">★★★★★</span>
      <span><b>{rating.value}</b> on the {rating.source}</span>
      <span className={styles.dot} aria-hidden="true">·</span>
      <span>Free to start</span>
    </p>
  );
}
