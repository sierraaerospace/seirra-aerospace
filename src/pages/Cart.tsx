import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Redirect to login with cart as the return destination
    navigate("/login", { state: { from: "/cart" } });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="font-heading text-3xl font-bold mb-8 flex items-center gap-3">
              <ShoppingCart className="text-accent" />
              Your Cart
            </h1>

            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background border border-border p-12 text-center"
              >
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-heading text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Browse our products and add items to your cart.</p>
                <Button variant="gold" asChild>
                  <Link to="/#products">Browse Products</Link>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background border border-border p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold">{item.product_name}</h3>
                      <p className="text-accent font-medium">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-background border border-border p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Button 
                variant="gold" 
                className="w-full" 
                disabled={cartItems.length === 0}
                onClick={handleBuyNow}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                You'll be asked to login to complete your purchase
              </p>
            </div>

            {/* Past Orders */}
            <div className="bg-background border border-border p-6 mt-6">
              <h2 className="font-heading text-xl font-semibold mb-4">Order History</h2>
              <p className="text-muted-foreground text-sm">View your past orders, track shipments, and download invoices.</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link to="/orders">View Order History</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
