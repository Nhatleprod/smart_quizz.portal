import { jwtDecode } from 'jwt-decode';

/**
 * Decodes and validates a JWT token
 * @param {string} token - The JWT token to decode
 * @returns {Object|null} The decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwtDecode(token);
    
    if (!decoded || !decoded.id || !decoded.username) {
      console.error('Invalid token structure:', decoded);
      return null;
    }

    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role || 'user',
      fullName: decoded.fullName || '',
      avatar: decoded.avatar || '',
      exp: decoded.exp,
      iat: decoded.iat,
      createdAt: decoded.createdAt
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Checks if a token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    const decoded = decodeToken(token);
    if (!decoded) return true;
    
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Gets user info from token
 * @param {string} token - The JWT token
 * @returns {Object|null} User info or null if invalid
 */
export const getUserFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    role: decoded.role,
    fullName: decoded.fullName,
    avatar: decoded.avatar,
    createdAt: decoded.createdAt
  };
};

/**
 * Stores auth tokens in localStorage
 * @param {string} accessToken - The access token
 * @param {string} refreshToken - The refresh token
 */
export const storeTokens = (accessToken, refreshToken) => {
  if (!accessToken || !refreshToken) {
    throw new Error('Both access token and refresh token are required');
  }
  
  const authData = {
    accessToken,
    refreshToken
  };
  
  localStorage.setItem('auth', JSON.stringify(authData));
};

/**
 * Gets stored tokens from localStorage
 * @returns {Object|null} Object containing accessToken and refreshToken or null
 */
export const getStoredTokens = () => {
  try {
    const authData = localStorage.getItem('auth');
    if (!authData) return null;
    
    const { accessToken, refreshToken } = JSON.parse(authData);
    if (!accessToken || !refreshToken) return null;
    
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return null;
  }
};

/**
 * Clears stored tokens from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem('auth');
}; 