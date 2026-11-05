import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ZeroPoint: help with the app, feature ideas, and partnerships for ranges, clubs, matches and brands.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader ctaHref="/get" />
      <main id="main" className={`wrap ${styles.page}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Contact</p>
          <h1>Talk to the people building it.</h1>
          <p className="lede">A question, a bug, an idea, or a range or club that wants to work with us. We read every message.</p>
          <ul className={styles.ways}>
            <li><b>Email us</b><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><b>Looking for an answer?</b><Link href="/support">Read the support page</Link></li>
            <li><b>Already in the app?</b><span>Settings › Send feedback</span></li>
          </ul>
        </div>
        <ContactForm />
      </main>
      <SiteFooter />
    </>
  );
}
