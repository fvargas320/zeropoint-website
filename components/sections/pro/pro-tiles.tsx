import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { proTiles } from "@/content/pro";
import styles from "./pro-tiles.module.css";

/** Six short Pro features as glass tiles that fade up one after another. */
export function ProTiles() {
  return (
    <ul className={styles.tiles}>
      {proTiles.map((t, i) => (
        <li key={t.label}>
          <Reveal delay={i * 70} className={styles.tile}>
            <Icon name={t.icon} className={styles.icon} />
            <span>{t.label}</span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
