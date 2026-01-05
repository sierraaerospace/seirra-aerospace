import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCatalogue from "@/components/ProductCatalogue";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sierra Aerospace | Precision Avionics for Global Excellence</title>
        <meta 
          name="description" 
          content="Sierra Aerospace delivers world-class RTK GPS systems, autopilots, and sensors for UAV applications. International export-ready with centimeter-level precision. Serving 50+ countries." 
        />
        <meta name="keywords" content="RTK GPS, UAV avionics, drone autopilot, DroneCAN, precision navigation, ArduPilot, PX4, aerospace, export" />
        <meta property="og:title" content="Sierra Aerospace | Precision Avionics" />
        <meta property="og:description" content="World-class RTK GPS systems, autopilots, and sensors for professional UAV applications." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <ProductCatalogue />
          <AboutSection />
          <WhyUsSection />
          <ContactSection />
        </main>
        <Footer />
        <LiveChat />
      </div>
    </>
  );
};

export default Index;
