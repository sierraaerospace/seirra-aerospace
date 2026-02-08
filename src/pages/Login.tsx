import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import sierraLogo from "@/assets/sierra-logo.jpeg";
import { getSafeRedirectPath, getSafeErrorMessage } from "@/lib/errorUtils";

// Google icon component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

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

  // Always complete auth via a single callback route to avoid redirect loops.
  // IMPORTANT: use the *current origin* so custom domain, preview, and published URLs all work.
  const oauthRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(from)}`;

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
          emailRedirectTo: oauthRedirectTo,
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Use the backend OAuth endpoint directly to avoid relying on `/<platform>~oauth/initiate`.
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: oauthRedirectTo,
          queryParams: {
            prompt: "select_account",
          },
        },
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: getSafeErrorMessage(error, "Failed to sign in"),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Sign in failed",
        description: getSafeErrorMessage(err, "An error occurred. Please try again."),
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
            Sign in to view your orders and cart
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-3"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

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
                <label className="block text-sm font-medium mb-2">Email</label>
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
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
