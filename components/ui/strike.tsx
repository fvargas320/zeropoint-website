import styles from "./strike.module.css";

/** The App Store set's orange hand-drawn strike through a word. It draws in
    once on load (static for reduced motion). */
export function Strike({ children }: { children: React.ReactNode }) {
  return <span className={styles.strike}>{children}</span>;
}
