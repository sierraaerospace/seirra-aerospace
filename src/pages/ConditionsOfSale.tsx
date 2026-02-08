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
            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">1. Right of Sale</h2>
            <p>All sales are subject to acceptance by Sierra Aerospace.</p>
            <p>Sierra Aerospace reserves the right, at its sole discretion, to refuse or cancel any order, even after payment has been received, without providing any reason.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">2. Refund in Case of Non-Supply</h2>
            <p>If Sierra Aerospace elects not to supply or ship the goods, the Buyer will be refunded the amount received for that order.</p>
            <p>Such refund will be made within a reasonable time frame, but no interest, compensation, or damages of any kind shall be payable by the Seller.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">3. Orders Acceptance & Cancellations</h2>
            <ul className="space-y-2">
              <li>Orders placed by the Buyer are treated as offers to purchase.</li>
              <li>Sierra Aerospace's confirmation or shipment constitutes acceptance.</li>
              <li>No cancellation will be accepted after confirmation, except at Sierra Aerospace's discretion.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">4. Force Majeure</h2>
            <p>Sierra Aerospace will not be responsible for delays or non-performance caused by circumstances beyond reasonable control (including but not limited to natural disasters, strikes, or supply shortages).</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">5. Governing Law & Jurisdiction</h2>
            <p>This condition of sale shall be governed by the laws of India.</p>
            <p>Any disputes shall be subject exclusively to the courts of Bengaluru, Karnataka.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConditionsOfSale;
