import { LazyVideo } from "@/components/media/lazy-video";
import posterWide from "@/assets/images/film/poster-wide.webp";
import posterSquare from "@/assets/images/film/poster-3x2.webp";
import styles from "./brand-film.module.css";

const LABEL = "The ZeroPoint logo stamped onto paper among ear protection, a shot target, casings and a crossed-out range notebook.";

/** The App Store header loop as a full-width band. Only the cut for the
    current screen size downloads, and only when it nears the viewport. */
export function BrandFilm() {
  return (
    <section className={styles.band} aria-label="ZeroPoint">
      <LazyVideo
        className={styles.wide}
        poster={posterWide}
        sizes="100vw"
        label={LABEL}
        sources={[
          { src: "/video/brand-wide.webm", type: "video/webm" },
          { src: "/video/brand-wide.mp4", type: "video/mp4" },
        ]}
      />
      <LazyVideo
        className={styles.narrow}
        poster={posterSquare}
        sizes="100vw"
        label={LABEL}
        sources={[
          { src: "/video/brand-3x2.webm", type: "video/webm" },
          { src: "/video/brand-3x2.mp4", type: "video/mp4" },
        ]}
      />
    </section>
  );
}
