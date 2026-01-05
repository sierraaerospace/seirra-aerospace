import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCatalogue from "@/components/ProductCatalogue";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sierra Aerospace | Precision Avionics for UAV Excellence</title>
        <meta 
          name="description" 
          content="Sierra Aerospace delivers high-precision RTK GPS, autopilots, and avionics systems for drones and UAVs. ±1cm accuracy, DroneCAN native, Ardupilot compatible." 
        />
        <meta name="keywords" content="RTK GPS, UAV avionics, drone autopilot, DroneCAN, precision navigation, Ardupilot, PX4" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <ProductCatalogue />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
