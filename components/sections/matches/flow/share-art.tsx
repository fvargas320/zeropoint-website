import Image from "next/image";
import appIcon from "@/assets/images/app-icon.webp";
import styles from "./flow-art.module.css";

// Generic app tiles; only ZeroPoint's is a real icon.
const tiles = ["Messages", "Mail", "Notes"];

/** Step 1: a share sheet slides up and the ZeroPoint icon is tapped. */
export function ShareArt() {
  return (
    <div className={styles.screen} aria-hidden="true">
      <div className={styles.page}>
        <span className={styles.line} style={{ width: "70%" }} />
        <span className={styles.line} style={{ width: "52%" }} />
        <span className={styles.line} style={{ width: "62%" }} />
      </div>
      <div className={styles.sheet}>
        <span className={styles.sheetTitle}>Share results</span>
        <div className={styles.apps}>
          <span className={`${styles.app} ${styles.zp}`}>
            <Image src={appIcon} alt="" width={44} height={44} />
            <small>ZeroPoint</small>
          </span>
          {tiles.map((t) => (
            <span key={t} className={styles.app}>
              <i />
              <small>{t}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
