import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border"
          : "bg-foreground/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - SVG version for clean rendering */}
          <a href="#home" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Logo Icon */}
              <svg 
                viewBox="0 0 40 40" 
                className={`w-10 h-10 transition-colors duration-500 ${isScrolled ? 'text-foreground' : 'text-background'}`}
                fill="currentColor"
              >
                <rect x="2" y="2" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3"/>
                <line x1="2" y1="38" x2="38" y2="2" stroke="currentColor" strokeWidth="3"/>
              </svg>
              <div className="flex flex-col">
                <span className={`font-heading text-2xl font-bold tracking-tight transition-colors duration-500 ${isScrolled ? 'text-foreground' : 'text-background'}`}>
                  Sierra
                </span>
                <span className={`text-[10px] tracking-[0.25em] uppercase -mt-1 transition-colors duration-500 ${isScrolled ? 'text-muted-foreground' : 'text-background/70'}`}>
                  Aerospace
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors duration-300 font-medium text-sm tracking-wide relative group ${
                  isScrolled 
                    ? 'text-foreground/80 hover:text-primary' 
                    : 'text-background/80 hover:text-background'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-primary' : 'bg-background'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+15551234567" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                isScrolled 
                  ? 'text-muted-foreground hover:text-foreground' 
                  : 'text-background/70 hover:text-background'
              }`}
            >
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </a>
            <Button variant="blue" size="default" asChild>
              <a href="#contact">Get Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-foreground' : 'text-background'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium text-lg"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <Button variant="blue" className="w-full" asChild>
                  <a href="#contact">Get Quote</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
