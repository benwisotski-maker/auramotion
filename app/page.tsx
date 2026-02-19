import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OfferSection from "@/components/OfferSection";
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
      <DisciplinesSection />
      <VoiceSection />
      <WhyUsSection />
      <ContactForm />
    </main>
  );
}
