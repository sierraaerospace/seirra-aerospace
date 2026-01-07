import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Centimeter-Level Precision",
    description: "Our RTK GPS systems achieve ±1cm horizontal accuracy, enabling precise autonomous operations for mapping, surveying, and agricultural applications."
  },
  {
    title: "Seamless Integration",
    description: "Native support for DroneCAN/UAVCAN protocols with full compatibility for ArduPilot and PX4 flight stacks, reducing development time."
  },
  {
    title: "Rigorous Quality Control",
    description: "Every unit undergoes comprehensive testing including thermal cycling, vibration, and EMC testing to ensure reliability in demanding conditions."
  },
  {
    title: "Expert Technical Support",
    description: "Access our team of aerospace engineers for integration support, custom configurations, and troubleshooting assistance."
  },
  {
    title: "Competitive Pricing",
    description: "Professional-grade avionics at accessible prices, making advanced technology available for commercial and research applications."
  },
  {
    title: "Fast Global Shipping",
    description: "Strategically located distribution centers ensure quick delivery to customers in over 50 countries worldwide."
  }
];

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Sticky Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              The Sierra Advantage
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              When precision matters, organizations worldwide trust Sierra Aerospace 
              for mission-critical avionics solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-accent pl-4">
                <div className="text-3xl font-heading font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Global Partners</div>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <div className="text-3xl font-heading font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Reasons List */}
          <div className="space-y-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="p-6 bg-secondary border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
