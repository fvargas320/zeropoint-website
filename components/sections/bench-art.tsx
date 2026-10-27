import { Prop } from "@/components/media/prop";
import { ScreenCycle } from "@/components/media/screen-cycle";
import type { ArtName, ScreenName } from "@/content/images";
import styles from "./bench-art.module.css";

type Props = {
  /** The big prop behind the phone (the crossed-out notebook on Home). */
  back: ArtName;
  /** A smaller prop in front, bottom right. */
  front?: ArtName;
  screens: ScreenName[];
};

/** The hero still life: a prop on the bench with a real phone resting on it.
    The props drift slightly; the phone cycles through real screens. */
export function BenchArt({ back, front, screens }: Props) {
  return (
    <div className={styles.bench} aria-hidden="true">
      <Prop name={back} priority sizes="(min-width: 960px) 40vw, 80vw" className={styles.back} />
      {front && <Prop name={front} sizes="(min-width: 960px) 21vw, 42vw" className={styles.front} />}
      <ScreenCycle order={screens} sizes="(min-width: 960px) 22vw, 43vw" className={styles.phone} />
    </div>
  );
}
