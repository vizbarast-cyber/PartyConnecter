import axios from 'axios';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

// Get API URL from app config or environment
const getApiUrl = () => {
  // Priority: Environment variable > App config > Default
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  
  // Try to get from app config (set in app.config.js)
  try {
    const { Constants } = require('expo-constants');
    if (Constants.expoConfig?.extra?.apiUrl) {
      return Constants.expoConfig.extra.apiUrl;
    }
  } catch (e) {
    // Constants might not be available in all contexts
  }
  
  // Fallback: Use __DEV__ for development, production URL for production
  const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';
  return isDev
    ? 'http://localhost:3000/api' 
    : 'https://api.partyconnect.app/api'; // Production API URL - update when backend is deployed
};

const API_BASE_URL = getApiUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
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

// Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      await signOut(auth);
    }
    return Promise.reject(error);
  }
);

