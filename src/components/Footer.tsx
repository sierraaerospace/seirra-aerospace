import { Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: "RTK GPS Systems", href: "#products" },
      { label: "Autopilots", href: "#products" },
      { label: "Sensors", href: "#products" },
      { label: "Power Systems", href: "#products" },
    ],
    information: [
      { label: "Warranty", href: "/warranty" },
      { label: "Shipping and Returns", href: "/shipping-returns" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Conditions of Sale", href: "/conditions-of-sale" },
    ],
    technicals: [
      { label: "CAD Models", href: "#" },
      { label: "Datasheets", href: "#" },
      { label: "Firmware", href: "#" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Social</h4>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/sierra-aerospace" },
                { icon: Twitter, href: "https://twitter.com/sierraaerospace" },
                { icon: Instagram, href: "https://www.instagram.com/sierraaerospace" },
                { icon: MessageCircle, href: "https://wa.me/917892906828" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>+91 78929 06828</p>
              <p>info[@] sierraaerospace.in</p>
              <div className="pt-2">
                <p>56,10th Main, Sector-1</p>
                <p>NOBO Nagar, BG Road</p>
                <p>Bengaluru- 560076</p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Information</h4>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technicals */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Technicals</h4>
            <ul className="space-y-3">
              {footerLinks.technicals.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={sierraLogo} 
              alt="Sierra Aerospace" 
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-sm text-primary-foreground/60">
            © 2019 - {currentYear} - Signific Systems, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
