import { footerNav } from "@/content/nav";
import { Logo } from "./logo";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <Logo width={72} />
        <nav className={styles.nav} aria-label="Footer">
          {footerNav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <small className={styles.copy}>© {new Date().getFullYear()} ZeroPoint</small>
      </div>
    </footer>
  );
}
