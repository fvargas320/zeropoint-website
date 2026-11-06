"use client";

import { useEffect, useState } from "react";
import { appStoreLink, stores } from "@/content/site";
import { AppleIcon, PlayIcon } from "@/components/ui/store-icons";
import styles from "./sticky-store-bar.module.css";

/**
 * On phones, once the element with `watchId` (the hero's store buttons) has
 * scrolled away, pin the visitor's own store to the bottom of the screen.
 * `plain` drops "Free" from the labels, for a page selling Pro.
 * Desktop never shows it.
 */
export function StickyStoreBar({ watchId, campaign, plain = false }: { watchId: string; campaign?: string; plain?: boolean }) {
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
      <a className={`${styles.store} ${styles.apple}`} href={appStoreLink(campaign)} data-store="app_store">
        <AppleIcon />
        <span><small>{plain ? "Download on the" : "Free on the"}</small><strong>App Store</strong></span>
      </a>
      <a className={`${styles.store} ${styles.play}`} href={stores.playStore} data-store="google_play">
        <PlayIcon />
        <span><small>{plain ? "Get it on" : "Free on"}</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
