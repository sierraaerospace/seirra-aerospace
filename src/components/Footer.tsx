import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
              <span className="text-primary font-heading font-bold text-xl">S</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg tracking-wider">Sierra</span>
              <span className="font-heading text-muted-foreground text-sm tracking-[0.2em] block -mt-1">AEROSPACE</span>
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center"
          >
            Reliability Redefined — Precision Avionics for UAV Excellence
          </motion.p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 Sierra Aerospace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
