import { Prop } from "@/components/media/prop";
import { StoreButtons } from "@/components/ui/store-buttons";
import { TargetRings } from "@/components/ui/target-rings";
import { TornEdge } from "@/components/ui/torn-edge";
import type { ArtName } from "@/content/images";
import { webApp } from "@/content/web-app";
import styles from "./closing-cta.module.css";

type Props = {
  title?: string;
  lede?: React.ReactNode;
  prop?: ArtName;
  campaign?: string;
  /** The "open your log on the web" link; paid pages leave it out. */
  web?: boolean;
  /** Shown under the store buttons, e.g. the desktop QR code. */
  after?: React.ReactNode;
  /** On a phone: its own store only, and no art. */
  short?: boolean;
};

/** The orange download band: torn off the cream page above, printed like
    orange cardstock, with a faint target behind the ammo. */
export function ClosingCta({ title = "Let the next one count.", lede = "Free to start on iPhone and Android.", prop = "ammoBoxes", campaign, web = true, after, short = false }: Props) {
  return (
    <section className={styles.section} id="download" aria-labelledby="closing-title">
      <TornEdge color="var(--orange)" seed={19} />
      <div className={styles.ringsLayer} aria-hidden="true">
        <TargetRings className={styles.rings} />
      </div>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>See you at the range</p>
          <h2 id="closing-title">{title}</h2>
          <p className={`lede ${styles.lede}`}>{lede}</p>
          <StoreButtons placement="closing" campaign={campaign} ownStore={short} />
          {after}
          {web && <a className={styles.web} href={`${webApp.url}/login`}>{webApp.signIn} <span aria-hidden="true">→</span></a>}
        </div>
        <div className={`${styles.art} ${short ? "not-phone" : ""}`} aria-hidden="true">
          <Prop name={prop} sizes="(min-width: 900px) 40vw, 90vw" className={styles.prop} />
        </div>
      </div>
    </section>
  );
}
