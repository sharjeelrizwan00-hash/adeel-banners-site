import { FormEvent, useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { CustomerUser } from '../data/bannerData';

interface AuthViewProps {
  hasPendingOrder: boolean;
  onAuthSuccess: (token: string, user: CustomerUser) => void;
  onBackToStore: () => void;
}

export function AuthView({
  hasPendingOrder,
  onAuthSuccess,
  onBackToStore,
}: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [gamerTag, setGamerTag] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const endpoint =
      mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload =
      mode === 'login'
        ? { email: email.trim(), password }
        : {
            name: name.trim(),
            gamerTag: gamerTag.trim(),
            email: email.trim(),
            password,
          };

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        token?: string;
        user?: CustomerUser;
        error?: string;
      };

      if (!response.ok || !data.token || !data.user) {
        setError(data.error || 'Authentication failed. Please check your details.');
        return;
      }

      onAuthSuccess(data.token, data.user);
    } catch {
      setError('Network error while connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 lg:py-20 min-h-[calc(100vh-14rem)] flex items-center">
      <div className="max-w-md w-full mx-auto px-6">
        <button
          type="button"
          onClick={onBackToStore}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white mb-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 rounded-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </button>

        <div className="rounded-2xl border border-[#232a3b] bg-[#131722] p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-medium text-slate-400 mb-1.5">
              Customer Portal
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
              {mode === 'login' ? 'Sign in to Adeel Banners' : 'Create Customer Account'}
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {hasPendingOrder
                ? 'Sign in or create a free customer account to submit and track your custom banner order.'
                : 'Sign in to place custom gaming banner orders, request revisions, and track deliveries.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Authentication mode"
            className="grid grid-cols-2 gap-1 p-1 bg-[#0b0e14] border border-[#232a3b] rounded-lg mb-6"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-2 text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer min-h-[40px] ${
                mode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`py-2 text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer min-h-[40px] ${
                mode === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label
                    htmlFor="auth-name"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hamza Raza"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="auth-gamertag"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Gamer Tag / Channel Name
                  </label>
                  <input
                    id="auth-gamertag"
                    type="text"
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    placeholder="e.g. HamzaPlays"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Email Address *
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Password *
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#2d364d] bg-[#0b0e14] text-slate-100 placeholder:text-slate-500 focus:outline-2 focus:outline-blue-500"
              />
            </div>

            {error && (
              <p className="flex items-start gap-2 text-xs text-rose-400 pt-1">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-lg transition-colors duration-150 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 mt-2"
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign In'
                  : 'Create Customer Account'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
