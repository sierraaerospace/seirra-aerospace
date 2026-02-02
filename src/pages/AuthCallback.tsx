import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          navigate('/', { replace: true });
          return;
        }

        if (session) {
          console.log('Login successful!', session.user.email);
          navigate('/', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Callback error:', err);
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-foreground">Completing sign-in...</p>
        <p className="text-muted-foreground text-sm">Please wait while we log you in.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
