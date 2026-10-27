import { Rating } from "@/components/ui/rating";
import { StoreButtons } from "@/components/ui/store-buttons";
import styles from "./hero.module.css";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  art: React.ReactNode;
  placement: string;
  /** Full-width stacked store buttons (the /get page on phones). */
  stackedStores?: boolean;
  /** Lets a sticky bar know when the hero's store buttons leave the screen. */
  storesId?: string;
};

export function Hero({ eyebrow, title, lede, art, placement, stackedStores = false, storesId }: Props) {
  return (
    <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="hero-title">{title}</h1>
        <p className="lede">{lede}</p>
        <div id={storesId}>
          <StoreButtons placement={placement} layout={stackedStores ? "stacked" : "row"} />
        </div>
        <Rating />
      </div>
      <div className={styles.art}>{art}</div>
    </section>
  );
}
