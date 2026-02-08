import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Mail, Save, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Settings = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login", { state: { from: "/settings" } });
      }
    });

    const fetchUserAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login", { state: { from: "/settings" } });
        return;
      }

      setUser(session.user);

      // Fetch or create profile
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", session.user.id)
        .single();

      if (error && error.code === "PGRST116") {
        // Profile doesn't exist, create one
        await supabase.from("profiles").insert({
          user_id: session.user.id,
          display_name: session.user.user_metadata?.full_name ?? "",
        });
        setDisplayName(session.user.user_metadata?.full_name ?? "");
      } else if (profile) {
        setDisplayName(profile.display_name ?? "");
      }

      setLoading(false);
    };

    fetchUserAndProfile();

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setSaved(false);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          display_name: displayName.trim(),
        }, {
          onConflict: "user_id",
        });

      if (error) throw error;

      setSaved(true);
      toast({
        title: "Settings saved",
        description: "Your profile has been updated successfully.",
      });

      // Reset saved state after 2 seconds
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-2xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border border-border p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your profile and preferences</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className="max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                This name will be displayed across the site
              </p>
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email ?? ""}
                disabled
                className="max-w-md bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed
              </p>
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-border">
              <h3 className="font-medium mb-4">Account Information</h3>
              <div className="grid gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Account ID</span>
                  <span className="font-mono text-xs">{user?.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Sign-in Method</span>
                  <span className="capitalize">
                    {user?.app_metadata?.provider ?? "Email"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Member Since</span>
                  <span>
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 flex justify-end">
              <Button
                variant="gold"
                onClick={handleSave}
                disabled={saving}
                className="min-w-[140px]"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
                    Saving...
                  </span>
                ) : saved ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Saved
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
