"use client";

import { useEffect, useRef } from "react";

type Props = { children: React.ReactNode; className?: string };

/**
 * Sets --mx / --my (−1…1) on itself from the mouse position so children can
 * shift by depth. Only for fine pointers and when motion is allowed; one
 * update per frame at most.
 */
export function ParallaxBox({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const ok = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !ok) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
        el.style.setProperty("--my", ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
      });
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
