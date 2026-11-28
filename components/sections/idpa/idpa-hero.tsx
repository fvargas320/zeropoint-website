import { Phone } from "@/components/media/phone";
import { FlipTiles } from "@/components/ui/flip-tiles";
import { OpenInApp } from "@/components/ui/open-in-app";
import { StoreButtons } from "@/components/ui/store-buttons";
import { TargetDisc } from "@/components/ui/target-disc";
import { idpa, idpaHero } from "@/content/idpa";
import { AppIdentity } from "./app-identity";
import styles from "./idpa-hero.module.css";

/** The dark opening: the app (icon, rating, a big phone with the shot timer
    over its screen), then the match's numbers on a flip board. */
export function IdpaHero() {
  const { timer, chip, board } = idpaHero;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className="wrap">
        <div className={styles.top}>
          <div>
            <AppIdentity className={styles.id} />
            <p className={`eyebrow ${styles.eyebrow}`}>{idpa.eyebrow}</p>
            <h1 id="hero-title">{idpa.h1}</h1>
            <p className={`lede ${styles.lede}`}>{idpa.lede}</p>
            <div id="idpa-stores">
              <StoreButtons placement="idpa-hero" campaign={idpa.campaign} className={styles.stores} />
            </div>
            <OpenInApp href={idpa.deepLink} />
          </div>
          <div className={styles.art} aria-hidden="true">
            <TargetDisc className={styles.disc} />
            <Phone screen="idpaMatch" sizes="(min-width: 900px) 340px, 64vw" priority decorative className={styles.phone} />
            <div className={styles.timer}>
              <p className={styles.bar}><span>{timer.label}</span><b>{timer.match}</b></p>
              <p className={styles.lcd}>{timer.value}</p>
            </div>
            <p className={styles.chip}><b>{chip.value}</b>{chip.label}</p>
          </div>
        </div>
        <ul className={styles.board} aria-label="This match in numbers">
          {board.map((r) => (
            <li key={r.label}>
              <p className={styles.k}>{r.label}<small>{r.note}</small></p>
              <span className="sr-only">{r.value}</span>
              <FlipTiles value={r.value} slots={6} accent={r.accent} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
