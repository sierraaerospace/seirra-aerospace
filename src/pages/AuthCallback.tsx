import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checking, setChecking] = useState(true);

  const next = useMemo(() => {
    const raw =
      searchParams.get("next") ||
      localStorage.getItem("postAuthRedirect") ||
      "/";
    // Only allow internal redirects.
    return raw.startsWith("/") ? raw : "/orders";
  }, [searchParams]);

  useEffect(() => {
    let hasRedirected = false;

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

    return () => subscription.unsubscribe();
  }, [navigate, next]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      {checking ? (
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      ) : (
        <div className="text-muted-foreground text-sm">Finishing sign-in…</div>
      )}
    </div>
  );
};

export default AuthCallback;
