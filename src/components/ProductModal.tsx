import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import type { Product } from "@/data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-card border border-border rounded-2xl overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary hover:bg-muted text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="lg:w-1/2 relative bg-secondary">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-4">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
                {product.name}
              </h2>

              {/* Tagline */}
              <p className="text-muted-foreground text-lg mb-6">
                {product.tagline}
              </p>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 bg-secondary rounded-lg border border-border"
                    >
                      <div className="text-xs text-muted-foreground mb-1">{key}</div>
                      <div className="font-semibold text-primary">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" className="flex-1">
                  Request Quote
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Download Datasheet
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
