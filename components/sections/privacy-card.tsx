import { privacyPoints } from "@/content/home";
import styles from "./privacy-card.module.css";

export function PrivacyCard() {
  return (
    <section className={`wrap ${styles.section}`} id="privacy" aria-labelledby="privacy-title">
      <div className={styles.card}>
        <div>
          <p className="eyebrow">Privacy</p>
          <h2 id="privacy-title">Your data stays yours.</h2>
        </div>
        <div className={styles.points}>
          {privacyPoints.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
          <p className={styles.links}>
            <a href="/privacy">Privacy policy</a>
            <a href="/your-data">Save or remove your data</a>
          </p>
        </div>
      </div>
    </section>
  );
}
