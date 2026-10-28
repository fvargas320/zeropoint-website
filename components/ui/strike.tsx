import styles from "./strike.module.css";

type Props = {
  children: React.ReactNode;
  /** Hero intro: a reticle glides onto the word and "fires" before the strike
      draws through it. Plays once on load; static for reduced motion. */
  shot?: boolean;
};

/** The App Store set's orange hand-drawn strike through a word. */
export function Strike({ children, shot = false }: Props) {
  return (
    <span className={styles.strike} data-shot={shot || undefined}>
      {children}
      {shot && (
        <span className={styles.reticle} aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="32" cy="32" r="20" strokeDasharray="22 9.4" strokeDashoffset="-4.7" />
            <path d="M32 2v16M32 46v16M2 32h16M46 32h16" />
            <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
          </svg>
          <i className={styles.flash} />
        </span>
      )}
    </span>
  );
}
