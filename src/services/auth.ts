export interface SignInData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password1: string;
  password2: string;
  fullname: string;
  username?: string;
  gender?: string;
  phone?: string;
  profile_pix?: string | null;
}

export interface AuthResponse {
  Message?: string;
  error?: string;
  data?: any;
}

// Mock user for testing
const MOCK_USERS = [
  {
    email: 'test@example.com',
    password: 'password123',
    username: 'test',
    fullname: 'Test User',
  }
];

export const authService = {
  // Mock sign in
  async signIn(data: SignInData): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS.find(u => u.email === data.email && u.password === data.password);
    
    if (user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('username', user.username);
      }
      return { Message: "Login successful" };
    }
    
    return { error: "Invalid email or password" };
  },

  // Mock register
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === data.email);
    if (existingUser) {
      return { error: "Email already registered" };
    }

    // Add new user to mock array
    const username = data.email.split('@')[0];
    MOCK_USERS.push({
      email: data.email,
      password: data.password1,
      username,
      fullname: data.fullname || username,
    });

    return { Message: "Registration successful! Please check your email." };
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  },

  // Get current user email
  getUserEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userEmail');
    }
    return null;
  },

  // Get current username
  getUsername(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  },

  // Mock logout
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username');
    }
  },

  // Mock get profile
  async getProfile(): Promise<any> {
    const email = this.getUserEmail();
    const username = this.getUsername();
    
    if (email && username) {
      return {
        fullname: username,
        email: email,
        username: username,
        gender: 'M',
        phone: '',
      };
    }
    
    return { error: "Not authenticated" };
  },

  // Mock update profile
  async updateProfile(profileData: any): Promise<any> {
    return { success: true, data: profileData };
  },

  // Mock check email
  async checkEmail(email: string): Promise<{ exists: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const exists = MOCK_USERS.some(u => u.email === email);
    return { exists };
  },
};