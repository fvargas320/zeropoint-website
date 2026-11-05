import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "@/components/sections/contact-form";
import { SupportQuestions } from "@/components/sections/support-questions";
import { FaqJsonLd } from "@/components/seo/app-json-ld";
import { supportQuestions } from "@/content/legal/support";
import { site } from "@/content/site";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with ZeroPoint, send us an idea, or talk to us about partnerships. Answers on logging sessions, inventory, alerts and your account.",
  alternates: { canonical: "/support" },
};

// The App Store listing links here, so this URL stays; /contact redirects to it.
export default function SupportPage() {
  return (
    <>
      <SiteHeader ctaHref="/get" />
      <main id="main">
        <div className={`wrap ${styles.page}`}>
          <div className={styles.intro}>
            <p className="eyebrow">Support</p>
            <h1>Talk to the people building it.</h1>
            <p className="lede">A question, a bug, an idea, or a range or club that wants to work with us. We read every message.</p>
            <ul className={styles.ways}>
              <li><b>Email us</b><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><b>Looking for an answer?</b><a href="#faq">Read the common questions</a></li>
              <li><b>Already in the app?</b><span>Settings › Send feedback</span></li>
              <li><b>When will you reply?</b><span>Typically within 24 hours</span></li>
            </ul>
          </div>
          <ContactForm />
        </div>
        <SupportQuestions />
      </main>
      <SiteFooter />
      <FaqJsonLd items={supportQuestions.flatMap((g) => g.items)} />
    </>
  );
}
