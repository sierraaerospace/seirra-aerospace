import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. Our team will respond within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Let's Discuss Your Project
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Contact our sales team for product specifications, bulk pricing, 
              or custom integration support. We respond within 24 hours.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, label: "Email", value: "sales@sierraaerospace.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Headquarters", value: "Silicon Valley, California, USA" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-4 p-4 bg-background border border-border"
                >
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="p-6 bg-primary text-primary-foreground">
              <h4 className="font-heading font-semibold mb-2">Business Hours</h4>
              <p className="text-primary-foreground/80 text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                Technical Support: 24/7 for enterprise customers
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-background border border-border p-8 md:p-10"
          >
            <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground">
              Request a Quote
            </h3>
            
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project requirements, quantities, or any questions..."
                  className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              
              <Button type="submit" variant="gold" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our privacy policy. We never share your information.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
