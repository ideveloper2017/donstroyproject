import axios from 'axios';

// Create axios instance with base URL and common headers
const api = axios.create({
  // baseURL: 'http://localhost:8000/api',
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
  // Get all certificates with optional filters and pagination
  getAll: async (filters: {
    search?: string;
    category?: string;
    page?: number;
    per_page?: number;
  } = {}) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== '0') {
      params.append('category', filters.category);
    }
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get(`/certificates?${params.toString()}`);
    return {
      data: response.data.data || [],
      meta: response.data.meta || {
        total: response.data.data?.length || 0,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: response.data.data?.length || 0,
        per_page: filters.per_page || 10
      },
      pagination: response.data.meta
    };
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

  // Get all available categories
  getCategories: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
};

export default api;
