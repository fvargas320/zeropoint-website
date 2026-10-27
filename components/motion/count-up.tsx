"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: number; decimals?: number; suffix?: string; durationMs?: number };

const format = (n: number, decimals: number) => {
  const text = Math.abs(n).toFixed(decimals);
  return n < 0 ? `−${text}` : text;
};

/**
 * Counts from zero to `value` the first time it scrolls into view. The final
 * number is in the HTML from the start (no JS or reduced motion: no count).
 */
export function CountUp({ value, decimals = 0, suffix = "", durationMs = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    setShown(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(shown, decimals)}
      {suffix}
    </span>
  );
}
