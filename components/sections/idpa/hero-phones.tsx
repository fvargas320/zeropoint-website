import Image from "next/image";
import phones from "@/assets/images/idpa/hero-phones.jpg";
import styles from "./hero-phones.module.css";

/** The IDPA hero art, the same picture as the IDPA email: three real
    screens (stage, match, full results) with two numbers called out. */
export function HeroPhones() {
  return (
    <Image
      src={phones}
      alt="Three iPhones showing ZeroPoint: an IDPA match at 106.91 seconds, 13th of 30, the stage that cost the most and the full results"
      priority
      sizes="(min-width: 960px) 50vw, 100vw"
      className={styles.art}
    />
  );
}
