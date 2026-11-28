import { Phone } from "@/components/media/phone";
import { SectionIndex } from "@/components/ui/section-index";
import { idpaChapters } from "@/content/idpa";
import styles from "./match-features.module.css";

/** 03: three features on the sheet, each a number, the phone it comes from
    and the claim, in the page's own type. */
export function MatchFeatures() {
  return (
    <section className={styles.section} id="features" aria-labelledby="features-title">
      <div className="wrap">
        <SectionIndex index="03" label={idpaChapters.label} />
        <h2 id="features-title">{idpaChapters.title}</h2>
        {idpaChapters.items.map((f, i) => (
          <article key={f.tag} className={styles.feature} data-flip={i % 2 === 1 || undefined}>
            <p className={styles.meta}><span>{f.tag}</span><span>{i + 1} / {idpaChapters.items.length}</span></p>
            <p className={styles.stat}>{f.stat}<small>{f.unit}</small></p>
            {/* The claim beside it says what the screen shows; the alt text stays for image search. */}
            <Phone screen={f.screen} sizes="(min-width: 900px) 320px, 62vw" className={styles.phone} />
            <h3 className={styles.claim}>{f.title}</h3>
            {f.notes.map((n, j) => (
              <p key={n.title} className={styles.note} data-side={j === 1 ? "right" : undefined}><b>{n.title}</b>{n.body}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
