import http from '../../lib/http';
import { AUTH_CONFIG } from '../../lib/auth/auth-config';

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface TokenVerificationResponse {
  valid: boolean;
  user?: User;
}

// Auth service class with all authentication methods
export class AuthService {
  /**
   * Login with email and password
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await http.post<AuthResponse>(
        AUTH_CONFIG.LOGIN_ENDPOINT,
        credentials
      );
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Register a new user
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await http.post<AuthResponse>(
        AUTH_CONFIG.REGISTER_ENDPOINT,
        userData
      );
      return response.data;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<User> {
    try {
      const response = await http.get<User>(AUTH_CONFIG.PROFILE_ENDPOINT);
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch profile:', error);
      throw new Error(error.message || 'Failed to fetch profile');
    }
  }

  /**
   * Verify token validity
   */
  static async verifyToken(token: string): Promise<TokenVerificationResponse> {
    try {
      const response = await http.post<TokenVerificationResponse>(
        AUTH_CONFIG.VERIFY_ENDPOINT,
        { token }
      );
      return response.data;
    } catch (error: any) {
      console.error('Token verification failed:', error);
      throw new Error(error.message || 'Token verification failed');
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await http.post<AuthResponse>('/auth/refresh');
      return response.data;
    } catch (error: any) {
      console.error('Token refresh failed:', error);
      throw new Error(error.message || 'Token refresh failed');
    }
  }

  /**
   * Logout user (optional API call)
   */
  static async logout(): Promise<void> {
    try {
      await http.post('/auth/logout');
    } catch (error: any) {
      console.error('Logout API call failed:', error);
      // Don't throw error for logout as local cleanup is more important
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: Partial<User>): Promise<User> {
    try {
      const response = await http.patch<User>(
        AUTH_CONFIG.PROFILE_ENDPOINT,
        updates
      );
      return response.data;
    } catch (error: any) {
      console.error('Profile update failed:', error);
      throw new Error(error.message || 'Profile update failed');
    }
  }

  /**
   * Change password
   */
  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await http.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
    } catch (error: any) {
      console.error('Password change failed:', error);
      throw new Error(error.message || 'Password change failed');
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<void> {
    try {
      await http.post('/auth/forgot-password', { email });
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      throw new Error(error.message || 'Password reset request failed');
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await http.post('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error: any) {
      console.error('Password reset failed:', error);
      throw new Error(error.message || 'Password reset failed');
    }
  }

  /**
   * Check if user has specific role
   */
  static hasRole(user: User | null, role: string): boolean {
    return user?.role === role;
  }

  /**
   * Check if user is admin
   */
  static isAdmin(user: User | null): boolean {
    return this.hasRole(user, AUTH_CONFIG.ADMIN_ROLE);
  }

  /**
   * Check if user is active
   */
  static isActiveUser(user: User | null): boolean {
    return user?.isActive === true;
  }
}

// Export default instance
export default AuthService;
