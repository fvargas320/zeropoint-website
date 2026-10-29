import { BrowserFrame } from "@/components/media/browser-frame";
import { Phone } from "@/components/media/phone";
import { Reveal } from "@/components/motion/reveal";
import webSample from "@/assets/images/web-sample.webp";
import { webApp } from "@/content/web-app";
import styles from "./web-app-section.module.css";

/** The web log view: what it is, a link to the public sample, and a browser
    window that tilts up into place with the phone resting in front of it. */
export function WebAppSection() {
  return (
    <section className={styles.section} id="web-app" aria-labelledby="web-app-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">{webApp.eyebrow}</p>
          <h2 id="web-app-title">{webApp.title}</h2>
          <p className="lede">{webApp.lede}</p>
          <ul className={styles.points}>
            {webApp.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className={styles.actions}>
            <a className={styles.primary} href={webApp.sample}>See a sample season <span aria-hidden="true">→</span></a>
            <a className={styles.secondary} href={`${webApp.url}/login`}>Log in on your computer</a>
          </div>
          <p className={styles.note}>{webApp.note}</p>
        </div>
        <Reveal className={styles.visual}>
          <div className={styles.tilt}>
            <BrowserFrame
              src={webSample}
              alt="ZeroPoint on the web: a sample season with a match-percent chart and every match in a table"
              address={`${webApp.host}/sample`}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <Phone screen="home" sizes="(min-width: 1024px) 12vw, 30vw" decorative className={styles.phone} />
        </Reveal>
      </div>
    </section>
  );
}
