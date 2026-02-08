import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { getSafeRedirectPath, getSafeErrorMessage } from "@/lib/errorUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from state, validate to prevent open redirect
  const rawFrom = (location.state as { from?: string })?.from || "/";
  const from = getSafeRedirectPath(rawFrom, "/");

  // Build the redirect URL for the magic link email
  const magicLinkRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(from)}`;

  // Check if user is already logged in
  useEffect(() => {
    let hasNavigated = false;

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !hasNavigated) {
        hasNavigated = true;
        // Use setTimeout to avoid auth deadlock
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 0);
      }
      if (!session) {
        setCheckingSession(false);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !hasNavigated) {
        hasNavigated = true;
        navigate(from, { replace: true });
      }
      setCheckingSession(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, from]);

  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: magicLinkRedirectTo,
        },
      });

      if (error) throw error;

      setMagicLinkSent(true);
      toast({
        title: "Check your email!",
        description: "We've sent you a magic link to sign in.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: getSafeErrorMessage(error, "Failed to send magic link"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div className="bg-background border border-border p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={sierraLogo} alt="Sierra Aerospace" className="h-16 w-auto" />
          </div>

          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            Welcome
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Enter your email to receive a magic link
          </p>

          {/* Magic Link Sent State */}
          {magicLinkSent ? (
            <div className="text-center space-y-4">
              <div className="bg-accent/10 border border-accent/20 p-6 rounded-lg">
                <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="font-semibold text-lg mb-2">Check your inbox</h2>
                <p className="text-muted-foreground text-sm">
                  We've sent a magic link to <span className="font-medium text-foreground">{email}</span>
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Click the link in the email to sign in.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMagicLinkSent(false);
                  setEmail("");
                }}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* Email Magic Link Form */
            <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <Button type="submit" variant="gold" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Please wait...
                  </>
                ) : (
                  "Send Magic Link"
                )}
              </Button>

              {/* How it works explanation */}
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <h3 className="text-sm font-medium mb-2">How Magic Link works:</h3>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Enter your email above</li>
                  <li>We send a secure, one-time link to your inbox</li>
                  <li>Click the link to instantly sign in</li>
                  <li>No password needed — ever!</li>
                </ol>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
