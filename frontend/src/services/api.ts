import axios from 'axios';

// Create axios instance with base URL and common headers
const api = axios.create({
  baseURL: 'https://admin.donstroyproject.brainsmart.uz/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for adding auth token if available
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Certificate related API calls
export const certificateService = {
  // Get all certificates with optional filters
  getAll: async (filters: { search?: string; category?: string } = {}) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }

    const response = await api.get(`/certificates?${params.toString()}`);
    return response.data;
  },

  // Get single certificate by ID
  getById: async (id: string | number) => {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  },

  // Verify certificate by number
  verify: async (certificateNumber: string) => {
    const response = await api.get(`/certificates/verify/${certificateNumber}`);
    return response.data;
  },

  // Download certificate
  download: async (id: string | number) => {
    const response = await api.get(`/certificates/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
