import PrivacyPolicy from "@/components/website/PrivacyPolicy/PrivacyPolicy";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Education Result Portal BD",
  description: "Read our privacy policy to understand how we handle your data, student information, and cookies on the Education Result Portal.",
};

export default function page() {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
}
