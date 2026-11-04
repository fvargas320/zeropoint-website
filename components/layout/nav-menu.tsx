"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { MenuLink } from "@/content/nav";
import styles from "./site-header.module.css";

/** A header dropdown (Features, Sports). Opens on hover or tap; Escape
    (focus goes back to the button), a tap elsewhere, tabbing out or picking
    a link closes it. */
export function NavMenu({ label, items }: { label: string; items: MenuLink[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
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
      className={styles.menu}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button ref={button} type="button" className={styles.menuButton} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        {label}
        <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div id={panelId} className={styles.menuPanel} hidden={!open}>
        {items.map((s) => (
          <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
            <b>{s.label}</b>
            <span>{s.note}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
