"use client";

import { useEffect, useState } from "react";
import { stores } from "@/content/site";
import { AppleIcon, PlayIcon } from "@/components/ui/store-icons";
import styles from "./sticky-store-bar.module.css";

/**
 * On phones, once the element with `watchId` (the hero's store buttons) has
 * scrolled away, pin the visitor's own store to the bottom of the screen.
 * Desktop never shows it.
 */
export function StickyStoreBar({ watchId }: { watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div className={styles.bar} data-show={show || undefined} data-placement="sticky">
      <a className={`${styles.store} ${styles.apple}`} href={stores.appStore} data-store="app_store">
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
