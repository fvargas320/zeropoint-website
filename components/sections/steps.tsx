import styles from "./steps.module.css";

export type Step = { title: string; body: string };

/** A numbered "how it works" strip. */
export function Steps({ title, items }: { title: string; items: Step[] }) {
  return (
    <section className={`wrap ${styles.section}`} aria-labelledby="steps-title">
      <h2 id="steps-title" className={styles.title}>{title}</h2>
      <ol className={styles.list}>
        {items.map((s, i) => (
          <li key={s.title}>
            <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
