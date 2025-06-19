// API Configuration
export const API_BASE_URL = 'https://api-affinity-preprod-1019068528267.europe-west4.run.app'; // Update with your backend URL

// API Endpoints
export const API_ENDPOINTS = {
  DUPLICATES_SCAN: '/api-duplicates-scan',
};

// Similarity Categories
export const SIMILARITY_CATEGORIES = {
  HIGH: { label: 'High Similarity', range: '≥95%', color: '#ef4444', threshold: 95 },
  MEDIUM: { label: 'Medium Similarity', range: '85–94%', color: '#f97316', threshold: 85 },
  LOW: { label: 'Low Similarity', range: '<85%', color: '#eab308', threshold: 50 },
  NONE: { label: 'Non-Priority', range: '<50%', color: '#6b7280', threshold: 0 }
};

// Category Colors for Charts
export const CATEGORY_COLORS = {
  'Authentication': '#3b82f6',
  'User Management': '#8b5cf6',
  'Payment': '#10b981',
  'Testing': '#f59e0b',
  'Content Management': '#ef4444',
  'Order Management': '#06b6d4',
  'All Categories': '#6b7280'
};

// Looker Studio Embed URL
export const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/1395c73f-e27d-44db-99a4-88e1344147e8/page/H7sNF";

// UI Constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 12,
  DEBOUNCE_DELAY: 300,
  LOADING_TIMEOUT: 30000
};