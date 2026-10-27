"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { LazyImage } from "./lazy-image";
import styles from "./lazy-video.module.css";

export type VideoSource = { src: string; type: "video/webm" | "video/mp4" };

type Props = {
  sources: VideoSource[];
  poster: StaticImageData;
  /** Describes the film for screen readers; the video itself is silent. */
  label: string;
  sizes: string;
  className?: string;
};

/**
 * A muted, looping film that downloads nothing but its poster until it is
 * about to scroll into view, pauses when off-screen, and never plays for
 * visitors who prefer reduced motion.
 */
export function LazyVideo({ sources, poster, label, sizes, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = video.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <div ref={box} className={[styles.box, className].filter(Boolean).join(" ")} role="img" aria-label={label}>
      <LazyImage src={poster} alt="" sizes={sizes} frameClassName={styles.poster} className={styles.fill} />
      {near && (
        <video
          ref={video}
          className={styles.fill}
          data-playing={playing || undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
        >
          {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      )}
    </div>
  );
}
