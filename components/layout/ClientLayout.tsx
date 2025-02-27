"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StayTuned from "@/components/layout/StayTuned";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        {children}
        <StayTuned />
        <Footer />
      </main>
    </main>
  );
}
