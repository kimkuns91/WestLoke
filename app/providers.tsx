"use client";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/components/layout/RootLayout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // gcTime: 60 * 60 * 1000,
        // refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone={timeZone}
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            {children}
            <Toaster />
          </RootLayout>
        </QueryClientProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
