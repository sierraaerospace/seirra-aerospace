import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Connect With Us
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Contact our team for product specifications, pricing, 
              or technical support. We're here to help.
            </p>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Phone, label: "Phone", value: "+91 78929 06828" },
                { icon: Mail, label: "Email", value: "info[@] sierraaerospace.in" },
                { icon: MapPin, label: "Address", value: "56,10th Main, Sector-1\nNOBO Nagar, BG Road\nBengaluru- 560076" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center gap-3 p-6 bg-background border border-border"
                >
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                    <div className="font-medium text-foreground whitespace-pre-line text-sm">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-6 bg-primary text-primary-foreground">
              <h4 className="font-heading font-semibold mb-2">Business Hours</h4>
              <p className="text-primary-foreground/80 text-sm">
                Monday - Saturday: 9:00 AM - 6:00 PM (IST)<br />
                Technical Support: Available during business hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
