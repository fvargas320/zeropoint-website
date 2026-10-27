import { Prop } from "@/components/media/prop";
import { StoreButtons } from "@/components/ui/store-buttons";
import type { ArtName } from "@/content/images";
import styles from "./closing-cta.module.css";

type Props = { title?: string; lede?: React.ReactNode; prop?: ArtName };

export function ClosingCta({ title = "Let the next one count.", lede = "Free to start on iPhone and Android.", prop = "ammoBoxes" }: Props) {
  return (
    <section className={styles.section} id="download" aria-labelledby="closing-title">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>See you at the range</p>
          <h2 id="closing-title">{title}</h2>
          <p className={`lede ${styles.lede}`}>{lede}</p>
          <StoreButtons placement="closing" />
        </div>
        <div className={styles.art} aria-hidden="true">
          <Prop name={prop} sizes="(min-width: 900px) 40vw, 90vw" />
        </div>
      </div>
    </section>
  );
}
