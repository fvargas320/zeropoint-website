import { supportQuestions } from "@/content/legal/support";
import styles from "./support-questions.module.css";

/** The support page's answers, grouped and always open: nobody has to click to find one. */
export function SupportQuestions() {
  return (
    <section className={`wrap ${styles.section}`} id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Common questions</h2>
      <div className={styles.columns}>
        {supportQuestions.map((group) => (
          <div key={group.label} className={styles.column}>
            <p className="eyebrow">{group.label}</p>
            {group.items.map((f) => (
              <div key={f.q} className={styles.item}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
