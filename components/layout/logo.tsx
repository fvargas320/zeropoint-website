import Image from "next/image";
import Link from "next/link";
import wordmark from "@/assets/images/wordmark.webp";

export function Logo({ width = 88, priority = false }: { width?: number; priority?: boolean }) {
  return (
    <Link href="/" aria-label="ZeroPoint home">
      <Image src={wordmark} alt="ZeroPoint" width={width} priority={priority} sizes={`${width}px`} />
    </Link>
  );
}
