"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./swipe-row.module.css";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** The cards in a row, looking through wrappers set to display: contents. */
export function swipeCards(row: HTMLElement) {
  return [...row.children].flatMap((c) => (getComputedStyle(c).display === "contents" ? [...c.children] : [c])) as HTMLElement[];
}

/** Scrolls a row to one of its cards. */
export function swipeTo(row: HTMLElement, i: number) {
  const card = swipeCards(row)[i];
  row.scrollTo({ left: card.offsetLeft - (row.clientWidth - card.offsetWidth) / 2 });
}

/** Tells each card how far it is from the middle (--p, and --a without the
    sign) as the row moves, for the CSS to animate, and reports the nearest. */
export function useSwipeFocus(row: React.RefObject<HTMLElement | null>, onActive: (i: number) => void) {
  useEffect(() => {
    const r = row.current;
    if (!r) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = r.scrollLeft + r.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      swipeCards(r).forEach((card, i) => {
        const p = clamp((card.offsetLeft + card.offsetWidth / 2 - middle) / card.offsetWidth, -1.5, 1.5);
        card.style.setProperty("--p", p.toFixed(3));
        card.style.setProperty("--a", Math.abs(p).toFixed(3));
        if (Math.abs(p) < best) { best = Math.abs(p); nearest = i; }
      });
      onActive(nearest);
    };
    const queue = () => { frame ||= requestAnimationFrame(update); };
    update();
    r.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      r.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [row, onActive]);
}

/** The dashes under a swipe row; each one jumps to its card. */
export function SwipeDots({ labels, active, onPick, className }: { labels: string[]; active: number; onPick: (i: number) => void; className?: string }) {
  return (
    <div className={[styles.dots, className].filter(Boolean).join(" ")}>
      {labels.map((label, i) => (
        <button key={label} type="button" aria-label={`Show ${label}`} aria-current={i === active || undefined} onClick={() => onPick(i)} />
      ))}
    </div>
  );
}

/** A row of cards that swipes, with its dashes. `className` lays the row out. */
export function SwipeRow({ labels, className, dotsClassName, children }: { labels: string[]; className: string; dotsClassName?: string; children: React.ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useSwipeFocus(row, setActive);
  return (
    <>
      <div ref={row} className={className}>{children}</div>
      <SwipeDots labels={labels} active={active} className={dotsClassName} onPick={(i) => row.current && swipeTo(row.current, i)} />
    </>
  );
}
