import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // onAuthStateChange fires AFTER the Supabase client has finished
    // exchanging the PKCE ?code= parameter for a session. Using getSession()
    // directly is a race condition — it can return null before exchange completes.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userId = session.user.id;

          // Check if the user already has a business profile
          const { data: busData, error: busError } = await supabase
            .from('businesses')
            .select('id')
            .eq('owner_id', userId);

          if (busError) {
            setError(busError.message);
            return;
          }

          if (busData && busData.length > 0) {
            navigate('/', { replace: true });
          } else {
            navigate('/register', {
              replace: true,
              state: { email: session.user.email, ownerId: userId },
            });
          }
        } else if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
          setError('Authentication failed. Please try signing in again.');
        }
      }
    );

    // Safety timeout — if nothing fires within 10s, show an error
    const timeout = setTimeout(() => {
      setError('Sign-in timed out. Please try again.');
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="max-w-md w-full mx-auto p-8 bg-white border border-brand-border rounded-3xl shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-ink">Authentication Error</h2>
          <p className="text-sm text-brand-neutral">{error}</p>
          <button
            onClick={() => navigate('/signin')}
            className="w-full bg-primary text-white text-sm font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-semibold text-ink">Completing sign-in...</p>
      </div>
    </div>
  );
}
