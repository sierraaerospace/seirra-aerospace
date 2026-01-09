import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import sierraLogo from "@/assets/sierra-logo.jpeg";

const PrivacyPolicy = () => {
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
            <Lock className="w-8 h-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              At Sierra Aerospace, we are committed to protecting your privacy and ensuring 
              the security of your personal information.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
            <ul className="space-y-2">
              <li>Contact information (name, email, phone number, address)</li>
              <li>Order and transaction details</li>
              <li>Technical information for product support</li>
              <li>Communication records with our team</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <ul className="space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and technical assistance</li>
              <li>Send order updates and shipping notifications</li>
              <li>Improve our products and services</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">Contact Us</h2>
            <p>
              For any privacy-related questions, please contact us at info[@]sierraaerospace.in
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
