import Link from "next/link";
import { Fragment } from "react";
import { headerNav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { SportsMenu } from "./sports-menu";
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
              {headerNav.map((l) => (
                <Fragment key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                  {l.label === "Features" && <SportsMenu />}
                </Fragment>
              ))}
              {site.appUrl && <a href={`${site.appUrl}/login`}>Log in</a>}
            </nav>
            <a className={styles.cta} href={ctaHref}>Get the app</a>
          </>
        )}
      </div>
    </header>
  );
}
