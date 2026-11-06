"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { appStoreLink, site, stores } from "@/content/site";
import { AppleIcon, PlayIcon } from "@/components/ui/store-icons";
import styles from "./sticky-store-bar.module.css";

/**
 * On phones, once the element with `watchId` (the hero's store buttons) has
 * scrolled away, pin the visitor's own store to the bottom of the screen.
 * `top` makes it a slim bar with the logo along the top, clear of the content;
 * `login` adds Log in to it.
 * Desktop never shows it.
 */
export function StickyStoreBar({ watchId, campaign, top = false, login = false }: { watchId: string; campaign?: string; top?: boolean; login?: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  if (top) {
    return (
      <div className={styles.top} data-show={show || undefined} data-placement="sticky">
        <Logo />
        {login && site.appUrl && <a className={styles.login} href={`${site.appUrl}/login`}>Log in</a>}
        <a className={`${styles.pill} ${styles.apple}`} href={appStoreLink(campaign)} data-store="app_store"><AppleIcon />App Store</a>
        <a className={`${styles.pill} ${styles.play}`} href={stores.playStore} data-store="google_play"><PlayIcon />Google Play</a>
      </div>
    );
  }

  return (
    <div className={styles.bar} data-show={show || undefined} data-placement="sticky">
      <a className={`${styles.store} ${styles.apple}`} href={appStoreLink(campaign)} data-store="app_store">
        <AppleIcon />
        <span><small>Free on the</small><strong>App Store</strong></span>
      </a>
      <a className={`${styles.store} ${styles.play}`} href={stores.playStore} data-store="google_play">
        <PlayIcon />
        <span><small>Free on</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
