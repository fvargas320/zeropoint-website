import type { Faq } from "@/content/faq";
import { SectionIndex } from "@/components/ui/section-index";
import styles from "./faq-list.module.css";

type Props = {
  items: Faq[];
  title?: string;
  eyebrow?: string;
  /** On a numbered landing page: the section number, shown with the eyebrow as its label. */
  index?: string;
};

export function FaqList({ items, title = "Before you download.", eyebrow = "Questions", index }: Props) {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <div>
          {index ? <SectionIndex index={index} label={eyebrow} /> : <p className="eyebrow">{eyebrow}</p>}
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
