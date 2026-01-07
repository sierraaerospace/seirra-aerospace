import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Award, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Export Ready",
    description: "Products certified for international markets with full compliance documentation."
  },
  {
    icon: Award,
    title: "Industry Certified",
    description: "Meeting international aerospace standards for reliability and performance."
  },
  {
    icon: Users,
    title: "Technical Support",
    description: "Dedicated engineering team for integration assistance and custom solutions."
  },
  {
    icon: Headphones,
    title: "24/7 Assistance",
    description: "Round-the-clock support for mission-critical deployments worldwide."
  }
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              About Sierra Aerospace
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Engineering Excellence for Modern Aviation
            </h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Sierra Aerospace specializes in developing high-precision avionics systems 
              for unmanned aerial vehicles. With a commitment to quality and innovation, 
              we deliver reliable solutions for professional UAV applications.
            </p>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              From centimeter-level RTK GPS modules to advanced autopilot systems, 
              our products are engineered for reliability in the most demanding environments.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-4">
              {["ISO 9001", "CE Certified", "RoHS", "ITAR Compliant"].map((cert, i) => (
                <span key={i} className="px-4 py-2 bg-background border border-border text-sm font-medium text-foreground">
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="p-6 bg-background border border-border hover:border-accent/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
