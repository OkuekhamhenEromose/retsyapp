'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-6 pb-6 pt-5">
            <div className="absolute right-4 top-4">
              <button
                onClick={onClose}
                className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {mode === 'signin' ? (
              <SignInForm onToggleMode={() => setMode('register')} />
            ) : (
              <RegisterForm onToggleMode={() => setMode('signin')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;