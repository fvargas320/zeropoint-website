"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featuresNav, headerNav, sportsNav } from "@/content/nav";
import { site } from "@/content/site";
import styles from "./mobile-menu.module.css";

/** Below 1024px the header's links live in a drawer under the bar. Escape,
    the button or picking a link closes it; the page doesn't scroll behind it. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    document.documentElement.dataset.menu = "open";
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      delete document.documentElement.dataset.menu;
    };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <>
      <button ref={button} type="button" className={styles.toggle} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
        <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          {open
            ? <path d="M6 6l12 12M18 6 6 18" />
            : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id="mobile-menu" className={styles.drawer} hidden={!open} aria-label="Menu">
        <div className={`wrap ${styles.inner}`}>
          <Group title="Features" items={featuresNav} onPick={close} />
          <Group title="Sports" items={sportsNav} onPick={close} />
          <ul className={styles.links}>
            {headerNav.map((l) => <li key={l.href}><Link href={l.href} onClick={close}>{l.label}</Link></li>)}
            {site.appUrl && <li><a href={`${site.appUrl}/login`}>Sign in</a></li>}
          </ul>
        </div>
      </nav>
    </>
  );
}

function Group({ title, items, onPick }: { title: string; items: typeof featuresNav; onPick: () => void }) {
  return (
    <section className={styles.group} aria-label={title}>
      <p className="eyebrow">{title}</p>
      <ul>
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} onClick={onPick}><b>{l.label}</b><span>{l.note}</span></Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
