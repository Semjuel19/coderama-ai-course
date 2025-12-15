/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, AuthState } from '@/types/auth';
import { AuthUserSchema } from '@/types/auth';
import { getToken, saveToken, removeToken, generateState, getGitHubAuthUrl, saveState, exchangeCodeForToken } from '@/services/authService';
import axios from 'axios';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  // Fetch user data with token
  const fetchUser = useCallback(async (token: string) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const validatedUser = AuthUserSchema.parse(response.data);
      setUser(validatedUser);
      setAccessToken(token);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      removeToken();
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  // Initialize auth state from storage
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  // Redirect to GitHub OAuth
  const login = useCallback(() => {
    const state = generateState();
    saveState(state);
    window.location.href = getGitHubAuthUrl(state);
  }, []);

  // Handle OAuth callback
  const handleCallback = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const token = await exchangeCodeForToken(code);
      saveToken(token);
      await fetchUser(token);
    } catch (error) {
      console.error('OAuth callback failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUser]);

  // Logout
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
