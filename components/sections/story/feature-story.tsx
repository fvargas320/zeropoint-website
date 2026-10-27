"use client";

import { useEffect, useRef, useState } from "react";
import type { Feature } from "@/content/features";
import { Chapter } from "./chapter";
import { StoryStage } from "./story-stage";
import styles from "./feature-story.module.css";

/**
 * Desktop feature story: chapters scroll on the left while the phone stays
 * pinned on the right and follows along (screen, prop and progress rail).
 * The chapter nearest the middle of the screen is the active one.
 */
export function FeatureStory({ items }: { items: Feature[] }) {
  const [active, setActive] = useState(0);
  const chapters = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    chapters.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`wrap ${styles.story}`}>
      <div className={styles.chapters}>
        {items.map((f, i) => (
          <Chapter
            key={f.id}
            feature={f}
            index={i}
            active={i === active}
            ref={(el) => {
              chapters.current[i] = el;
            }}
          />
        ))}
      </div>
      <div className={styles.pin}>
        <StoryStage items={items} active={active} />
      </div>
    </div>
  );
}
