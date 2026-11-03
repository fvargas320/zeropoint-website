import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { DeleteAccountBody } from "@/content/legal/delete-account";

export const metadata: Metadata = {
  title: "Delete your account",
  description: "How to delete your ZeroPoint account and its data, in the app or by email, and what is deleted.",
  alternates: { canonical: "/delete-account" },
};

export default function Page() {
  return (
    <LegalPage>
      <DeleteAccountBody />
    </LegalPage>
  );
}
