import styles from "./strike.module.css";

type Props = {
  children: React.ReactNode;
  /** A faster line for words after the first (RotatingStrike). */
  quick?: boolean;
};

/** The App Store set's orange hand-drawn strike through a word. */
export function Strike({ children, quick = false }: Props) {
  return (
    <span className={styles.strike} data-quick={quick || undefined}>
      {children}
    </span>
  );
}
