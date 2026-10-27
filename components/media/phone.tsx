import { LazyImage } from "./lazy-image";
import { screens, type ScreenName } from "@/content/images";
import styles from "./phone.module.css";

type Props = {
  screen: ScreenName;
  /** Rendered width hint for next/image, e.g. "(min-width: 900px) 230px, 45vw". */
  sizes: string;
  priority?: boolean;
  className?: string;
  decorative?: boolean;
};

/** A real app capture inside an iPhone-style frame, with a skeleton until it loads. */
export function Phone({ screen, sizes, priority = false, className, decorative = false }: Props) {
  const shot = screens[screen];
  return (
    <div className={[styles.phone, className].filter(Boolean).join(" ")}>
      <LazyImage
        src={shot.src}
        alt={decorative ? "" : shot.alt}
        sizes={sizes}
        priority={priority}
        frameClassName={styles.screen}
        className={styles.img}
      />
    </div>
  );
}
