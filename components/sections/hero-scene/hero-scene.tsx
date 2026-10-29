import { Laptop } from "@/components/media/laptop";
import { Prop } from "@/components/media/prop";
import { ScreenCycle } from "@/components/media/screen-cycle";
import { ParallaxBox } from "@/components/motion/parallax-box";
import webSample from "@/assets/images/web-sample.webp";
import styles from "./hero-scene.module.css";

/**
 * Desktop hero: the old way arrives first (the notebook), the headline's
 * reticle fires, the notebook is knocked away and the same log rises in on a
 * laptop and a phone. Each layer: entrance (outer) → mouse depth (middle) →
 * resting tilt (inner), so the animations never fight over one property.
 */
export function HeroScene() {
  return (
    <ParallaxBox className={styles.scene}>
      <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="70" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="44" />
      </svg>

      <div className={`${styles.layer} ${styles.notebook}`}>
        <div className={styles.depthBack}>
          <Prop name="notebook" priority sizes="(min-width: 960px) 40vw, 80vw" className={styles.tiltNotebook} />
        </div>
      </div>

      <div className={`${styles.layer} ${styles.laptop}`}>
        <div className={styles.depthMid}>
          <Laptop src={webSample} sizes="(min-width: 960px) 44vw, 1px" priority />
        </div>
      </div>

      <div className={`${styles.layer} ${styles.phone}`}>
        <div className={styles.depthFront}>
          <ScreenCycle order={["home", "spending", "session", "inventory"]} sizes="(min-width: 960px) 14vw, 1px" className={styles.tiltPhone} />
        </div>
      </div>
    </ParallaxBox>
  );
}
