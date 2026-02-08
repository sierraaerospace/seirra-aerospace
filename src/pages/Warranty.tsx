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
            <h1 className="font-heading text-3xl font-bold">Warranty Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: 16 January 2026</p>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Sierra Aerospace stands behind the quality of its avionics products, including Flight Controllers, GPS Systems, and related products ("Products").
              This Warranty Policy outlines the terms and conditions governing warranty coverage for Products purchased directly from www.sierraaerospace.in or through our official RFQ business process.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">1. Warranty Coverage</h2>
            <p>
              Sierra Aerospace warrants that its Products shall be free from defects in materials and workmanship under normal use and service for a period of six (6) months from the original date of delivery.
            </p>
            <p>During the warranty period, Sierra Aerospace will, at its sole discretion:</p>
            <ul className="space-y-2">
              <li>Repair the defective Product, or</li>
              <li>Replace the defective Product with a new or refurbished unit of equivalent functionality.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">2. Warranty Period & Purchase Terms</h2>
            <ul className="space-y-2">
              <li>The warranty period is strictly limited to six (6) months from the delivery date.</li>
              <li>Any Purchase Orders indicating warranty periods greater than six months shall not be considered or honored.</li>
              <li>This condition is reflected in all quotations, proforma invoices, and GST invoices.</li>
              <li>Issuance of a Purchase Order (PO) constitutes acceptance of this warranty clause.</li>
            </ul>
            <p className="mt-4">
              <strong>Delivery Date Definition:</strong> The delivery date is defined as the date on which the Product is delivered to the customer's location as recorded on the Delivery Challan and signed by security, front office, or warehouse personnel, irrespective of end-user collection.
            </p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">3. Warranty Eligibility</h2>
            <ul className="space-y-2">
              <li>This warranty is valid only for the original purchaser.</li>
              <li>The warranty is non-transferable and becomes void if the Product is sold or handed over to another individual or organization.</li>
              <li>Products must be purchased directly from Sierra Aerospace or an authorized reseller.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">4. Warranty Exclusions</h2>
            <p>This warranty does not cover:</p>
            <ul className="space-y-2">
              <li><strong>a) Damage from Misuse, Neglect, or Accident</strong> - Including physical damage (cracks, broken connectors, burns), water damage or corrosion, and damage due to UAV crash or crash landing.</li>
              <li><strong>b) Improper Installation or Handling</strong> - Over-voltage, ESD (electrostatic discharge), short circuits.</li>
              <li><strong>c) Unauthorized Modifications or Repairs</strong> - Any Product that has been modified, altered, coated, potted, reworked, repaired, or tampered with by any person or entity not expressly authorized in writing by Sierra Aerospace, including conformal coatings, epoxy potting, encapsulation compounds, adhesives or sealants.</li>
              <li><strong>d) Normal Wear and Tear</strong> - Performance deterioration due to normal operational usage over time.</li>
              <li><strong>e) Software or Firmware Issues</strong> - This warranty covers hardware only. Issues related to open-source or third-party firmware are excluded.</li>
              <li><strong>f) Consumable Parts</strong> - Including connectors, headers, and similar components subject to degradation.</li>
              <li><strong>g) Products Purchased from Unauthorized Sellers</strong></li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">5. Repair, Serviceability & Non-Repairability</h2>
            <p>Due to the complexity of miniature avionics electronics:</p>
            <ul className="space-y-2">
              <li>Repair acceptance is not guaranteed.</li>
              <li>Products are evaluated for serviceability.</li>
              <li>Sierra Aerospace reserves the right to decline repairs for devices deemed non-recoverable.</li>
            </ul>
            <p className="mt-4"><strong>No Guarantee of Repair Success:</strong> Even after acceptance, repair success is not assured due to multilayer PCBs, BGA ICs, crash damage, and sensitive circuitry.</p>
            <p className="mt-4"><strong>Repair Charges:</strong> All repair-related costs shall be borne by the customer, including but not limited to diagnostic/inspection fee, component replacement, rework & retesting, and return logistics. Inspection charges apply even if the unit is declared non-repairable. For flight-critical or severely damaged units, a replacement-only policy may apply.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">6. Warranty Claim Process</h2>
            <p>To obtain service under this warranty:</p>
            <p className="mt-4"><strong>Step 1: Contact Support</strong><br />Before returning any Product, contact our support team at: 📧 returns@sierraaerospace.in<br />If approved, an RMA (Return Merchandise Authorization) number will be issued. Returns without an RMA number will not be accepted.</p>
            <p className="mt-4"><strong>Step 2: Provide Proof of Purchase</strong><br />A valid invoice or proof of purchase is required.</p>
            <p className="mt-4"><strong>Step 3: Pre-Shipment Verification</strong><br />Photographs of the Product and its packaging must be submitted for approval prior to shipping.</p>
            <p className="mt-4"><strong>Step 4: Shipping</strong><br />The customer is responsible for return shipping costs (standard global practice).</p>
            <p className="mt-4"><strong>Step 5: Assessment</strong><br />Our technicians will inspect the Product to determine warranty eligibility.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">7. Warranty Remedies</h2>
            <p>If the Product is confirmed to be defective and covered under warranty, Sierra Aerospace will, at its option:</p>
            <ul className="space-y-2">
              <li>Repair the Product, or</li>
              <li>Replace it with a new or refurbished unit of equivalent functionality.</li>
            </ul>
            <p>Sierra Aerospace will cover the return shipping cost for the repaired or replaced Product to the original purchaser.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">8. Limitation of Liability</h2>
            <p>This warranty is your sole and exclusive remedy. Sierra Aerospace shall not be liable for:</p>
            <ul className="space-y-2">
              <li>Any incidental, consequential, or indirect damages</li>
              <li>Loss of use, data, time, or commercial loss</li>
              <li>UAV crashes, mission losses, or operational failures</li>
            </ul>
            <p>Liability is strictly limited to the value of the Product.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
            <p>This Warranty Policy shall be governed by the laws of India. All disputes shall be subject exclusively to the courts of Bengaluru, Karnataka.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">10. Policy Updates</h2>
            <p>Sierra Aerospace reserves the right to update this Warranty Policy at any time. Updates will be posted on this page with a revised "Last Updated" date.</p>

            <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">11. Contact Information</h2>
            <p>For any warranty-related queries, please contact: info@sierraaerospace.in</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Warranty;
