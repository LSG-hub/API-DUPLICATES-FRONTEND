import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error.response?.data || error.message);
    
    if (error.response?.status === 500) {
      throw new Error('Server error occurred. Please try again later.');
    } else if (error.response?.status === 404) {
      throw new Error('API endpoint not found.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
);

// API Functions
export const apiService = {
  /**
   * Scan for API duplicates
   * @returns {Promise<Object>} Response containing categorized duplicate data
   */
  async scanApiDuplicates() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DUPLICATES_SCAN);
      return response.data;
    } catch (error) {
      console.error('[API] Failed to scan duplicates:', error);
      throw error;
    }
  },

  /**
   * Health check for the API
   * @returns {Promise<boolean>} True if API is healthy
   */
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.warn('[API] Health check failed:', error.message);
      return false;
    }
  }
};

export default apiService;