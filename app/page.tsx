import { ContactSection } from "./components/ContactSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { ProcessSection } from "./components/ProcessSection";
import { ProductShowcase } from "./components/ProductShowcase";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProcessSection />
      <ProductShowcase />
      <IntegrationsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
