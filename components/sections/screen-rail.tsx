import { Phone } from "@/components/media/phone";
import { Reveal } from "@/components/motion/reveal";
import type { ScreenName } from "@/content/images";
import styles from "./screen-rail.module.css";

export type RailItem = { screen: ScreenName; title: string; caption: string };

/** Real screens with a short caption each: a swipe rail on phones, a row of
    four on desktop. Every screen loads lazily with a skeleton. */
export function ScreenRail({ title, items }: { title: string; items: RailItem[] }) {
  return (
    <section className="wrap" aria-labelledby="rail-title">
      <h2 id="rail-title" className={styles.title}>{title}</h2>
      <ul className={styles.rail}>
        {items.map((item, i) => (
          <li key={item.screen}>
            <Reveal delay={i * 80}>
              <p className={styles.caption}>{item.title}<span>{item.caption}</span></p>
              <Phone screen={item.screen} sizes="(min-width: 900px) 260px, 62vw" />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
