import { Phone } from "@/components/media/phone";
import { Prop } from "@/components/media/prop";
import { TargetRings } from "@/components/ui/target-rings";
import type { ArtName, ScreenName } from "@/content/images";
import styles from "./phone-fan.module.css";

type Props = { screens: ScreenName[]; prop: ArtName };

/** The paid-page hero: three real screens fanned on orange cardstock over a
    printed target, cropped by the card, with one prop from the bench on top. */
export function PhoneFan({ screens, prop }: Props) {
  const [front, left, right] = screens;
  return (
    <div className={styles.card} aria-hidden="true">
      <TargetRings numbered className={styles.rings} />
      <Phone screen={left} sizes="(min-width: 960px) 16vw, 30vw" decorative className={`${styles.phone} ${styles.left}`} />
      <Phone screen={right} sizes="(min-width: 960px) 16vw, 30vw" decorative className={`${styles.phone} ${styles.right}`} />
      <Phone screen={front} sizes="(min-width: 960px) 20vw, 42vw" decorative priority className={`${styles.phone} ${styles.front}`} />
      <Prop name={prop} sizes="(min-width: 960px) 16vw, 32vw" className={styles.prop} />
    </div>
  );
}
