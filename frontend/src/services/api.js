import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API base URL - update this with your computer's IP address for phone testing
// For development on same machine, use localhost
// For phone testing, use your computer's IP address (e.g., 'http://192.168.1.123:3000/api')
const API_BASE_URL = 'https://mummyhelpbackend.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage
      try {
        await AsyncStorage.multiRemove(['authToken', 'userData']);
      } catch (storageError) {
        console.error('Error clearing storage:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API methods
export const authAPI = {
  // Sign up a new user
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Sign in existing user
  signin: async (credentials) => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Storage methods
export const storage = {
  // Save auth data
  saveAuthData: async (token, userData) => {
    try {
      await AsyncStorage.multiSet([
        ['authToken', token],
        ['userData', JSON.stringify(userData)],
      ]);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  },

  // Get auth data
  getAuthData: async () => {
    try {
      const [token, userData] = await AsyncStorage.multiGet([
        'authToken',
        'userData',
      ]);
      return {
        token: token[1],
        userData: userData[1] ? JSON.parse(userData[1]) : null,
      };
    } catch (error) {
      console.error('Error getting auth data:', error);
      return { token: null, userData: null };
    }
  },

  // Clear auth data
  clearAuthData: async () => {
    try {
      await AsyncStorage.multiRemove(['authToken', 'userData']);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  },
};

export default api; 