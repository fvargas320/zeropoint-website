import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SwipeRow } from "@/components/motion/swipe-row";
import { Icon } from "@/components/ui/icon";
import { TargetRings } from "@/components/ui/target-rings";
import { whatsNext } from "@/content/home";
import styles from "./whats-next.module.css";

/** What we plan to build, in a dark card. Plans, not shipped features, so the
    copy says so and gives no dates. */
export function WhatsNext({ ask = true, swipe = false }: { ask?: boolean; swipe?: boolean }) {
  const items = whatsNext.items.map((item, i) => (
    <li key={item.title}>
      <Reveal delay={swipe ? 0 : i * 70} className={styles.item}>
        <Icon name={item.icon} className={styles.icon} />
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </Reveal>
    </li>
  ));
  return (
    <section className="wrap" id="next" aria-labelledby="next-title" data-track-view="next">
      <div className={styles.card} data-short={swipe || undefined}>
        <TargetRings className={styles.rings} />
        <div className={styles.head}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>What's next</p>
            <h2 id="next-title" className={styles.title}>
              {swipe ? <><span className="not-phone">{whatsNext.title}</span><span className={styles.short}>Coming next.</span></> : whatsNext.title}
            </h2>
          </div>
          <p className={styles.lede}>{whatsNext.lede}</p>
        </div>
        {swipe
          ? <SwipeRow labels={whatsNext.items.map((item) => item.title)} className={styles.run} dotsClassName={styles.runDots}><ul className={styles.list}>{items}</ul></SwipeRow>
          : <ul className={styles.list}>{items}</ul>}
        {ask && (
          <p className={styles.ask}>
            <Link href="/support?topic=idea">{whatsNext.ask} <span aria-hidden="true">→</span></Link>
          </p>
        )}
      </div>
    </section>
  );
}
