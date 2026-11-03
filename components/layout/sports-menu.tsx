"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sportsNav } from "@/content/nav";
import styles from "./site-header.module.css";

/** The header's Sports dropdown. Opens on hover or tap; Escape, a tap
    elsewhere or picking a sport closes it. */
export function SportsMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={styles.sports}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button type="button" className={styles.sportsButton} aria-expanded={open} aria-controls="sports-menu" onClick={() => setOpen((v) => !v)}>
        Sports
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div id="sports-menu" className={styles.sportsPanel} hidden={!open}>
        {sportsNav.map((s) => (
          <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
            <b>{s.label}</b>
            <span>{s.note}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
