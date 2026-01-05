import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { products, categories, type Product, type ProductCategory } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductCatalogue = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" ref={ref} className="py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            Product Catalogue
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Precision Avionics Solutions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore our comprehensive range of RTK GPS modules, autopilots, sensors, 
            and power systems designed for professional UAV applications worldwide.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 tracking-wide ${
              activeCategory === "All"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 tracking-wide ${
                activeCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default ProductCatalogue;
