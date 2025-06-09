import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('pulsecheck_token');
    const storedUser = localStorage.getItem('pulsecheck_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - in real app, this would be an API call
      let mockUser: User;
      
      // Demo account with existing team
      if (email === 'demo@pulsecheck.com') {
        mockUser = {
          id: 'demo-user',
          email,
          name: 'Demo User',
          teamId: 'demo-team-1'
        };
      } else {
        // Regular login - check if user exists and has team
        const existingUser = localStorage.getItem(`user_${email}`);
        if (existingUser) {
          mockUser = JSON.parse(existingUser);
        } else {
          // New user without team
          mockUser = {
            id: 'user-' + Date.now(),
            email,
            name: email.split('@')[0],
            teamId: '' // No team yet
          };
        }
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('pulsecheck_token', mockToken);
      localStorage.setItem('pulsecheck_user', JSON.stringify(mockUser));
      localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));
      
      setUser(mockUser);
      setToken(mockToken);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Mock signup - in real app, this would be an API call
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        teamId: '' // Will be set during onboarding
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('pulsecheck_token', mockToken);
      localStorage.setItem('pulsecheck_user', JSON.stringify(mockUser));
      localStorage.setItem(`user_${email}`, JSON.stringify(mockUser));
      
      setUser(mockUser);
      setToken(mockToken);
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('pulsecheck_token');
    localStorage.removeItem('pulsecheck_user');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};