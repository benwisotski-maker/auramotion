import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OfferSection from "@/components/OfferSection";
import SwissEdgeSection from "@/components/SwissEdgeSection";
import DisciplinesSection from "@/components/DisciplinesSection";
import VoiceSection from "@/components/VoiceSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <OfferSection />
      <SwissEdgeSection />
      <DisciplinesSection />
      <VoiceSection />
      <WhyUsSection />
      <ContactForm />
    </main>
  );
}
