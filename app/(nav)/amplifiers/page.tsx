import AmplifierList from "@/components/Amplifier/AmplifierList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amplifiers | Westloke Amps",
  description: "Browse our collection of handcrafted tube amplifiers",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <AmplifierList />
    </div>
  );
}
