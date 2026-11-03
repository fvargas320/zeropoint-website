import styles from "./open-in-app.module.css";

/** "Open in the app" for visitors who already have ZeroPoint. Phones only
    (html[data-platform]); the link opens the app's own deep link. */
export function OpenInApp({ href, label = "Already have ZeroPoint? Open in the app" }: { href: string; label?: string }) {
  return (
    <p className={styles.open}>
      <a href={href} data-deep-link>{label} →</a>
    </p>
  );
}
