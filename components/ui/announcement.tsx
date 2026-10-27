import styles from "./announcement.module.css";

type Props = { tag: string; text: string; href: string };

/** A small pill above a hero headline that points at news further down. */
export function Announcement({ tag, text, href }: Props) {
  return (
    <a className={styles.pill} href={href}>
      <span className={styles.tag}>{tag}</span>
      <span className={styles.text}>{text}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </a>
  );
}
