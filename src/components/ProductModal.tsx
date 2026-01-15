import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Download, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import type { Product } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    navigate("/cart");
  };

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
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-background overflow-hidden flex flex-col lg:flex-row shadow-elegant"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-secondary hover:bg-muted text-foreground transition-colors"
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
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/20 via-transparent to-transparent" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
              {/* Category */}
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold mb-4 tracking-wide">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {product.name}
              </h2>

              {/* Tagline */}
              <p className="text-muted-foreground text-lg mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              {product.price && (
                <div className="mb-8">
                  <p className="text-2xl font-bold text-accent">
                    ₹{product.price.toLocaleString("en-IN")}
                    <span className="text-sm font-normal text-muted-foreground ml-2">price per unit</span>
                  </p>
                </div>
              )}

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-4 bg-secondary border border-border"
                    >
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{key}</div>
                      <div className="font-semibold text-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                {product.datasheet ? (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                    asChild
                  >
                    <a href={product.datasheet} target="_blank" rel="noopener noreferrer" download>
                      <Download className="w-4 h-4 mr-2" />
                      Download Datasheet
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" className="flex-1" disabled>
                    <Download className="w-4 h-4 mr-2" />
                    Datasheet Unavailable
                  </Button>
                )}
                <Button variant="gold" size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
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
