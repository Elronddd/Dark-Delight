import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import SignatureMenuShowcase from "@/components/sections/SignatureMenuShowcase";
import AmbienceGallery from "@/components/sections/AmbienceGallery";
import ReservationCTA from "@/components/sections/ReservationCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <About />
      <SignatureMenuShowcase />
      <AmbienceGallery />
      <ReservationCTA />
    </main>
  );
}
