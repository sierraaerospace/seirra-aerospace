import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getSafeRedirectPath } from "@/lib/errorUtils";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"working" | "error">("working");

  useEffect(() => {
    let cancelled = false;

    const finish = (next: string) => {
      if (cancelled) return;
      navigate(next, { replace: true });
    };

    const handleCallback = async () => {
      try {
        // If we're coming back from an OAuth provider, the URL contains a `code`.
        // We must exchange it for a session, otherwise `getSession()` can be null.
        const code = searchParams.get("code");

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          if (exchangeError) {
            console.error("Auth exchange error:", exchangeError);
            if (!cancelled) setStatus("error");
            return;
          }
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth getSession error:", error);
          if (!cancelled) setStatus("error");
          return;
        }

        const rawNext = searchParams.get("next") || "/";
        const next = getSafeRedirectPath(rawNext, "/");

        // If session exists, proceed; if not, send user back to login.
        if (data.session) {
          finish(next);
        } else {
          finish("/login");
        }
      } catch (err) {
        console.error("Callback exception:", err);
        if (!cancelled) setStatus("error");
      }
    };

    handleCallback();

    return () => {
      cancelled = true;
    };
  }, [navigate, searchParams]);

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
