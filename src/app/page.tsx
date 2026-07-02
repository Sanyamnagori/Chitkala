import { Footer } from "@/core/components/Footer";

import { HeroSection } from "@/features/hero/components/HeroSection";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { PortfolioSection } from "@/features/portfolio/components/PortfolioSection";
import { ShowreelSection } from "@/features/showreel/components/ShowreelSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PortfolioSection />
      <ShowreelSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
