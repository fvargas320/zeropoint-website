import { Rating } from "@/components/ui/rating";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./hero.module.css";

type Props = {
  /** Optional news pill above the eyebrow. */
  announcement?: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  art: React.ReactNode;
  placement: string;
  /** Store buttons stacked full width below desktop (the /get page). */
  stackedStores?: boolean;
  /** Lets a sticky bar know when the hero's store buttons leave the screen. */
  storesId?: string;
  /** App Store campaign token (`ct`) for a landing page, e.g. "idpa". */
  campaign?: string;
  /** Shown under the store buttons, e.g. an "Open in the app" link. */
  afterStores?: React.ReactNode;
};

export function Hero({ announcement, eyebrow, title, lede, art, placement, stackedStores = false, storesId, campaign, afterStores }: Props) {
  return (
    <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        {announcement}
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="hero-title">{title}</h1>
        <p className="lede">{lede}</p>
        <div id={storesId}>
          <StoreButtons placement={placement} layout={stackedStores ? "stacked" : "row"} campaign={campaign} />
        </div>
        {afterStores}
        <Rating />
      </div>
      <div className={styles.art}>{art}</div>
    </section>
  );
}
