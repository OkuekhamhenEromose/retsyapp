'use client';

import { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SignInFormProps {
  onToggleMode: () => void;
}

const SignInForm = ({ onToggleMode }: SignInFormProps) => {
  const { signIn } = useAuth();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    setStep('password');
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        window.location.href = '/registry/dashboard';
      } else {
        setError(result.error || 'Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'email') {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif mb-2">Sign in</h2>
          <p className="text-gray-600 text-sm">
            Enter your email address to continue
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-etsy-orange focus:outline-none transition-colors"
              required
              autoFocus
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-etsy-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Continue
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-etsy-orange hover:underline font-medium"
            >
              Register
            </button>
          </span>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <button
          type="button"
          onClick={() => setStep('email')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          ← Change email
        </button>
        <h2 className="text-2xl font-serif mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600">
          Signing in as <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-etsy-orange focus:outline-none transition-colors"
            required
            autoFocus
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !password}
        className="w-full bg-etsy-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          'Sign in'
        )}
      </button>

      <div className="text-center">
        <a href="#" className="text-sm text-etsy-orange hover:underline">
          Forgot password?
        </a>
      </div>
    </form>
  );
};

export default SignInForm;