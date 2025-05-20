import axios from 'axios';

// Sử dụng import.meta.env thay vì process.env
const API_URL = import.meta.env.VITE_API_URL;

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem('auth'));
    if (authData?.accessToken) {
      config.headers.Authorization = `Bearer ${authData.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if (!authData?.refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await api.post('/accounts/refresh-token', {
          refreshToken: authData.refreshToken
        });

        const { accessToken } = response.data.data;
        
        // Cập nhật token mới
        const updatedAuth = {
          ...authData,
          accessToken
        };
        localStorage.setItem('auth', JSON.stringify(updatedAuth));

        // Thử lại request ban đầu với token mới
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, logout user
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const authService = {
  async register(userData) {
    try {
      const response = await api.post('/accounts', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/accounts/login', credentials);
      const { data } = response.data;
      
      // Validate response data
      if (!data || !data.accessToken || !data.account) {
        throw new Error('Invalid login response data');
      }

      // Lưu trữ thông tin xác thực và user
      const authData = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn || 3600, // Default 1 hour if not provided
        userInfo: {
          id: data.account.id,
          username: data.account.username,
          email: data.account.email,
          role: data.account.role,
          fullName: data.account.fullName || '',
          avatar: data.account.avatar || ''
        }
      };

      // Validate auth data before storing
      if (!authData.userInfo.id || !authData.userInfo.username) {
        throw new Error('Invalid user data in login response');
      }
      
      // Debug log before storing
      console.log('Preparing to store auth data:', {
        hasToken: !!authData.accessToken,
        hasUserInfo: !!authData.userInfo,
        userId: authData.userInfo.id,
        username: authData.userInfo.username
      });
      
      // Store auth data
      localStorage.setItem('auth', JSON.stringify(authData));
      
      // Verify stored data
      const storedData = JSON.parse(localStorage.getItem('auth'));
      if (!storedData || !storedData.accessToken || !storedData.userInfo) {
        throw new Error('Failed to store auth data properly');
      }

      // Verify authentication state
      const isAuth = this.isAuthenticated();
      const currentUser = this.getCurrentUser();
      
      console.log('Post-login verification:', {
        isAuthenticated: isAuth,
        hasUser: !!currentUser,
        userId: currentUser?.id,
        username: currentUser?.username
      });

      if (!isAuth || !currentUser) {
        throw new Error('Auth state verification failed after login');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      // Clear any partial auth data
      localStorage.removeItem('auth');
      throw error.response?.data || { message: error.message || 'Login failed' };
    }
  },

  async logout() {
    try {
      const authData = JSON.parse(localStorage.getItem('auth'));
      if (authData?.refreshToken) {
        // Cập nhật endpoint logout
        await api.post('/accounts/logout', {
          refreshToken: authData.refreshToken,
          userId: authData.userInfo.id // Thêm userId để server có thể xác định user cần logout
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn xóa auth data ngay cả khi API call thất bại
    } finally {
      localStorage.removeItem('auth');
      // Chuyển hướng về trang login sau khi logout
      window.location.href = '/login';
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/accounts/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to process forgot password request' };
    }
  },

  async resetPassword(resetToken, newPassword) {
    try {
      const response = await api.post('/accounts/reset-password', {
        resetToken,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reset password' };
    }
  },

  async changePassword(accountId, oldPassword, newPassword) {
    try {
      const response = await api.put(`/accounts/${accountId}/password`, {
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  getCurrentUser() {
    try {
      const authData = localStorage.getItem('auth');
      if (!authData) return null;
      
      const parsedData = JSON.parse(authData);
      const { userInfo } = parsedData;

      // Validate user info
      if (!userInfo || !userInfo.id || !userInfo.username) {
        console.error('Invalid user info in storage:', userInfo);
        return null;
      }

      return userInfo;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isAuthenticated() {
    try {
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.log('No auth data found');
        return false;
      }
      
      const parsedData = JSON.parse(authData);
      const { accessToken, userInfo } = parsedData;

      // Debug log
      console.log('Checking authentication:', {
        hasToken: !!accessToken,
        hasUserInfo: !!userInfo,
        userId: userInfo?.id,
        username: userInfo?.username
      });

      // Check both token and user info
      if (!accessToken || !userInfo) {
        console.log('Missing token or user info');
        return false;
      }

      // Validate user info
      if (!userInfo.id || !userInfo.username) {
        console.log('Invalid user info');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Helper method để kiểm tra token có hết hạn chưa
  isTokenExpired() {
    const authData = localStorage.getItem('auth');
    if (!authData) return true;

    const { expiresIn } = JSON.parse(authData);
    if (!expiresIn) return true;

    const expiresAt = expiresIn * 1000;
    return Date.now() >= expiresAt;
  }
};

export default authService; 