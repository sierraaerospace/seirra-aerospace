import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, User, Package, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { UserAvatarDropdown } from "./UserAvatarDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img 
              src={sierraLogo} 
              alt="Sierra Aerospace" 
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-accent transition-colors duration-300 font-medium text-sm tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
            {user ? (
              <UserAvatarDropdown />
            ) : (
              <Button variant="gold" size="default" asChild>
                <Link
                  to="/login"
                  state={{ from: location.pathname + location.search }}
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-accent transition-colors py-2 font-medium text-lg"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-foreground hover:text-accent py-2">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-2 text-foreground hover:text-accent py-2"
                    >
                      <User size={20} />
                      <span>My Profile</span>
                    </Link>
                    <Link 
                      to="/orders" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-2 text-foreground hover:text-accent py-2"
                    >
                      <Package size={20} />
                      <span>Order History</span>
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-2 text-foreground hover:text-accent py-2"
                    >
                      <Settings size={20} />
                      <span>Settings</span>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button variant="gold" className="w-full" asChild>
                    <Link
                      to="/login"
                      state={{ from: location.pathname + location.search }}
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
