import type { StaticImageData } from "next/image";
import { LazyImage } from "./lazy-image";
import styles from "./laptop.module.css";

type Props = { src: StaticImageData; sizes: string; priority?: boolean; className?: string };

/** A real web capture on a laptop: dark bezel, camera dot and a thin base. */
export function Laptop({ src, sizes, priority = false, className }: Props) {
  return (
    <div className={[styles.laptop, className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className={styles.lid}>
        <span className={styles.camera} />
        <LazyImage src={src} alt="" sizes={sizes} priority={priority} frameClassName={styles.screen} className={styles.img} />
      </div>
      <div className={styles.base} />
    </div>
  );
}
