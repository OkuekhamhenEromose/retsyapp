// services/auth.ts
import { apiService } from "./api";

export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
  fullname: string;
  gender?: string;
  phone?: string;
  profile_pix?: File | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullname: string;
  gender?: string;
  phone?: string;
  profile_pix?: string;
}

export interface AuthResponse {
  Message?: string;
  error?: string;
  data?: any;
  user?: User;
  access?: string;
  refresh?: string;
}

class AuthTokenManager {
  private static instance: AuthTokenManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  static getInstance(): AuthTokenManager {
    if (!AuthTokenManager.instance) {
      AuthTokenManager.instance = new AuthTokenManager();
    }
    return AuthTokenManager.instance;
  }

  setTokens(access: string, refresh: string) {
    this.accessToken = access;
    this.refreshToken = refresh;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
    }
  }

  getAccessToken(): string | null {
    if (this.accessToken) return this.accessToken;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (this.refreshToken) return this.refreshToken;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }
}

class AuthService {
  private user: User | null = null;
  private listeners: (() => void)[] = [];
  private tokenManager = AuthTokenManager.getInstance();

  constructor() {
    this.loadUser();
  }

  private async loadUser() {
    const token = this.tokenManager.getAccessToken();
    if (token) {
      const user = await this.getProfile();
      if (user && !("error" in user)) {
        this.user = user as User;
        this.notifyListeners();
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const response = await apiService.fetchData<any>("/users/login/", {
        useCache: false,
        method: "POST",
        body: data,
      });

      if (response.error) {
        return { error: response.error };
      }
      
      // Store tokens
      if (response.access && response.refresh) {
        this.tokenManager.setTokens(response.access, response.refresh);
      }
      
      this.user = response.user;
      this.notifyListeners();

      return {
        Message: response.message || "Login successful",
        user: response.user,
        access: response.access,
        refresh: response.refresh,
      };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return {
        error: error.message || "Login failed. Please check your credentials.",
      };
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.fetchData<any>("/users/register/", {
        useCache: false,
        method: "POST",
        body: data,
      });
      
      if (response.error) {
        return { error: response.error };
      }
      
      // Store tokens on registration
      if (response.access && response.refresh) {
        this.tokenManager.setTokens(response.access, response.refresh);
        this.user = response.user;
        this.notifyListeners();
      }
      
      return {
        Message: response.message || "Registration successful! Please check your email.",
        user: response.user,
        access: response.access,
        refresh: response.refresh,
      };
    } catch (error: any) {
      return { error: error.message || "Registration failed" };
    }
  }

  async updateProfile(profileData: Partial<User>): Promise<any> {
    try {
      const response = await apiService.fetchData<any>("/users/update/", {
        useCache: false,
        method: "PUT",
        body: profileData,
      });

      if (response.error) {
        return { error: response.error };
      }

      if (this.user) {
        this.user = { ...this.user, ...profileData };
        this.notifyListeners();
      }

      return { success: true, data: response };
    } catch (error: any) {
      return { error: error.message || "Failed to update profile" };
    }
  }

  async getProfile(): Promise<User | { error: string }> {
    try {
      const response = await apiService.fetchData<any>("/users/dashboard/", {
        useCache: false,
      });

      if (response.error) {
        return { error: response.error };
      }

      return response.user;
    } catch (error: any) {
      return { error: error.message || "Failed to get profile" };
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = this.tokenManager.getRefreshToken();
      await apiService.fetchData<any>("/users/logout/", {
        useCache: false,
        method: "POST",
        body: { refresh: refreshToken },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.tokenManager.clearTokens();
      this.user = null;
      this.notifyListeners();

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.tokenManager.getAccessToken();
  }

  getUser(): User | null {
    return this.user;
  }

  async checkEmail(email: string): Promise<{ exists: boolean; error?: string }> {
    try {
      // Django doesn't have a built-in email check endpoint
      return { exists: false };
    } catch (error) {
      return { exists: false, error: "Failed to check email" };
    }
  }
}

export const authService = new AuthService();