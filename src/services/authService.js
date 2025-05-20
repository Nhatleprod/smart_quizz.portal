import axios from 'axios';
import { 
  storeTokens, 
  getStoredTokens, 
  clearTokens, 
  getUserFromToken, 
  isTokenExpired 
} from '../utils/tokenUtils';

const API_URL = import.meta.env.VITE_API_URL;

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Chấp nhận status từ 200-499
  }
});

// Interceptor để xử lý lỗi mạng và request
api.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      return Promise.reject(new Error('Không có kết nối internet'));
    }

    const tokens = getStoredTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('Lỗi request:', error);
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Yêu cầu hết thời gian chờ'));
    }
    if (!error.response) {
      return Promise.reject(new Error('Lỗi kết nối - vui lòng kiểm tra kết nối mạng'));
    }
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response và refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Xử lý lỗi mạng
    if (!error.response) {
      if (error.message === 'Không có kết nối internet') {
        return Promise.reject(new Error('Không có kết nối internet - vui lòng kiểm tra mạng'));
      }
      if (error.message === 'Yêu cầu hết thời gian chờ') {
        return Promise.reject(new Error('Yêu cầu hết thời gian chờ - vui lòng thử lại'));
      }
      return Promise.reject(new Error('Lỗi kết nối - vui lòng kiểm tra kết nối mạng'));
    }

    const originalRequest = error.config;

    // Xử lý refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = getStoredTokens();
        if (!tokens?.refreshToken) {
          throw new Error('Không có refresh token');
        }

        const response = await api.post('/accounts/refresh-token', {
          refreshToken: tokens.refreshToken
        });

        const { accessToken } = response.data.data;
        
        storeTokens(accessToken, tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Lỗi refresh token:', refreshError);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    const errorMessage = error.response?.data?.message || error.message || 'Đã xảy ra lỗi';
    return Promise.reject(new Error(errorMessage));
  }
);

const authService = {
  async register(userData) {
    try {
      const response = await api.post('/accounts', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Đăng ký thất bại!' };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/accounts/login', credentials);
      const { data } = response.data;
      
      if (!data || !data.accessToken || !data.refreshToken) {
        throw new Error('Dữ liệu đăng nhập không hợp lệ');
      }
      storeTokens(data.accessToken, data.refreshToken);
      
      return data;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      clearTokens();
      throw error.response?.data || { message: error.message || 'Đăng nhập thất bại' };
    }
  },

  async logout() {
    try {
      clearTokens();
      return true;
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      throw error;
    }
  },

  async forgotPassword(emailOrUsername) {
    try {
      const response = await api.post('/accounts/forgot-password', { 
        email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
        username: !emailOrUsername.includes('@') ? emailOrUsername : undefined
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Không thể xử lý yêu cầu quên mật khẩu' };
    }
  },

  async resetPassword(accountId, newPassword, confirmNewPassword) {
    try {
      const response = await api.post('/accounts/reset-password', {
        id: accountId,
        newPassword,
        confirmNewPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Không thể đặt lại mật khẩu' };
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
      throw error.response?.data || { message: 'Không thể thay đổi mật khẩu' };
    }
  },

  getCurrentUser() {
    const tokens = getStoredTokens();
    if (!tokens?.accessToken) return null;
    
    return getUserFromToken(tokens.accessToken);
  },

  isAuthenticated() {
    const tokens = getStoredTokens();
    if (!tokens?.accessToken) return false;
    
    return !isTokenExpired(tokens.accessToken);
  }
};

export default authService; 