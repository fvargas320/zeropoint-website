"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { LazyImage } from "./lazy-image";
import styles from "./lazy-video.module.css";

export type VideoSource = { src: string; type: "video/webm" | "video/mp4" };

type Props = {
  sources: VideoSource[];
  /** The film's first frame, shown until it starts. */
  startPoster: StaticImageData;
  /** The film's last frame: what reduced-motion visitors see instead. */
  endPoster: StaticImageData;
  /** Describes the film for screen readers; the video itself is silent. */
  label: string;
  sizes: string;
  className?: string;
};

/**
 * A short silent film that plays once, on cue: it downloads as the section
 * approaches, starts from its first frame only when most of it is on screen,
 * and stops on its last frame. Reduced-motion visitors get the last frame.
 */
export function LazyVideo({ sources, startPoster, endPoster, label, sizes, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const approach = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    let played = false;
    const cue = new IntersectionObserver(
      ([e]) => {
        const v = video.current;
        if (!e.isIntersecting || played || !v) return;
        played = true;
        v.currentTime = 0;
        v.play().catch(() => (played = false));
      },
      { threshold: 0.6 },
    );
    approach.observe(el);
    cue.observe(el);
    return () => {
      approach.disconnect();
      cue.disconnect();
    };
  }, [near]);

  return (
    <div ref={box} className={[styles.box, className].filter(Boolean).join(" ")} role="img" aria-label={label}>
      <LazyImage src={still ? endPoster : startPoster} alt="" sizes={sizes} frameClassName={styles.poster} className={styles.fill} />
      {near && !still && (
        <video
          ref={video}
          className={styles.fill}
          data-playing={playing || undefined}
          muted
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setPlaying(true)}
        >
          {sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      )}
    </div>
  );
}
