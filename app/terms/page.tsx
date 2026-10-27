import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { TermsBody } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using the ZeroPoint app and website.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <LegalPage>
      <TermsBody />
    </LegalPage>
  );
}
