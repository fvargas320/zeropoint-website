import Link from "next/link";
import { featuresNav, headerNav, matchesNav, type Link as NavLink, type MenuLink } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavMenu } from "./nav-menu";
import styles from "./site-header.module.css";

type Props = {
  /** /get keeps the header to the logo so nothing competes with the stores. */
  minimal?: boolean;
  /** With `minimal`: jumps within the page, so nobody leaves it. */
  pageNav?: NavLink[];
  /** With `pageNav`: menus ahead of the jumps. */
  pageMenus?: { label: string; items: MenuLink[] }[];
  ctaHref?: string;
  /** Home on a phone: the header scrolls away and Log in takes Get the app's
      place, since the store is right there in the hero. */
  landing?: boolean;
};

export function SiteHeader({ minimal = false, pageNav, pageMenus, ctaHref = "#download", landing = false }: Props) {
  return (
    <header className={styles.bar} data-minimal={minimal || undefined} data-landing={landing || undefined}>
      <div className={`wrap ${styles.inner}`}>
        <Logo priority />
        {minimal && pageNav && (
          <>
            <nav className={styles.nav} aria-label="On this page">
              {pageMenus?.map((m) => <NavMenu key={m.label} label={m.label} items={m.items} />)}
              {pageNav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            </nav>
            <a className={`${styles.cta} ${styles.pageCta}`} href={ctaHref}>Get the app</a>
          </>
        )}
        {!minimal && (
          <>
            <nav className={styles.nav} aria-label="Main">
              <NavMenu label="Features" items={featuresNav} />
              <NavMenu label="Matches" items={matchesNav} />
              {headerNav.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </nav>
            {site.appUrl && <a className={styles.login} href={`${site.appUrl}/login`}>Log in</a>}
            <a className={styles.cta} href={ctaHref}>Get the app</a>
            <MobileMenu />
          </>
        )}
      </div>
    </header>
  );
}
