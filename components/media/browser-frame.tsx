import type { StaticImageData } from "next/image";
import { LazyImage } from "./lazy-image";
import styles from "./browser-frame.module.css";

type Props = { src: StaticImageData; alt: string; address: string; sizes: string; className?: string };

/** A real web capture inside a minimal browser window, with a skeleton until it loads. */
export function BrowserFrame({ src, alt, address, sizes, className }: Props) {
  return (
    <figure className={[styles.window, className].filter(Boolean).join(" ")}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.address}>{address}</span>
      </div>
      <LazyImage src={src} alt={alt} sizes={sizes} frameClassName={styles.view} className={styles.img} />
    </figure>
  );
}
