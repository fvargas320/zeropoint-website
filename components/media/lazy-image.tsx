"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import styles from "./skeleton.module.css";

type Props = ImageProps & {
  /** Classes for the wrapper that carries the skeleton. */
  frameClassName?: string;
  /** Skip the shimmer for cut-out art with transparent edges. */
  bare?: boolean;
};

/**
 * next/image (lazy unless `priority`) inside a frame that shows a shimmer
 * until the image has decoded, then fades the image in and stops the shimmer.
 */
export function LazyImage({ frameClassName, bare = false, className, onLoad, ...image }: Props) {
  const [loaded, setLoaded] = useState(false);
  const frame = [styles.frame, bare ? styles.bare : styles.skeleton, frameClassName].filter(Boolean).join(" ");
  return (
    <span className={frame} data-loaded={loaded || undefined}>
      <Image
        {...image}
        className={[styles.image, className].filter(Boolean).join(" ")}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </span>
  );
}
