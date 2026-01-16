import { Linkedin, Twitter, Instagram } from "lucide-react";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { Link } from "react-router-dom";

// Custom WhatsApp icon since Lucide doesn't have one
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
                { icon: Instagram, href: "https://www.instagram.com/sierra_aerospace/" },
                { icon: WhatsAppIcon, href: "https://wa.me/917892906828" },
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
            <div className="bg-white rounded-lg p-1">
              <img 
                src={sierraLogo} 
                alt="Sierra Aerospace" 
                className="h-10 w-auto object-contain"
              />
            </div>
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
