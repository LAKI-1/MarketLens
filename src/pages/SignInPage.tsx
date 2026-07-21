import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import FormField, { Input } from '../components/registration/ui/FormField';
import SocialAuthButton from '../components/registration/ui/SocialAuthButton';
import { supabase } from '../lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        const message = authError.message.includes('rate limit')
          ? 'Too many sign-in attempts. Please wait a few minutes and try again.'
          : authError.message;
        setError(message);
        return;
      }

      if (authData?.user) {
        // Query to see if the user has an existing business
        const { data: busData, error: busError } = await supabase
          .from('businesses')
          .select('id')
          .eq('owner_id', authData.user.id);

        if (busError) {
          setError(busError.message);
          return;
        }

        if (busData && busData.length > 0) {
          navigate('/dashboard');
        } else {
          // If no business profile registered yet, direct them to complete the onboarding
          navigate('/register', { state: { email, ownerId: authData.user.id } });
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential: string, rawNonce?: string) => {
    setError(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credential,
        ...(rawNonce ? { nonce: rawNonce } : {}),
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData?.user) {
        const { data: busData, error: busError } = await supabase
          .from('businesses')
          .select('id')
          .eq('owner_id', authData.user.id);

        if (busError) {
          setError(busError.message);
          return;
        }

        if (busData && busData.length > 0) {
          navigate('/dashboard');
        } else {
          navigate('/register', { state: { email: authData.user.email, ownerId: authData.user.id } });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-brand-border h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/images/MarketLens.png" alt="MarketLens" className="h-9 w-auto object-contain" />
          <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Growth OS
          </span>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 md:p-8 items-center justify-center">
        <div className="w-full max-w-md bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-ink">Welcome Back</h1>
            <p className="text-brand-neutral text-sm">
              Sign in to manage your AI Growth calibrations
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl flex items-center gap-2.5">
              <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <SocialAuthButton provider="google" onGoogleCredential={handleGoogleCredential} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-brand-border" />
            <span className="text-xs text-brand-neutral font-medium uppercase tracking-wide">or enter credentials</span>
            <div className="flex-1 h-px bg-brand-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            <FormField label="Email Address">
              <Input
                icon={<Mail className="w-4 h-4" />}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormField>

            <FormField label="Password">
              <div className="relative">
                <Input
                  icon={<Lock className="w-4 h-4" />}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-neutral/40 hover:text-brand-neutral transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </FormField>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-brand-neutral font-medium select-none">
                <input type="checkbox" className="rounded border-brand-border text-primary focus:ring-primary/20 w-4 h-4" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline font-semibold">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white text-sm font-bold py-3.5 rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Link to Registration */}
          <div className="mt-8 text-center">
            <p className="text-xs text-brand-neutral leading-relaxed">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-primary hover:underline font-bold"
              >
                Get Started
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
