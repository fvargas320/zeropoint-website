import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { PrivacyBody } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ZeroPoint collects, stores and protects your information, who can see it, and how to delete it.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage>
      <PrivacyBody />
    </LegalPage>
  );
}
