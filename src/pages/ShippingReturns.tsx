import { motion } from "framer-motion";
import { ArrowLeft, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import sierraLogo from "@/assets/sierra-logo.jpeg";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link to="/">
            <img src={sierraLogo} alt="Sierra Aerospace" className="h-12 w-auto" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border p-8 md:p-12 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold">Shipping and Returns</h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <h2 className="font-heading text-xl font-semibold text-foreground mt-4 mb-4">Shipping Policy</h2>
            <ul className="space-y-2">
              <li>We ship all orders from our facility in Bengaluru, India.</li>
              <li>Standard shipping within India: 5-7 business days.</li>
              <li>International shipping available to select countries.</li>
              <li>Shipping costs are calculated based on weight and destination.</li>
              <li>All international shipments include proper export documentation.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Return Policy
            </h2>
            <ul className="space-y-2">
              <li>Returns accepted within 30 days of delivery for unopened products.</li>
              <li>Products must be in original packaging and unused condition.</li>
              <li>Return shipping costs are the responsibility of the customer.</li>
              <li>Refunds processed within 7-10 business days after receiving the return.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Damaged or Defective Items</h2>
            <p>
              If you receive a damaged or defective item, please contact us within 48 hours of 
              delivery with photos of the damage. We will arrange for a replacement or refund 
              at no additional cost.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingReturns;
