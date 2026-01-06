import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: "RTK GPS Systems", href: "#products" },
      { label: "Autopilots", href: "#products" },
      { label: "Sensors", href: "#products" },
      { label: "Power Systems", href: "#products" },
    ],
    company: [
      { label: "About Us", href: "#about" },
      { label: "Why Choose Us", href: "#why-us" },
      { label: "Certifications", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    support: [
      { label: "Documentation", href: "#" },
      { label: "Technical Support", href: "#contact" },
      { label: "Firmware Updates", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              {/* Logo Icon */}
              <svg 
                viewBox="0 0 40 40" 
                className="w-10 h-10 text-background"
                fill="currentColor"
              >
                <rect x="2" y="2" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3"/>
                <line x1="2" y1="38" x2="38" y2="2" stroke="currentColor" strokeWidth="3"/>
              </svg>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold text-background">Sierra</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-background/70 -mt-1">
                  Aerospace
                </span>
              </div>
            </div>
            <p className="text-background/70 mb-6 max-w-xs leading-relaxed">
              Precision avionics solutions for professional UAV applications. 
              Trusted by organizations in over 50 countries worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Youtube, href: "#" },
                { icon: Mail, href: "mailto:info@sierraaerospace.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {currentYear} Sierra Aerospace. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Export Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
