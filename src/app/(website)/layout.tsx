import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Education Result Portal",
  description:
    "A comprehensive Education Result Portal, designed to provide secure result searching and robust administrative management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
