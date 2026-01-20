import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import sierraLogo from "@/assets/sierra-logo.jpeg";

const Warranty = () => {
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
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold">Warranty</h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Sierra Aerospace stands behind the quality of our products. All our avionics systems 
              come with a comprehensive warranty to ensure your peace of mind.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Standard Warranty Coverage</h2>
            <ul className="space-y-2">
              <li>All products, including RTK GPS systems and autopilots, are covered for manufacturing defects for 12 months from the date of purchase.</li>
              <li>Warranty covers repair or replacement at our discretion.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">What's Not Covered</h2>
            <ul className="space-y-2">
              <li>Damage caused by misuse, accidents, or unauthorized modifications.</li>
              <li>Normal wear and tear.</li>
              <li>Damage from improper installation or operation outside specified parameters.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">How to Claim Warranty</h2>
            <p>
              Contact our support team at info[@]sierraaerospace.in with your order details and 
              a description of the issue. We will guide you through the warranty claim process.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Warranty;
