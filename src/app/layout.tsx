import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import MainProviders from "@/Providers/MainProviders";
import Provider from "@/Providers/Provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || "https://education-result-bd.vercel.app"),
  title: {
    default: "Bangladesh Education Board Result 2025-2027 | SSC JSC HSC Result Checker",
    template: "%s | Education Result Portal",
  },
  description:
    "Check SSC, JSC, and HSC results in Bangladesh online. Search results by board name, examination type, year (2025, 2026, 2027), roll number, registration number, and EIIN. Get detailed marksheet and individual results quickly and securely.",
  keywords: [
    "Bangladesh Education Board Result",
    "SSC Result Bangladesh 2025",
    "HSC Result Bangladesh 2025",
    "SSC Result 2026",
    "HSC Result 2026",
    "SSC Result 2027",
    "JSC Result Bangladesh",
    "SSC Result Check by Roll and Registration",
    "HSC Result with Marksheet",
    "Web Based Result Publication System",
    "Education Board Result Online",
    "Institute Result by EIIN",
    "Board Result Bangladesh",
  ],
  authors: [{ name: "Education Board Bangladesh" }],
  creator: "Education Board Result Portal",
  publisher: "Education Board Result Portal",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "/",
    title: "Bangladesh Education Board Result 2025-2027 | SSC JSC HSC Result Checker",
    description: "The most trusted platform for checking SSC, HSC, JSC, and Dakhil results in Bangladesh. Official-grade accuracy and speed.",
    siteName: "Education Result Portal BD",
    images: [
      {
        url: "/images/result-edu.jpg",
        width: 1200,
        height: 630,
        alt: "Bangladesh Education Board Result Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladesh Education Board Result 2025-2027",
    description: "Check your exam results (SSC, HSC, JSC) instantly with detailed marksheets.",
    images: ["/images/result-edu.jpg"],
    creator: "@educationboardbd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/result-edu.jpg",
    shortcut: "/images/result-edu.jpg",
    apple: "/images/result-edu.jpg",
  },
};

import InitialLoader from "@/components/common/InitialLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <MainProviders>
          <Provider>
            <InitialLoader>{children}</InitialLoader>
          </Provider>
        </MainProviders>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
