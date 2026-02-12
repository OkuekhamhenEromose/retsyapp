'use client';

import { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(email, password, fullname);
      
      if (result.success) {
        alert('Registration successful! Please check your email to verify your account.');
        onToggleMode();
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif mb-2">Create an account</h2>
        <p className="text-gray-600 text-sm">
          Join Etsy Registry to create and manage your wishlists
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
            Full name (optional)
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-etsy-orange focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address <span className="text-red-500">*</span>
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
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-etsy-orange focus:outline-none transition-colors"
              required
              minLength={8}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-etsy-orange focus:outline-none transition-colors"
              required
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-xs text-gray-600">
          By creating an account, you agree to Etsy's{' '}
          <a href="#" className="text-etsy-orange hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-etsy-orange hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password || !confirmPassword}
        className="w-full bg-etsy-orange hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          'Create account'
        )}
      </button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-etsy-orange hover:underline font-medium"
          >
            Sign in
          </button>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;