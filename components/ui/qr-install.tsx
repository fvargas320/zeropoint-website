import QRCode from "qrcode";
import { site } from "@/content/site";
import styles from "./qr-install.module.css";

/** Desktop visitors can't install from a computer: a QR code that opens the
    right store on their phone (/dl), with the campaign kept. Rendered at
    build time; hidden on phones and on narrow screens. */
export async function QrInstall({ campaign = "get" }: { campaign?: string }) {
  const url = `${site.url}/dl?c=${encodeURIComponent(campaign)}`;
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#161614", light: "#0000" } });
  return (
    <div className={styles.qr} data-track-view="qr">
      <span className={styles.code} role="img" aria-label="QR code that opens ZeroPoint in your phone's app store" dangerouslySetInnerHTML={{ __html: svg }} />
      <p><b>On your computer?</b>Scan to get the app.</p>
    </div>
  );
}
