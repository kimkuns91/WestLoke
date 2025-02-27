import FeaturedSection from "@/components/Main/FeaturedSection";
import Hero from "@/components/Main/Hero";
import Location from "@/components/Main/Location";
import SeoulSession from "@/components/Main/SeoulSession";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F3EEEA]">
      <Hero />
      <SeoulSession />
      <FeaturedSection />
      <Location />
    </main>
  );
}
