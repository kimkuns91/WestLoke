"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/components/layout/RootLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
  timeZone: string;
}

export function Providers({
  children,
  messages,
  locale,
  timeZone,
}: ProvidersProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/dashboard");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const content = isAdminRoute ? children : <RootLayout>{children}</RootLayout>;

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={timeZone}
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {content}
          <Toaster />
        </QueryClientProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
