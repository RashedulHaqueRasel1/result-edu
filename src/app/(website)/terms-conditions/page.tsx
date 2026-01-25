import TermsConditions from "@/components/website/TermsConditions/TermsConditions";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Education Result Portal BD",
  description: "Terms of service and usage guidelines for the Bangladesh Education Board Result Portal.",
};

export default function page() {
  return (
    <div>
      <TermsConditions />
    </div>
  );
}
