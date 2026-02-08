import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getSafeRedirectPath } from "@/lib/errorUtils";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"working" | "error">("working");

  useEffect(() => {
    let cancelled = false;

    const finish = (next: string) => {
      if (cancelled) return;
      navigate(next, { replace: true });
    };

    const redirectToLogin = () => finish("/login");

    const resolveNextPath = () => {
      const rawNext = searchParams.get("next") || "/";
      return getSafeRedirectPath(rawNext, "/");
    };

    const waitForSession = async () => {
      // When arriving from a magic link, tokens are in the URL hash.
      // The auth client auto-detects them on initialize and emits SIGNED_IN.
      // In SPAs, that can take a brief moment, so we wait/poll before declaring failure.
      for (let i = 0; i < 15; i++) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled) return null;
        if (session) return session;

        await new Promise((r) => setTimeout(r, 200));
      }
      return null;
    };

    const handleCallback = async () => {
      try {
        // Also listen for SIGNED_IN to react as soon as auth initializes.
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          if (cancelled) return;
          if (event === "SIGNED_IN" && session) {
            // Clear hash quickly to avoid leaving tokens in the address bar.
            if (window.location.hash) window.location.hash = "";
            // Continue flow in the main async handler.
          }
        });

        const session = await waitForSession();
        subscription.unsubscribe();

        if (!session) {
          redirectToLogin();
          return;
        }

        // Clear hash quickly to avoid leaving tokens in the address bar.
        if (window.location.hash) window.location.hash = "";

        const next = resolveNextPath();

        // If this user doesn't have a display name yet, send them to settings to complete profile.
        const userId = session.user.id;
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", userId)
          .maybeSingle();

        const needsName =
          !profile ||
          !!profileError ||
          !profile.display_name ||
          profile.display_name.trim().length === 0;

        if (needsName) {
          // Ensure a profile row exists so Settings can upsert cleanly.
          if (!profile && (!profileError || profileError.code === "PGRST116")) {
            await supabase.from("profiles").insert({ user_id: userId, display_name: "" });
          }
          finish("/settings");
          return;
        }

        finish(next);
      } catch (err) {
        console.error("Callback exception:", err);
        if (!cancelled) setStatus("error");
      }
    };

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [location.hash, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4" />
        <p className="text-foreground">
          {status === "working" ? "Completing sign-in..." : "Sign-in failed"}
        </p>
        <p className="text-muted-foreground text-sm">
          {status === "working"
            ? "Please wait while we log you in."
            : "Please return to login and try again."}
        </p>
        {status === "error" && (
          <button
            type="button"
            className="mt-4 text-sm text-accent underline underline-offset-4"
            onClick={() => navigate("/login", { replace: true })}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
