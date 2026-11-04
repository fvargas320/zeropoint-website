import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { TargetRings } from "@/components/ui/target-rings";
import { whatsNext } from "@/content/home";
import { site } from "@/content/site";
import styles from "./whats-next.module.css";

/** What we plan to build, in a dark card. Plans, not shipped features, so the
    copy says so and gives no dates. */
export function WhatsNext() {
  return (
    <section className="wrap" id="next" aria-labelledby="next-title" data-track-view="next">
      <div className={styles.card}>
        <TargetRings className={styles.rings} />
        <div className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>What's next</p>
            <h2 id="next-title" className={styles.title}>{whatsNext.title}</h2>
          </div>
          <p className={styles.lede}>{whatsNext.lede}</p>
        </div>
        <ul className={styles.list}>
          {whatsNext.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 70} className={styles.item}>
                <Icon name={item.icon} className={styles.icon} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className={styles.ask}>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent("Idea for ZeroPoint")}`}>{whatsNext.ask} <span aria-hidden="true">→</span></a>
        </p>
      </div>
    </section>
  );
}
