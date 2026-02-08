import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Shield, ArrowLeft, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Profile = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const redirectToLogin = () => {
      navigate("/login", { state: { from: "/profile" } });
    };

    const fetchUserData = async (userId?: string) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (!session) {
        redirectToLogin();
        return;
      }

      const effectiveUserId = userId ?? session.user.id;

      setUser(session.user);

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", effectiveUserId)
        .single();

      if (profile?.display_name) {
        setDisplayName(profile.display_name);
      }

      // Fetch order count
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("user_id", effectiveUserId);

      setOrderCount(count ?? 0);
      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      // Only hard-redirect on explicit sign-out; initial null sessions can be transient.
      if (event === "SIGNED_OUT") {
        redirectToLogin();
        return;
      }

      if (event === "SIGNED_IN" && session) {
        // Defer DB work to avoid auth callback deadlocks.
        setTimeout(() => {
          fetchUserData(session.user.id);
        }, 0);
      }
    });

    fetchUserData();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getInitials = () => {
    if (displayName) {
      return displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() ?? "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={sierraLogo} alt="Sierra Aerospace" className="h-12 w-auto" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-primary/5 border-b border-border p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-accent/20">
                <AvatarImage src={avatarUrl} alt={displayName ?? user?.email ?? "User"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-medium">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="font-heading text-2xl font-bold">
                  {displayName || "Welcome!"}
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {orderCount} Order{orderCount !== 1 ? "s" : ""}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                    {user?.app_metadata?.provider ?? "Email"} Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="font-heading text-lg font-semibold mb-6">Account Details</h2>
            
            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Display Name</p>
                  <p className="font-medium">{displayName || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Sign-in Method</p>
                  <p className="font-medium capitalize">{user?.app_metadata?.provider ?? "Email"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link to="/orders" className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    View Orders
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Edit Settings
                  </Link>
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
