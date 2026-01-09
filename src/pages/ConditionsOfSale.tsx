import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import sierraLogo from "@/assets/sierra-logo.jpeg";

const ConditionsOfSale = () => {
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
            <FileText className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold">Conditions of Sale</h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              By placing an order with Sierra Aerospace, you agree to the following terms 
              and conditions.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Pricing and Payment</h2>
            <ul className="space-y-2">
              <li>All prices are in Indian Rupees (INR) unless otherwise specified.</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>Payment is required in full before shipment.</li>
              <li>We accept major credit cards, bank transfers, and UPI payments.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Order Acceptance</h2>
            <ul className="space-y-2">
              <li>All orders are subject to acceptance and product availability.</li>
              <li>We reserve the right to refuse or cancel any order.</li>
              <li>Order confirmation will be sent via email.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Export Compliance</h2>
            <p>
              Certain products may be subject to export regulations. International customers 
              are responsible for compliance with their local import regulations and any 
              applicable duties or taxes.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Limitation of Liability</h2>
            <p>
              Sierra Aerospace's liability is limited to the purchase price of the product. 
              We are not liable for any indirect, incidental, or consequential damages.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConditionsOfSale;
