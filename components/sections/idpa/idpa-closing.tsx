import Image from "next/image";
import appIcon from "@/assets/images/app-icon.webp";
import { Phone } from "@/components/media/phone";
import { QrInstall } from "@/components/ui/qr-install";
import { Rating } from "@/components/ui/rating";
import { StoreButtons } from "@/components/ui/store-buttons";
import { idpa } from "@/content/idpa";
import styles from "./idpa-closing.module.css";

/** The closing: a dark sheet rising over the paper, the app icon, one line,
    the stores (and a QR code on a computer), and phones rising into the footer. */
export function IdpaClosing() {
  return (
    <section className={styles.section} id="download" aria-labelledby="closing-title">
      <div className={styles.sheet}>
        <div className="wrap">
          <Image src={appIcon} alt="ZeroPoint app icon" width={96} height={96} className={styles.icon} />
          <h2 id="closing-title">{idpa.closing}</h2>
          <div className={styles.row}>
            <StoreButtons placement="closing" campaign={idpa.campaign} className={styles.stores} />
            <div className={styles.qr}><QrInstall campaign={idpa.campaign} /></div>
          </div>
          <Rating className={styles.rating} />
          <div className={styles.rise} aria-hidden="true">
            <Phone screen="idpaCompare" sizes="270px" decorative className={styles.side} />
            <Phone screen="idpaMatch" sizes="310px" decorative className={styles.mid} />
            <Phone screen="idpaStage" sizes="270px" decorative className={styles.side} />
          </div>
        </div>
      </div>
    </section>
  );
}
