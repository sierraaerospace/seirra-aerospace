import { motion } from "framer-motion";
import { Shield, Cpu, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Quality",
    description: "Industrial-grade components designed for mission-critical applications."
  },
  {
    icon: Cpu,
    title: "DroneCAN Native",
    description: "All products support UAVCAN/DroneCAN for seamless integration."
  },
  {
    icon: Zap,
    title: "Ultra-Low Power",
    description: "Optimized power consumption for extended flight times."
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "Ardupilot and PX4 compatible with worldwide developer support."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              About Sierra Aerospace
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Engineering Excellence for the <span className="text-primary">Future of Flight</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Sierra Aerospace specializes in developing high-precision avionics systems 
              for unmanned aerial vehicles. Our products are designed with a focus on 
              reliability, accuracy, and seamless integration with popular flight stacks.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From centimeter-level RTK GPS modules to advanced autopilot systems, 
              we provide the technology that enables the next generation of autonomous flight.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "±1cm", label: "RTK Precision" },
                { value: "15g", label: "Lightweight" },
                { value: "24/7", label: "Support" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-secondary rounded-lg border border-border">
                  <div className="text-xl md:text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
