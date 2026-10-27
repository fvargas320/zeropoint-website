import type { Faq } from "@/content/faq";
import styles from "./faq-list.module.css";

type Props = { items: Faq[]; title?: string; eyebrow?: string };

export function FaqList({ items, title = "Before you download.", eyebrow = "Questions" }: Props) {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title">{title}</h2>
        </div>
        <div className={styles.list}>
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
