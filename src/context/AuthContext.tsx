"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authService, User } from "@/services/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  signIn: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    fullname: string;
    gender?: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | { error: string }>;
  updateProfile: (data: Partial<User>) => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // *** KEY FIX: start false so the app renders immediately.
  //     We silently check auth in the background — no blank screen. ***
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to authService changes (e.g. from other tabs via localStorage)
  useEffect(() => {
    const unsubscribe = authService.subscribe(() =>
      setUser(authService.getUser()),
    );

    // Non-blocking background auth check: only if there's a token.
    // We wrap in a void so we never block rendering.
    void (async () => {
      if (!authService.isAuthenticated()) return;
      setIsLoading(true);
      try {
        const profile = await authService.getProfile();
        if (!("error" in profile)) setUser(profile as User);
      } catch {
        // silently ignore — user stays null (not signed in)
      } finally {
        setIsLoading(false);
      }
    })();

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    try {
      const result = await authService.signIn({ username, password });
      if (result.error) return { success: false, error: result.error };
      if (result.user) setUser(result.user);
      return { success: true };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Sign in failed";
      return { success: false, error: msg };
    }
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      return signIn(email, password);
    },
    [signIn],
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      fullname: string;
      gender?: string;
      phone?: string;
    }) => {
      try {
        const result = await authService.register({
          username: data.email.split("@")[0],
          email: data.email,
          password1: data.password,
          password2: data.password,
          fullname: data.fullname,
          gender: data.gender || "",
          phone: data.phone || "",
        });
        if (result.error) return { success: false, error: result.error };
        return { success: true, message: result.Message };
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : "Registration failed";
        return { success: false, error: msg };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const getProfile = useCallback(async () => {
    return authService.getProfile();
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<User>) => {
      const result = await authService.updateProfile(data);
      if (result?.success && user) setUser({ ...user, ...data });
      return result;
    },
    [user],
  );

  // *** Never return null — always render children immediately ***
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        signIn,
        signInWithEmail,
        register,
        logout,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
