import { facts } from "@/content/home";
import styles from "./facts-strip.module.css";

export function FactsStrip() {
  return (
    <section className={styles.band} aria-label="At a glance">
      <div className={`wrap ${styles.grid}`}>
        {facts.map((f) => (
          <div key={f.title} className={styles.fact}>
            <b>{f.title}</b>
            <span>{f.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
