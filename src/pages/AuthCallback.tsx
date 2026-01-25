import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checking, setChecking] = useState(true);

  const next = useMemo(() => {
    const raw = searchParams.get("next") || "/orders";
    // Only allow internal redirects.
    return raw.startsWith("/") ? raw : "/orders";
  }, [searchParams]);

  useEffect(() => {
    let hasRedirected = false;

    // Listen first
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") && session && !hasRedirected) {
        hasRedirected = true;
        // Avoid any chance of auth callback deadlocks
        setTimeout(() => navigate(next, { replace: true }), 0);
      }
      if (!session) setChecking(false);
    });

    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !hasRedirected) {
        hasRedirected = true;
        navigate(next, { replace: true });
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
