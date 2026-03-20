import { ContactSection } from "./components/ContactSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { PillarCards } from "./components/PillarCards";
import { ProcessSection } from "./components/ProcessSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProcessSection />
      <PillarCards />
      <IntegrationsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
