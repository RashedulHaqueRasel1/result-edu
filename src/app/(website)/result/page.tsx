import Result from "@/components/website/Result/Result";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Examination Result | Detailed Grade Sheet",
  description: "View your detailed examination result, grade sheet, and subject-wise marks. Download or print your SSC/HSC/JSC result instantly.",
  robots: {
    index: false, // Results are personal/dynamic, usually shouldn't be indexed with student data
    follow: true,
  },
};

export default function Page() {
  return <Result />;
}
