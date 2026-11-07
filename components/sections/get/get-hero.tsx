import { Phone } from "@/components/media/phone";
import { StoreButtons } from "@/components/ui/store-buttons";
import { TornEdge } from "@/components/ui/torn-edge";
import type { ScreenName } from "@/content/images";
import { marker } from "./marker";
import styles from "./get-hero.module.css";

type Props = {
  /** The sale pill, above the eyebrow. */
  announcement?: React.ReactNode;
  eyebrow: string;
  /** The eyebrow reads as part of the h1, for a headline without the page's keywords. */
  eyebrowInTitle?: boolean;
  title: React.ReactNode;
  lede: string;
  /** The phones: front, then left and right behind it. */
  screens: [ScreenName, ScreenName, ScreenName];
  /** Written on the tape, from the front phone's screen. */
  tape: string;
  /** What a computer shows in place of the phones. */
  art: React.ReactNode;
  /** Sent with store_click. */
  placement?: string;
  /** Lets a sticky bar know when the store buttons are on screen. */
  storesId: string;
  /** The QR code; computers only. */
  qr: React.ReactNode;
  /** Under the store buttons; computers only. */
  proof: React.ReactNode;
};

// Holes through the orange, in cqi of the fan: under the left phone.
const HOLES = [[6, 97], [15, 103], [24, 96]];

const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** The paid page's first screen. On a phone the app is taped to an orange
    backer, the way a target goes up at the range, with shot holes through to
    the cream page. A computer gets `art` instead. */
export function GetHero({ announcement, eyebrow, eyebrowInTitle = false, title, lede, screens, tape, art, placement = "get-hero", storesId, qr, proof }: Props) {
  const [front, left, right] = screens;
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        {announcement}
        {!eyebrowInTitle && <p className="eyebrow">{eyebrow}</p>}
        <h1 id="hero-title">{eyebrowInTitle && <span className={`eyebrow ${styles.titleEyebrow}`}>{eyebrow} </span>}{title}</h1>
        <p className={`lede ${styles.lede}`}>{lede}</p>
      </div>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.fan}>
          <svg width="0" height="0" className={styles.defs}>
            <filter id="hole-tear" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="3" seed="11" />
              <feDisplacementMap in="SourceGraphic" scale="6" />
            </filter>
          </svg>
          {HOLES.map(([x, y], i) => (
            <svg key={x} className={styles.hole} viewBox="0 0 60 60" style={{ left: `${x}cqi`, top: `${y}cqi`, ...order(i) }}>
              <circle cx="30" cy="30" r="19" fill="#5a1d00" opacity="0.55" filter="url(#hole-tear)" />
              <circle cx="30" cy="30" r="14" fill="#14100c" filter="url(#hole-tear)" />
            </svg>
          ))}
          <Phone screen={left} sizes="(min-width: 960px) 17vw, 42vw" decorative className={`${styles.phone} ${styles.left}`} />
          <Phone screen={right} sizes="(min-width: 960px) 17vw, 42vw" decorative className={`${styles.phone} ${styles.right}`} />
          <Phone screen={front} sizes="(min-width: 960px) 22vw, 56vw" decorative priority className={`${styles.phone} ${styles.front}`} />
          <span className={styles.tape} data-at="left-top" />
          <span className={styles.tape} data-at="left-bottom" />
          <span className={styles.tape} data-at="right-top" />
          <span className={`${styles.tape} ${styles.label} ${marker.className}`} data-at="label">{tape}</span>
        </div>
      </div>
      <div className={styles.target}>{art}</div>
      <div className={styles.cta}>
        <div id={storesId}>
          <StoreButtons placement={placement} layout="stacked" ownStore />
        </div>
        {qr}
      </div>
      <div className={styles.proof}>
        <TornEdge color="var(--paper)" seed={7} />
        <div className="not-phone">{proof}</div>
      </div>
    </section>
  );
}
