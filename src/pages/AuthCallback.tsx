 import { useEffect, useState } from "react";
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
 
   useEffect(() => {
     const handleAuthCallback = async () => {
       try {
         // Get redirect destination
         const next = getSafeRedirectPath(
           searchParams.get("next") || localStorage.getItem("postAuthRedirect") || "/",
           "/"
         );
         
         // Get the OAuth code from URL
         const code = searchParams.get("code");
         
         if (!code) {
           setError("No authorization code found. Please try signing in again.");
           setChecking(false);
           return;
         }
 
         // Exchange the code for a session
         const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
         
         if (exchangeError) {
           console.error("Code exchange error:", exchangeError);
           setError("Failed to complete sign-in. Please try again.");
           setChecking(false);
           return;
         }
 
         if (data.session) {
           // Clear the stored redirect path
           localStorage.removeItem("postAuthRedirect");
           
           // Redirect to the target page
           navigate(next, { replace: true });
         } else {
           setError("Session could not be established. Please try signing in again.");
           setChecking(false);
         }
       } catch (err) {
         console.error("Auth callback error:", err);
         setError("An unexpected error occurred. Please try signing in again.");
         setChecking(false);
       }
     };
 
     handleAuthCallback();
   }, [navigate, searchParams]);
 
   return (
     <div className="min-h-screen bg-secondary flex items-center justify-center">
       {checking ? (
         <div className="flex flex-col items-center gap-3">
           <Loader2 className="w-8 h-8 animate-spin text-accent" />
           <div className="text-muted-foreground text-sm">Finishing sign-in…</div>
         </div>
       ) : error ? (
         <div className="w-full max-w-md px-6 text-center space-y-4">
           <div className="text-foreground font-medium">Sign-in didn't finish</div>
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