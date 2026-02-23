import { ContactSection } from "./components/ContactSection";
import { DemoSection } from "./components/DemoSection";
import { FaqSection } from "./components/FaqSection";
import { FlowShowcase } from "./components/FlowShowcase";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { OfferSection } from "./components/OfferSection";
import { Pillars } from "./components/Pillars";
import { TrustBar } from "./components/TrustBar";

export default function Home() {
  return (
    <div className="bg-brand-bg">
      <Hero />
      <FlowShowcase />
      <HowItWorksSection />
      <OfferSection />
      <DemoSection />
      <IntegrationsSection />
      <Pillars />
      <TrustBar />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
