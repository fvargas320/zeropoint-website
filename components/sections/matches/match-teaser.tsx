import Link from "next/link";
import { Phone } from "@/components/media/phone";
import { Icon } from "@/components/ui/icon";
import type { ScreenName } from "@/content/images";
import { matchesCopy } from "@/content/matches";
import { ImportFlow } from "./flow/import-flow";
import styles from "./match-teaser.module.css";

type Props = {
  live: boolean;
  /** Real match screens in place of the drawn import flow. */
  screens?: [ScreenName, ScreenName];
  /** The link to Home's full section; paid pages leave it out. */
  more?: boolean;
};

/** The Matches pitch in one dark card, for pages that link to the full section. */
export function MatchTeaser({ live, screens, more = true }: Props) {
  return (
    <section className="wrap" aria-labelledby="match-teaser-title" data-track-view="matches">
      <div className={styles.card} data-screens={screens ? true : undefined}>
        <div>
          {!live && <p className={styles.soon}>Coming in the next update</p>}
          <h2 id="match-teaser-title" className={styles.title}>{matchesCopy.title}</h2>
          <p className={styles.lede}>{matchesCopy.lede}</p>
          <ul className={styles.sports} aria-label="Supported match types">
            {matchesCopy.sports.map(({ label: s }) => (
              <li key={s}><Icon name="target" className={styles.icon} />{s}</li>
            ))}
          </ul>
          {more && <p className={styles.more}><Link href="/#matches">See what you get from every match →</Link></p>}
        </div>
        {screens ? (
          <div className={styles.phones}>
            {screens.map((s) => <Phone key={s} screen={s} sizes="(min-width: 960px) 220px, 42vw" className={styles.phone} />)}
          </div>
        ) : (
          <ImportFlow compact />
        )}
      </div>
    </section>
  );
}
