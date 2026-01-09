import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
}

const ProductCard = ({ product, index, onSelect }: ProductCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer bg-card border border-border hover:border-accent/30 transition-all duration-500 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* View Button */}
        <motion.div 
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <div className="w-12 h-12 bg-accent flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
          </div>
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-background/95 text-xs font-semibold text-foreground tracking-wide">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.tagline}
        </p>
        
        {/* Key Specs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
            <span
              key={key}
              className="px-2.5 py-1 bg-secondary text-xs font-medium text-foreground/80"
            >
              {key}: {value}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
