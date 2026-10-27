import { stores } from "@/content/site";
import { AppleIcon, PlayIcon } from "./store-icons";
import styles from "./store-buttons.module.css";

type Props = {
  /** Where the buttons sit; sent with every store_click event. */
  placement: string;
  layout?: "row" | "stacked";
  /** "free" swaps the small label to "Free on the App Store". */
  label?: "default" | "free";
  className?: string;
};

/**
 * App Store and Google Play buttons. The visitor's own store leads and gets
 * the fill (html[data-platform], set in layout.tsx before first paint).
 */
export function StoreButtons({ placement, layout = "row", label = "default", className }: Props) {
  const free = label === "free";
  return (
    <div
      className={[styles.stores, layout === "stacked" && styles.stacked, className].filter(Boolean).join(" ")}
      data-placement={placement}
    >
      <a className={`${styles.store} ${styles.apple}`} href={stores.appStore} data-store="app_store" aria-label="Download ZeroPoint on the App Store">
        <AppleIcon />
        <span><small>{free ? "Free on the" : "Download on the"}</small><strong>App Store</strong></span>
      </a>
      <a className={`${styles.store} ${styles.play}`} href={stores.playStore} data-store="google_play" aria-label="Get ZeroPoint on Google Play">
        <PlayIcon />
        <span><small>{free ? "Free on" : "Get it on"}</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}
