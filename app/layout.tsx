import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { getLocale, getMessages, getTimeZone } from "next-intl/server";

import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#18181B" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "WestLoke Amps | Handcrafted Tube Amplifiers",
    template: "%s | WestLoke Amps",
  },
  description: "Handcrafted boutique tube amplifiers",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  keywords: [
    "tube amp",
    "guitar amplifier",
    "boutique amp",
    "handmade amp",
    "vacuum tube",
    "WestLoke",
    "guitar tone",
  ],
  authors: [
    { name: "WestLoke Amps" },
    { name: "WhiteMouseDev", url: "https://portfolio.whitemouse.dev" },
  ],
  creator: "WestLoke Amps",
  generator: "Built by WhiteMouseDev",
  publisher: "WestLoke Amps",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://westloke.com",
    siteName: "WestLoke Amps",
    title: "WestLoke Amps | Handcrafted Tube Amplifiers",
    description:
      "Handcrafted boutique tube amplifiers made in Bothell, Washington",
    images: [
      {
        url: "/images/og-image.jpg", // OG 이미지 경로 설정 필요
        width: 1200,
        height: 630,
        alt: "WestLoke Amps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WestLoke Amps | Handcrafted Tube Amplifiers",
    description:
      "Handcrafted boutique tube amplifiers made in Bothell, Washington",
    images: ["/images/og-image.jpg"], // 트위터 카드 이미지 경로 설정 필요
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
};

interface LayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale}>
      <body
        className={cn(
          "flex min-h-[100vh] flex-col bg-white antialiased",
          poppins.className
        )}
      >
        <Providers messages={messages} locale={locale} timeZone={timeZone}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
