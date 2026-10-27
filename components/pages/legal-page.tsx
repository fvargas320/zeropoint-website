import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import styles from "./legal-page.module.css";

/** Layout for text pages (privacy, terms, support, your data). The body is
    ported markup, so its classes are styled from legal-page.module.css. */
export function LegalPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader ctaHref="/get" />
      <main id="main" className={`wrap ${styles.page}`}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
