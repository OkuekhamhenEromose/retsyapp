'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User } from '@/services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    fullname: string;
    gender?: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | { error: string }>;
  updateProfile: (data: Partial<User>) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth service changes
    const unsubscribe = authService.subscribe(() => {
      setUser(authService.getUser());
    });

    // Check authentication status on mount
    const checkAuth = async () => {
      setIsLoading(true);
      if (authService.isAuthenticated()) {
        const profile = await authService.getProfile();
        if (!('error' in profile)) {
          setUser(profile as User);
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const result = await authService.signIn({ username, password });
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      if (result.user) {
        setUser(result.user);
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Sign in failed' };
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    return signIn(email, password); // Django uses username field, but we can pass email
  };

  const register = async (data: {
    email: string;
    password: string;
    fullname: string;
    gender?: string;
    phone?: string;
  }) => {
    try {
      const result = await authService.register({
        username: data.email.split('@')[0],
        email: data.email,
        password1: data.password,
        password2: data.password,
        fullname: data.fullname,
        gender: data.gender || '',
        phone: data.phone || '',
      });
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      return { success: true, message: result.Message };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const getProfile = async () => {
    return await authService.getProfile();
  };

  const updateProfile = async (data: Partial<User>) => {
    const result = await authService.updateProfile(data);
    return result;
  };

  // Don't render children until we've checked authentication status
  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user,
      user,
      signIn,
      signInWithEmail,
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