import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { YourDataBody } from "@/content/legal/your-data";

export const metadata: Metadata = {
  title: "Save your photos and videos",
  description: "How to save your ZeroPoint photos and videos, or keep them in the cloud.",
  alternates: { canonical: "/your-data" },
};

export default function Page() {
  return (
    <LegalPage>
      <YourDataBody />
    </LegalPage>
  );
}
