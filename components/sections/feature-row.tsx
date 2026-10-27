import { Phone } from "@/components/media/phone";
import { Prop } from "@/components/media/prop";
import { Reveal } from "@/components/motion/reveal";
import type { Feature } from "@/content/features";
import styles from "./feature-row.module.css";

const PHONE = "(min-width: 900px) 220px, 46vw";
const PROP = "(min-width: 900px) 280px, 58vw";

/** One feature: copy on one side, a real screen on a bench prop on the other. */
export function FeatureRow({ feature, flip = false }: { feature: Feature; flip?: boolean }) {
  return (
    <article className={styles.row} data-flip={flip || undefined} id={feature.id}>
      <Reveal className={styles.copy}>
        <p className="eyebrow">{feature.eyebrow}</p>
        <h2>{feature.title}</h2>
        <p className={styles.body}>{feature.body}</p>
        {feature.points.length > 0 && (
          <ul className={styles.points}>
            {feature.points.map((p) => (
              <li key={p.text}>
                {p.text}
                {p.pro && <span className={styles.pro}>Pro</span>}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      <Reveal className={styles.visual} delay={120}>
        <div className={styles.stage} aria-hidden="true">
          <Prop name={feature.prop} sizes={PROP} className={styles.prop} />
          <Phone screen={feature.screen} sizes={PHONE} decorative className={styles.phone} />
          {feature.overlay && <Prop name={feature.overlay} sizes={PROP} className={styles.overlay} />}
        </div>
      </Reveal>
    </article>
  );
}
