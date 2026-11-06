import { Rating } from "@/components/ui/rating";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./hero.module.css";

type Props = {
  /** Optional news pill above the eyebrow. */
  announcement?: React.ReactNode;
  eyebrow: string;
  /** The eyebrow reads as part of the h1, for a headline without the page's keywords. */
  eyebrowInTitle?: boolean;
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
  /** One store button on a phone or tablet: its own (the /get page). */
  ownStore?: boolean;
  /** Takes the rating's place. On phones it sits under the art, so the art comes up the screen. */
  belowArt?: React.ReactNode;
};

export function Hero({ announcement, eyebrow, eyebrowInTitle = false, title, lede, art, placement, stackedStores = false, storesId, campaign, afterStores, ownStore = false, belowArt }: Props) {
  return (
    <section className={`wrap ${styles.hero}`} data-below={belowArt ? true : undefined} aria-labelledby="hero-title">
      <div className={styles.copy}>
        {announcement}
        {!eyebrowInTitle && <p className="eyebrow">{eyebrow}</p>}
        <h1 id="hero-title">{eyebrowInTitle && <span className={`eyebrow ${styles.titleEyebrow}`}>{eyebrow} </span>}{title}</h1>
        <p className="lede">{lede}</p>
        <div id={storesId}>
          <StoreButtons placement={placement} layout={stackedStores ? "stacked" : "row"} campaign={campaign} ownStore={ownStore} />
        </div>
        {afterStores}
        {!belowArt && <Rating />}
      </div>
      <div className={styles.art}>{art}</div>
      {belowArt && <div className={styles.below}>{belowArt}</div>}
    </section>
  );
}
