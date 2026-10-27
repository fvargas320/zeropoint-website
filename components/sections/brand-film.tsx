import { LazyVideo } from "@/components/media/lazy-video";
import endWide from "@/assets/images/film/poster-wide.webp";
import endNarrow from "@/assets/images/film/poster-3x2.webp";
import startWide from "@/assets/images/film/start-wide.webp";
import startNarrow from "@/assets/images/film/start-3x2.webp";
import styles from "./brand-film.module.css";

const LABEL = "The ZeroPoint logo stamped onto paper among ear protection, a shot target, casings and a crossed-out range notebook.";

/** The App Store header film as a full-width band. It plays once when it is
    on screen and stops on the logo; only the cut for the screen size loads. */
export function BrandFilm() {
  return (
    <section className={styles.band} aria-label="ZeroPoint">
      <LazyVideo
        className={styles.wide}
        startPoster={startWide}
        endPoster={endWide}
        sizes="100vw"
        label={LABEL}
        sources={[
          { src: "/video/brand-wide.webm", type: "video/webm" },
          { src: "/video/brand-wide.mp4", type: "video/mp4" },
        ]}
      />
      <LazyVideo
        className={styles.narrow}
        startPoster={startNarrow}
        endPoster={endNarrow}
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
