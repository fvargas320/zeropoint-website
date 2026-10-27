"use client";

import { useEffect, useState } from "react";
import { LazyImage } from "./lazy-image";
import { screens, type ScreenName } from "@/content/images";
import phone from "./phone.module.css";
import styles from "./screen-cycle.module.css";

type Props = { order: ScreenName[]; sizes: string; className?: string; intervalMs?: number };

/**
 * A phone that cross-fades through real screens. Only the first screen loads
 * with the page; each next one is mounted (and so fetched) just before it is
 * shown. Stops on reduced motion and while the tab is hidden.
 */
export function ScreenCycle({ order, sizes, className, intervalMs = 3200 }: Props) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Fetch the second screen shortly after load, then always one ahead.
    const warm = window.setTimeout(() => setMounted((m) => Math.max(m, 2)), 1200);
    const id = window.setInterval(() => {
      if (document.hidden) return;
      const next = (index + 1) % order.length;
      setIndex(next);
      setMounted((m) => Math.min(order.length, Math.max(m, next + 2)));
    }, intervalMs);
    return () => {
      window.clearTimeout(warm);
      window.clearInterval(id);
    };
  }, [index, intervalMs, order.length]);

  return (
    <div className={[phone.phone, className].filter(Boolean).join(" ")}>
      <div className={[phone.screen, styles.stack].join(" ")}>
        {order.slice(0, mounted).map((name, i) => (
          <LazyImage
            key={name}
            src={screens[name].src}
            alt={i === index ? screens[name].alt : ""}
            aria-hidden={i !== index || undefined}
            sizes={sizes}
            priority={i === 0}
            frameClassName={styles.layer}
            className={phone.img}
            data-active={i === index || undefined}
          />
        ))}
      </div>
    </div>
  );
}
