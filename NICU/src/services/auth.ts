import { invoke } from '@tauri-apps/api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  role: 'admin' | 'doctor' | 'nurse';
  permissions: string[];
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user_data';

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await invoke('login', credentials);
      const authData = response as AuthResponse;
      
      localStorage.setItem(this.TOKEN_KEY, authData.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(authData.user));
      
      return authData;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await invoke('logout');
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static async validateToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await invoke('validate_token', { token });
      return response as boolean;
    } catch {
      return false;
    }
  }

  static hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) || false;
  }

  static async refreshToken(): Promise<string | null> {
    try {
      const response = await invoke('refresh_token');
      const newToken = response as string;
      localStorage.setItem(this.TOKEN_KEY, newToken);
      return newToken;
    } catch {
      return null;
    }
  }
}

export default AuthService;