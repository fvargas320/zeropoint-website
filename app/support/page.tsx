import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { SupportBody } from "@/content/legal/support";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with ZeroPoint: logging sessions, inventory, alerts and your account.",
  alternates: { canonical: "/support" },
};

export default function Page() {
  return (
    <LegalPage>
      <SupportBody />
    </LegalPage>
  );
}
