import { Reveal } from "@/components/motion/reveal";
import { uspsaProof } from "@/content/uspsa";
import styles from "./proof-strip.module.css";

/** Right under the hero: three real numbers from one match in the app. */
export function ProofStrip() {
  return (
    <section className={styles.band} aria-labelledby="proof-title">
      <div className="wrap">
        <Reveal>
          <p className={`eyebrow ${styles.caption}`} id="proof-title">{uspsaProof.caption}</p>
          <dl className={styles.grid}>
            {uspsaProof.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.detail}>{uspsaProof.detail}</p>
        </Reveal>
      </div>
    </section>
  );
}
