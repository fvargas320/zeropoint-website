"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "@/components/media/phone";
import { Prop } from "@/components/media/prop";
import { SwipeDots, swipeTo, useSwipeFocus } from "@/components/motion/swipe-row";
import type { ArtName, ScreenName } from "@/content/images";
import { marker } from "./marker";
import styles from "./feature-run.module.css";

export type Feature = {
  screen: ScreenName;
  /** The huge word behind the phone. */
  word: string;
  title: string;
  caption: string;
  prop: ArtName;
  ground: "paper" | "orange" | "night";
  /** A figure from that screen, counted up on the tape. */
  stat: { to: number; prefix?: string; decimals?: number; label: string };
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const show = (n: number, decimals = 0) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** The figure, counting up the first time its card is in front. */
function Stat({ stat, on }: { stat: Feature["stat"]; on: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    if (!on || done.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    done.current = true;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = clamp((now - start) / 900, 0, 1);
      if (ref.current) ref.current.textContent = show(stat.to * (1 - (1 - t) ** 3), stat.decimals);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on, stat]);
  return <>{stat.prefix}<span ref={ref}>{show(stat.to, stat.decimals)}</span> {stat.label}</>;
}

/**
 * The features side by side on a phone: a swipe row where each card's distance
 * from the middle (--p, and --a without the sign) drives the motion in CSS.
 * Without JS, or with reduced motion, it's a plain swipe row. `wide` replaces
 * it on a computer.
 */
export function FeatureRun({ title, items, wide }: { title: string; items: Feature[]; wide: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useSwipeFocus(row, setActive);

  useEffect(() => {
    const r = row.current;
    if (!r) return;
    const jump = () => {
      const i = items.findIndex((f) => location.hash === `#rail-${f.screen}`);
      if (i < 0) return;
      section.current?.scrollIntoView();
      swipeTo(r, i);
    };
    const seen = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    seen.observe(r);
    jump();
    window.addEventListener("hashchange", jump);
    return () => {
      seen.disconnect();
      window.removeEventListener("hashchange", jump);
    };
  }, [items]);

  return (
    <>
      <div className={styles.wide}>{wide}</div>
      <section ref={section} className={styles.section} data-ground={items[active].ground} aria-labelledby="run-title">
        <h2 id="run-title" className={styles.title}>{title}</h2>
        <ul ref={row} className={styles.row}>
          {items.map((f, i) => (
            <li key={f.screen} className={styles.card} data-on={inView && i === active ? true : undefined}>
              <span className={styles.word} aria-hidden="true">{f.word}</span>
              <div className={styles.copy}>
                <h3>{f.title}</h3>
                <p>{f.caption}</p>
              </div>
              <div className={styles.stage}>
                <Phone screen={f.screen} sizes="54vw" className={styles.phone} />
                <Prop name={f.prop} sizes="34vw" className={styles.prop} />
                <span className={styles.strip} aria-hidden="true" />
                <span className={`${styles.note} ${marker.className}`}><Stat stat={f.stat} on={inView && i === active} /></span>
              </div>
            </li>
          ))}
        </ul>
        <SwipeDots labels={items.map((f) => f.title)} active={active} onPick={(i) => row.current && swipeTo(row.current, i)} />
      </section>
    </>
  );
}
