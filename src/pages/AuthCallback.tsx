import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSafeRedirectPath } from "@/lib/errorUtils";
import { Button } from "@/components/ui/button";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const next = useMemo(() => {
    const raw =
      searchParams.get("next") ||
      localStorage.getItem("postAuthRedirect") ||
      "/";
    // Prevent open redirect attacks (including protocol-relative URLs like //evil.com)
    // Per current UX, default back to the Home page.
    return getSafeRedirectPath(raw, "/");
  }, [searchParams]);

  useEffect(() => {
    let hasRedirected = false;
    let fallbackTimer: number | null = null;

    // In SPA OAuth flows, the callback URL may include either:
    // - PKCE: ?code=...
    // - Implicit: #access_token=...&refresh_token=...
    // Ensure we exchange/store the session explicitly so onAuthStateChange can fire reliably.
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    // Listen first
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const isSignedInEvent =
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "INITIAL_SESSION";

      if (isSignedInEvent && session && !hasRedirected) {
        hasRedirected = true;
        localStorage.removeItem("postAuthRedirect");
        // Avoid any chance of auth callback deadlocks (defer navigation)
        setTimeout(() => navigate(next, { replace: true }), 0);
        return;
      }

      if (event === "SIGNED_OUT") {
        setChecking(false);
        return;
      }

      if (!session) setChecking(false);
    });

    // Exchange OAuth code / store implicit tokens.
    // IMPORTANT: defer Supabase calls to avoid auth client deadlocks.
    if (code) {
      setTimeout(() => {
        supabase.auth.exchangeCodeForSession(code).catch(() => {
          // onAuthStateChange + getSession fallback will handle UI state
        });
      }, 0);
    } else if (accessToken && refreshToken) {
      setTimeout(() => {
        supabase.auth
          .setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(() => {
            // Clean up URL hash so reloads don't repeat this work
            window.history.replaceState({}, document.title, `${url.pathname}${url.search}`);
          })
          .catch(() => {
            // ignore; getSession fallback will handle
          });
      }, 0);
    }

    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !hasRedirected) {
        hasRedirected = true;
        localStorage.removeItem("postAuthRedirect");
        // Defer navigation to avoid auth deadlocks
        setTimeout(() => navigate(next, { replace: true }), 0);
        return;
      }
      setChecking(false);
    });

    // Hard fallback so we never leave users stuck on this screen.
    fallbackTimer = window.setTimeout(() => {
      if (!hasRedirected) {
        setError("We couldn’t confirm your session. Please try signing in again.");
        setChecking(false);
      }
    }, 10000);

    return () => {
      subscription.unsubscribe();
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [navigate, next]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      {checking ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <div className="text-muted-foreground text-sm">Finishing sign-in…</div>
        </div>
      ) : error ? (
        <div className="w-full max-w-md px-6 text-center space-y-4">
          <div className="text-foreground font-medium">Sign-in didn’t finish</div>
          <div className="text-muted-foreground text-sm">{error}</div>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => navigate("/", { replace: true })}>
              Go to Home
            </Button>
            <Button onClick={() => navigate("/login", { replace: true })}>Try again</Button>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">Redirecting…</div>
      )}
    </div>
  );
};

export default AuthCallback;
