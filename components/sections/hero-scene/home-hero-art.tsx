import { BenchArt } from "../bench-art";
import { HeroScene } from "./hero-scene";
import styles from "./home-hero-art.module.css";

/** Home's hero art: the notebook-to-devices scene on desktop, the notebook
    still life with a phone on smaller screens (no room for a laptop there). */
export function HomeHeroArt() {
  return (
    <>
      <div className={styles.small}>
        <BenchArt back="notebook" front="casings" screens={["home", "session", "inventory", "spending"]} />
      </div>
      <div className={styles.large}>
        <HeroScene />
      </div>
    </>
  );
}
