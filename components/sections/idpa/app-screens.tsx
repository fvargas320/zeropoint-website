import { Phone } from "@/components/media/phone";
import { SectionIndex } from "@/components/ui/section-index";
import { StoreButtons } from "@/components/ui/store-buttons";
import { idpa, idpaApp } from "@/content/idpa";
import { AppIdentity } from "./app-identity";
import styles from "./app-screens.module.css";

/** 01, the end of the dark opening: five real screens fanned out like a
    store listing, next to the app's name and the stores. */
export function AppScreens() {
  return (
    <section className={styles.section} id="app" aria-labelledby="app-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <SectionIndex index="01" label={idpaApp.label} />
            <h2 id="app-title">{idpaApp.title}</h2>
          </div>
          <div>
            <AppIdentity />
            <StoreButtons placement="idpa-app" campaign={idpa.campaign} className={styles.stores} />
          </div>
        </div>
        <ul className={styles.fan}>
          {idpaApp.screens.map((s, i) => (
            <li key={s.screen} data-at={i}>
              <Phone screen={s.screen} sizes="(min-width: 900px) 270px, 62vw" className={styles.phone} />
              <p>{s.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
