import HeroSection from "@/components/HeroSection";
import VideoShowcase from "@/components/VideoShowcase";
import OfferSection from "@/components/OfferSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoShowcase />
      <OfferSection />
      <ContactForm />
    </main>
  );
}
