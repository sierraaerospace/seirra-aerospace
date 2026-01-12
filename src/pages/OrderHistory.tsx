import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Truck, 
  FileText, 
  Calendar, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  MapPin,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import sierraLogo from "@/assets/sierra-logo.jpeg";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Shipment {
  id: string;
  tracking_number: string | null;
  carrier: string | null;
  status: "preparing" | "dispatched" | "in_transit" | "out_for_delivery" | "delivered";
  shipped_at: string | null;
  estimated_delivery: string | null;
  delivered_at: string | null;
  tracking_url: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  expected_delivery: string | null;
  created_at: string;
  shipping_address: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
  } | null;
  order_items: OrderItem[];
  shipments: Shipment[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const shipmentStatusSteps = [
  { key: "preparing", label: "Preparing", icon: Package },
  { key: "dispatched", label: "Dispatched", icon: Truck },
  { key: "in_transit", label: "In Transit", icon: MapPin },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login", { state: { from: "/orders" } });
      } else if (event === 'SIGNED_IN') {
        fetchOrders();
      }
    });

    // Then check current session
    const checkAuthAndFetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login", { state: { from: "/orders" } });
        return;
      }

      await fetchOrders();
    };

    checkAuthAndFetchOrders();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*),
          shipments (*)
        `)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData as Order[]);
    } catch (error: any) {
      toast({
        title: "Error loading orders",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const downloadInvoice = async (order: Order) => {
    setDownloadingInvoice(order.id);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to download invoices",
          variant: "destructive",
        });
        return;
      }

      const response = await supabase.functions.invoke("generate-invoice", {
        body: { orderId: order.id },
      });

      if (response.error) throw response.error;

      // Create a blob from the PDF data and download it
      const { pdfBase64, fileName } = response.data;
      const binaryString = atob(pdfBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/pdf" });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || `invoice-${order.order_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Invoice downloaded",
        description: `Invoice for ${order.order_number} has been downloaded`,
      });
    } catch (error: any) {
      toast({
        title: "Error downloading invoice",
        description: error.message || "Failed to download invoice",
        variant: "destructive",
      });
    } finally {
      setDownloadingInvoice(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getShipmentProgress = (status: Shipment["status"]) => {
    const statusIndex = shipmentStatusSteps.findIndex((s) => s.key === status);
    return statusIndex;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={sierraLogo} alt="Sierra Aerospace" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">Cart</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <h1 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
          <Package className="text-accent" />
          Order History
        </h1>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border p-12 text-center"
          >
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <Button variant="gold" asChild>
              <Link to="/#products">Browse Products</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-border overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-semibold text-lg">{order.order_number}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-lg">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.order_items.length} item{order.order_items.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      {expandedOrders.has(order.id) ? (
                        <ChevronUp className="text-muted-foreground" />
                      ) : (
                        <ChevronDown className="text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expected Delivery */}
                  {order.expected_delivery && order.status !== "delivered" && order.status !== "cancelled" && (
                    <div className="flex items-center gap-2 mt-4 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">Expected Delivery:</span>
                      <span className="font-medium">{formatDate(order.expected_delivery)}</span>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedOrders.has(order.id) && (
                  <div className="border-t border-border">
                    {/* Order Items */}
                    <div className="p-6">
                      <h4 className="font-medium mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-secondary rounded">
                            {item.product_image && (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium">{item.product_name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.unit_price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-medium">₹{item.total_price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="mt-4 pt-4 border-t border-border space-y-2 max-w-xs ml-auto">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>₹{order.shipping_cost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>₹{order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t border-border">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Shipment Tracking */}
                    {order.shipments.length > 0 && (
                      <div className="p-6 border-t border-border bg-secondary/30">
                        <h4 className="font-medium mb-4 flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          Shipment Status
                        </h4>
                        {order.shipments.map((shipment) => (
                          <div key={shipment.id} className="space-y-4">
                            {/* Tracking Info */}
                            {shipment.tracking_number && (
                              <div className="flex flex-wrap items-center gap-4 text-sm">
                                <span className="text-muted-foreground">Tracking Number:</span>
                                <span className="font-mono font-medium">{shipment.tracking_number}</span>
                                {shipment.carrier && (
                                  <>
                                    <span className="text-muted-foreground">via</span>
                                    <span className="font-medium">{shipment.carrier}</span>
                                  </>
                                )}
                                {shipment.tracking_url && (
                                  <a
                                    href={shipment.tracking_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline"
                                  >
                                    Track Package →
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Status Progress */}
                            <div className="flex items-center justify-between mt-4">
                              {shipmentStatusSteps.map((step, stepIndex) => {
                                const currentProgress = getShipmentProgress(shipment.status);
                                const isCompleted = stepIndex <= currentProgress;
                                const isCurrent = stepIndex === currentProgress;
                                const StepIcon = step.icon;

                                return (
                                  <div key={step.key} className="flex flex-col items-center flex-1">
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isCompleted
                                          ? "bg-accent text-accent-foreground"
                                          : "bg-muted text-muted-foreground"
                                      } ${isCurrent ? "ring-2 ring-accent ring-offset-2" : ""}`}
                                    >
                                      <StepIcon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-xs mt-2 text-center ${
                                      isCompleted ? "text-foreground font-medium" : "text-muted-foreground"
                                    }`}>
                                      {step.label}
                                    </span>
                                    {stepIndex < shipmentStatusSteps.length - 1 && (
                                      <div className="absolute w-full h-0.5 bg-muted top-5 left-1/2 -z-10" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Delivery Dates */}
                            <div className="flex flex-wrap gap-6 mt-4 text-sm">
                              {shipment.shipped_at && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Shipped:</span>
                                  <span>{formatDate(shipment.shipped_at)}</span>
                                </div>
                              )}
                              {shipment.estimated_delivery && shipment.status !== "delivered" && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Est. Delivery:</span>
                                  <span className="font-medium text-accent">{formatDate(shipment.estimated_delivery)}</span>
                                </div>
                              )}
                              {shipment.delivered_at && (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span className="text-muted-foreground">Delivered:</span>
                                  <span className="text-green-600 font-medium">{formatDate(shipment.delivered_at)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="p-6 border-t border-border flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadInvoice(order);
                        }}
                        disabled={downloadingInvoice === order.id}
                      >
                        {downloadingInvoice === order.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download Invoice
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`mailto:support@sierraaerospace.in?subject=Order ${order.order_number}`}>
                          <FileText className="w-4 h-4 mr-2" />
                          Contact Support
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
