import { footerNav, legalNav } from "@/content/nav";
import { Logo } from "./logo";
import styles from "./site-footer.module.css";

/** `minimal` (paid landing pages) keeps only the legal links, so a visitor
    from an ad has nowhere to go but the stores. `dark` carries on a dark
    closing section. */
export function SiteFooter({ minimal = false, dark = false }: { minimal?: boolean; dark?: boolean }) {
  return (
    <footer className={styles.footer} data-dark={dark || undefined}>
      <div className={`wrap ${styles.inner}`}>
        <Logo width={72} light={dark} />
        <nav className={styles.nav} aria-label="Footer">
          {(minimal ? legalNav : footerNav).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <small className={styles.copy}>© {new Date().getFullYear()} ZeroPoint</small>
      </div>
    </footer>
  );
}
