import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getSafeRedirectPath } from "@/lib/errorUtils";

/**
 * Handles OAuth PKCE callback codes even when the provider redirects back to a route
 * other than our dedicated callback page.
 */
export function useAuthCodeExchange() {
  const location = useLocation();
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    // Prevent double-run in React StrictMode/dev.
    if (ranRef.current) return;
    ranRef.current = true;

    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    // Some providers return error params instead of code.
    const error = params.get("error") || params.get("error_code");

    if (!code && !error) return;

    (async () => {
      try {
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
            window.location.href
          );
          if (exchangeError) {
            // Avoid leaking details; just send user back to login.
            navigate("/login", { replace: true });
            return;
          }
        }

        const rawNext = params.get("next");
        const next = getSafeRedirectPath(rawNext, "");

        // Remove auth params from the URL.
        // If a safe next exists, go there; otherwise keep same pathname without query.
        if (next) {
          navigate(next, { replace: true });
        } else {
          navigate(location.pathname, { replace: true });
        }
      } catch {
        navigate("/login", { replace: true });
      }
    })();
  }, [location.pathname, location.search, navigate]);
}
