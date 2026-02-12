'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  username: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, fullname?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  getProfile: () => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setUserEmail(authService.getUserEmail());
      setUsername(authService.getUsername());
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authService.signIn({ email, password });
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      setIsAuthenticated(true);
      setUserEmail(email);
      setUsername(email.split('@')[0]);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign in failed' };
    }
  };

  const register = async (email: string, password: string, fullname?: string) => {
    try {
      const result = await authService.register({
        email,
        password1: password,
        password2: password,
        fullname: fullname || email.split('@')[0],
      });
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
    setUsername(null);
  };

  const getProfile = async () => {
    return await authService.getProfile();
  };

  const updateProfile = async (data: any) => {
    return await authService.updateProfile(data);
  };

  // Don't render children until we've checked authentication status
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      username,
      signIn, 
      register, 
      logout,
      getProfile,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};