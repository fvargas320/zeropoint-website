import { footerNav, legalNav } from "@/content/nav";
import { Logo } from "./logo";
import styles from "./site-footer.module.css";

/** `minimal` (paid landing pages) keeps only the legal links, so a visitor
    from an ad has nowhere to go but the stores. */
export function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <Logo width={72} />
        <nav className={styles.nav} aria-label="Footer">
          {(minimal ? legalNav : footerNav).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <small className={styles.copy}>© {new Date().getFullYear()} ZeroPoint</small>
      </div>
    </footer>
  );
}
