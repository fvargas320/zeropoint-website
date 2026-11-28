import Image from "next/image";
import appIcon from "@/assets/images/app-icon.webp";
import { rating } from "@/content/site";
import styles from "./app-identity.module.css";

/** The app as the stores show it: icon, name, rating and where it runs. */
export function AppIdentity({ className }: { className?: string }) {
  return (
    <div className={[styles.id, className].filter(Boolean).join(" ")}>
      <Image src={appIcon} alt="" width={64} height={64} className={styles.icon} />
      <p>
        <b>ZeroPoint</b>
        <span><i aria-hidden="true">★★★★★</i> {rating.value} on the {rating.source} · Free on iPhone and Android</span>
      </p>
    </div>
  );
}
