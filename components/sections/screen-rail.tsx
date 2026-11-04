import { Phone } from "@/components/media/phone";
import { Prop } from "@/components/media/prop";
import { Reveal } from "@/components/motion/reveal";
import type { ArtName, ScreenName } from "@/content/images";
import styles from "./screen-rail.module.css";

export type RailItem = { screen: ScreenName; title: string; caption: string; prop: ArtName };

/** Real screens on printed cards, dark and orange in turn, each with its prop
    from the bench: a swipe rail on phones, a row of four on desktop. */
export function ScreenRail({ title, items }: { title: string; items: RailItem[] }) {
  return (
    <section className="wrap" aria-labelledby="rail-title">
      <h2 id="rail-title" className={styles.title}>{title}</h2>
      <ul className={styles.rail}>
        {items.map((item, i) => (
          <li key={item.screen}>
            <Reveal delay={i * 80} className={styles.card}>
              <p className={styles.caption}>{item.title}<span>{item.caption}</span></p>
              <Phone screen={item.screen} sizes="(min-width: 900px) 260px, 62vw" className={styles.phone} />
              <Prop name={item.prop} sizes="(min-width: 900px) 160px, 34vw" className={styles.prop} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
