import "@/styles/globals.css";

import { getLocale, getMessages, getTimeZone } from "next-intl/server";

import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Your App Name",
  description: "Your app description",
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
