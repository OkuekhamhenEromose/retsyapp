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
}

class AuthService {
  private user: User | null = null;
  private listeners: (() => void)[] = [];

  constructor() {
    // Load user from session on initialization
    this.loadUser();
  }

  private async loadUser() {
    try {
      const token = this.getToken();
      if (token) {
        const user = await this.getProfile();
        if (user && !("error" in user)) {
          this.user = user as User;
          this.notifyListeners();
        }
      }
    } catch (error) {
      console.error("Failed to load user:", error);
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

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  }

  setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  }
  // In auth.ts, update the signIn, register, and updateProfile methods

  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const payload: any = { password: data.password };

      if (data.username) {
        payload.username = data.username;
      } else if (data.email) {
        payload.username = data.email;
      }

      const response = await apiService.fetchData<any>("/users/login/", {
        useCache: false,
        method: "POST",
        body: payload, // No need for JSON.stringify - apiService handles it
      });

      if (response.error) {
        return { error: response.error };
      }

      this.setToken("authenticated");

      const profile = await this.getProfile();
      if (profile && !("error" in profile)) {
        this.user = profile as User;
      }

      this.notifyListeners();

      return {
        Message: response.Message || "Login successful",
        user: this.user || undefined,
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
      const payload = {
        username: data.username || data.email.split("@")[0],
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        fullname: data.fullname,
        gender: data.gender || "",
        phone: data.phone || "",
      };

      const response = await apiService.fetchData<any>("/users/register/", {
        useCache: false,
        method: "POST",
        body: payload,
      });

      if (response.error) {
        return { error: response.error };
      }

      if (data.profile_pix && response.user?.id) {
        await this.uploadProfileImage(response.user.id, data.profile_pix);
      }

      return {
        Message:
          response.Message ||
          "Registration successful! Please check your email.",
      };
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.details) {
        try {
          const details = JSON.parse(error.details);
          const firstError = Object.values(details)[0];
          return {
            error: Array.isArray(firstError)
              ? firstError[0]
              : String(firstError),
          };
        } catch {
          return { error: error.message || "Registration failed" };
        }
      }

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

  async uploadProfileImage(userId: number, file: File): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("profile_pix", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update/`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      return response.ok;
    } catch (error) {
      console.error("Profile image upload failed:", error);
      return false;
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

      // Django's dashboard returns a welcome message
      // You might need to adjust this based on your actual response structure
      return {
        id: response.user?.id || 0,
        username: response.user?.username || "",
        email: response.user?.email || "",
        fullname: response.fullname || response.user?.username || "",
        gender: response.gender || "",
        phone: response.phone || "",
        profile_pix: response.profile_pix || "",
      };
    } catch (error: any) {
      return { error: error.message || "Failed to get profile" };
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.fetchData<any>("/users/logout/", {
        useCache: false,
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.removeToken();
      this.user = null;
      this.notifyListeners();

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken() || !!this.user;
  }

  getUser(): User | null {
    return this.user;
  }

  async checkEmail(
    email: string,
  ): Promise<{ exists: boolean; error?: string }> {
    try {
      // Django doesn't have a built-in email check endpoint
      // You might need to create one or just rely on registration validation
      return { exists: false };
    } catch (error) {
      return { exists: false, error: "Failed to check email" };
    }
  }
}

export const authService = new AuthService();
