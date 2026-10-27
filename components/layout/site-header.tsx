import Link from "next/link";
import { headerNav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "./logo";
import styles from "./site-header.module.css";

type Props = {
  /** /get keeps the header to the logo so nothing competes with the stores. */
  minimal?: boolean;
  ctaHref?: string;
};

export function SiteHeader({ minimal = false, ctaHref = "#download" }: Props) {
  return (
    <header className={styles.bar}>
      <div className={`wrap ${styles.inner}`}>
        <Logo priority />
        {!minimal && (
          <>
            <nav className={styles.nav} aria-label="Main">
              {headerNav.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              {site.appUrl && <a href={`${site.appUrl}/login`}>Log in</a>}
            </nav>
            <a className={styles.cta} href={ctaHref}>Get the app</a>
          </>
        )}
      </div>
    </header>
  );
}
