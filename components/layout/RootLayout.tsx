import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StayTuned from "@/components/layout/StayTuned";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
