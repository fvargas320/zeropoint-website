import Image from "next/image";
import Link from "next/link";
import wordmark from "@/assets/images/wordmark.webp";
import wordmarkLight from "@/assets/images/wordmark-light.webp";

/** `light` is the wordmark in paper, for dark headers and footers. */
export function Logo({ width = 88, priority = false, light = false }: { width?: number; priority?: boolean; light?: boolean }) {
  return (
    <Link href="/" aria-label="ZeroPoint home">
      <Image src={light ? wordmarkLight : wordmark} alt="ZeroPoint" width={width} priority={priority} sizes={`${width}px`} />
    </Link>
  );
}
