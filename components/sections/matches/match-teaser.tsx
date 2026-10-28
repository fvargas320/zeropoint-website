import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { matchesCopy } from "@/content/matches";
import { ImportFlow } from "./flow/import-flow";
import styles from "./match-teaser.module.css";

/** The Matches pitch in one dark card, for pages that link to the full section. */
export function MatchTeaser({ live }: { live: boolean }) {
  return (
    <section className="wrap" aria-labelledby="match-teaser-title">
      <div className={styles.card}>
        {!live && <p className={styles.soon}>Coming in the next update</p>}
        <h2 id="match-teaser-title" className={styles.title}>{matchesCopy.title}</h2>
        <p className={styles.lede}>{matchesCopy.lede}</p>
        <ul className={styles.sports} aria-label="Supported match types">
          {matchesCopy.sports.map((s) => (
            <li key={s}><Icon name="target" className={styles.icon} />{s}</li>
          ))}
        </ul>
        <ImportFlow compact />
        <p className={styles.more}><Link href="/#matches">See what you get from every match →</Link></p>
      </div>
    </section>
  );
}
