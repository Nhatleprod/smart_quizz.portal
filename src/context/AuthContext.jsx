import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to update auth state
  const updateAuthState = useCallback(() => {
    try {
      const userInfo = authService.getCurrentUser();
      const authenticated = authService.isAuthenticated();
      
      console.log('Auth State Update:', { 
        userInfo, 
        authenticated,
        hasUser: !!userInfo,
        hasToken: !!localStorage.getItem('auth'),
        userId: userInfo?.id,
        username: userInfo?.username
      });
      
      // Update state only if both user and auth are valid
      if (authenticated && userInfo && userInfo.id && userInfo.username) {
        setUser(userInfo);
        setIsAuthenticated(true);
      } else {
        // Clear state if either is invalid
        setUser(null);
        setIsAuthenticated(false);
        // Clear invalid auth data
        if (localStorage.getItem('auth')) {
          console.log('Clearing invalid auth data');
          localStorage.removeItem('auth');
        }
      }
    } catch (error) {
      console.error('Error updating auth state:', error);
      setUser(null);
      setIsAuthenticated(false);
      // Clear any potentially corrupted auth data
      localStorage.removeItem('auth');
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
      console.log('Login Response:', response);

      // Get fresh auth state
      const userInfo = authService.getCurrentUser();
      const authenticated = authService.isAuthenticated();
      
      console.log('Post-login auth state:', { 
        userInfo, 
        authenticated,
        hasUser: !!userInfo,
        hasToken: !!localStorage.getItem('auth')
      });

      // Verify auth state
      if (!authenticated || !userInfo) {
        throw new Error('Login succeeded but auth state is invalid');
      }

      // Update state
      setUser(userInfo);
      setIsAuthenticated(true);

      // Verify state update
      console.log('Auth state after update:', {
        user: userInfo,
        isAuthenticated: true,
        hasUser: !!userInfo,
        userId: userInfo.id,
        username: userInfo.username
      });

      return response;
    } catch (error) {
      console.error('Login Error:', error);
      // Ensure state is cleared on error
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
      // Always clear state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (resetToken, newPassword) => {
    try {
      const response = await authService.resetPassword(resetToken, newPassword);
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

  // Debug log for context value
  console.log('Auth Context Value:', {
    user,
    isAuthenticated,
    hasUser: !!user,
    loading
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
