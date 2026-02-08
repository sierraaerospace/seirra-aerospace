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
          <p className="text-sm text-muted-foreground mb-8">Last Updated: 16 January 2026</p>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            {/* Shipping Policy */}
            <h2 className="font-heading text-2xl font-semibold text-foreground mt-4 mb-4">Shipping Policy</h2>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">1. Free Shipping</h3>
            <p>We provide free shipping on all orders, with no minimum size, quantity, or value required. Please note that pick-up at our facility is not available.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">2. Courier Selection</h3>
            <p>All orders are shipped via reputable courier partners to ensure prompt and secure delivery. We retain the right to choose the most suitable courier service for each shipment.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">3. Unsupported Shipping Methods</h3>
            <p>For safety and security reasons, we cannot dispatch orders through:</p>
            <ul className="space-y-2">
              <li>Private or public bus drivers or conductors for hand-delivery.</li>
              <li>Parcel or cargo service stations.</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">4. Preferred Courier Requests</h3>
            <p>If you have a preferred courier company, you may arrange for them to collect your order from our facility. You are responsible for all paperwork and must schedule the pick-up time with us in advance. Please note: Sierra Aerospace is not liable for any claims, damages, or issues related to packages collected by a customer-arranged courier.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">5. Order Splitting</h3>
            <p>We aim to ship all items in your order together. However, if certain products have different availability or characteristics, we may split the shipment and notify you beforehand.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">6. Damaged Packages</h3>
            <p>If a package appears tampered with or damaged upon delivery, please refuse to accept it. Immediately contact us with your order number, and we will arrange for a replacement as soon as possible.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">7. Remote Locations</h3>
            <p>For remote areas not well-serviced by standard couriers, we can, upon request, ship via India Post. Please be aware that we cannot guarantee this option.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">8. Shipping Schedule</h3>
            <ul className="space-y-2">
              <li><strong>Shipping Days:</strong> Monday to Friday (excluding public holidays in Bengaluru, Karnataka).</li>
              <li><strong>Weekend Orders:</strong> Orders placed on Saturday or Sunday will ship the following Monday.</li>
              <li><strong>Cut-off Time:</strong> Orders placed on a weekday before 11:00 AM will be dispatched the same day (excluding weekends and holidays).</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">9. Delivery Timelines</h3>
            <p>Once a package leaves our facility, it is in the courier's control. While we provide estimated delivery times from the courier, we cannot guarantee a specific delivery time due to variables in transit processes and unforeseen delays.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">10. Recommendation</h3>
            <p>To ensure your order arrives on time, please plan ahead and avoid last-minute purchases.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">11. Transit Damage Liability</h3>
            <p>Sierra Aerospace is not responsible for any damages that occur during transit.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">12. Shipping Insurance</h3>
            <p>For comprehensive coverage against potential transit damage, you may purchase shipping insurance for the full value of your order. The Buyer is responsible for the actual cost of this insurance. Please contact us to arrange this.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">13. Policy Changes</h3>
            <p>This policy is subject to change without prior notice. We advise reviewing it before making a purchase.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">14. Contact Us</h3>
            <p>If you have any questions about this Policy, please contact us at: info@sierraaerospace.in</p>

            {/* Returns Policy */}
            <h2 className="font-heading text-2xl font-semibold text-foreground mt-12 mb-4 flex items-center gap-2">
              <RotateCcw className="w-6 h-6" />
              Returns Policy
            </h2>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">1. Eligibility</h3>
            <p>All parts are eligible for return, provided they meet the following conditions:</p>
            <ul className="space-y-2">
              <li>The product must be unused, undamaged, and in its original packaging with all included contents.</li>
              <li>The outer plastic wrapping may be removed.</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">2. Return Window</h3>
            <p>You must initiate a return request within 7 days of the delivery date. The delivery date is defined as the date recorded on the courier tracking page, even if the package is signed for by security, the front office, or your warehouse.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">3. How to Initiate a Return</h3>
            <p>To start a return, please email us at returns@sierraaerospace.in with your order ID.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">4. Return Process</h3>
            <ul className="space-y-2">
              <li>Once your request is approved, we will issue a Return Merchandise Authorization (RMA) number. Returns will not be accepted without this number.</li>
              <li>Before shipping the item back, you must provide photographs of the actual product and its packaging to ensure it is sufficiently protected for transit.</li>
              <li>The customer is responsible for all return shipping costs, which is standard global practice.</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">5. Refund Process</h3>
            <ul className="space-y-2">
              <li>Upon receipt, the product will be inspected to verify it is unused and undamaged.</li>
              <li>If the return is approved, a refund will be issued to your original payment method.</li>
              <li>A 20% restocking fee will be deducted from the refund amount.</li>
              <li>The refund will be processed immediately after the return is completed. The time it takes for the funds to appear in your account depends on your payment provider's processing times.</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">6. Dead on Arrival (DOA)</h3>
            <p>The same return process applies for DOA or warranty claims, excluding the 20% restocking fee.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">7. Non-Returnable Items</h3>
            <p>Returns are not accepted for the following products:</p>
            <ul className="space-y-2">
              <li>Cable Harnesses</li>
              <li>Flexible Parts (e.g., Grommets, Vibration Pads)</li>
              <li>Hardware (e.g., Nuts, Bolts, Washers)</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">8. Policy Scope</h3>
            <p>This policy applies only to products purchased directly from www.sierraaerospace.in and through RFQ business process.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">9. Policy Changes</h3>
            <p>This policy is subject to change without prior notice. We recommend reviewing it before making any purchase.</p>

            <h3 className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">10. Contact Us</h3>
            <p>If you have any questions about this Policy, please contact us at: info@sierraaerospace.in</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingReturns;
