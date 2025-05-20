import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { getStoredTokens, getUserFromToken, isTokenExpired } from '../utils/tokenUtils';

// Create and export the context
export const AuthContext = createContext(null);

// Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to update auth state
  const updateAuthState = useCallback(() => {
    try {
      const tokens = getStoredTokens();
      if (!tokens?.accessToken) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(tokens.accessToken)) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // Get user info from token
      const userInfo = getUserFromToken(tokens.accessToken);
      if (!userInfo) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error updating auth state:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Check auth state on mount and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      updateAuthState();
      setLoading(false);
    };

    // Check immediately
    checkAuth();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'auth') {
        console.log('Storage changed:', e);
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateAuthState]);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      // Clear any existing auth state
      setUser(null);
      setIsAuthenticated(false);
      
      // Attempt login
      const response = await authService.login(credentials);
      
      // Update auth state
      updateAuthState();
      
      return response;
    } catch (error) {
      console.error('Login Error:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const forgotPassword = async (emailOrUsername) => {
    try {
      const response = await authService.forgotPassword(emailOrUsername);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (accountId, newPassword, confirmNewPassword) => {
    try {
      const response = await authService.resetPassword(accountId, newPassword, confirmNewPassword);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      if (!user?.id) throw new Error('User not authenticated');
      const response = await authService.changePassword(user.id, oldPassword, newPassword);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
