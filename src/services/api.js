// src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust based on your storage method
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Authentication API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
};

// Form API calls
export const formAPI = {
  createForm: (formData) => api.post('/forms', formData),
  getForms: () => api.get('/forms'),
  getFormById: (formId) => api.get(`/forms/${formId}`),
  updateForm: (formId, formData) => api.put(`/forms/${formId}`, formData),
  deleteForm: (formId) => api.delete(`/forms/${formId}`),
  submitResponse: (formId, responses) => api.post(`/forms/${formId}/responses`, { answers: responses }),
  getFormResponses: (formId) => api.get(`/forms/${formId}/responses`),
  getFormAnalytics: (formId) => api.get(`/forms/${formId}/analytics`),
  saveProgress: (formId, responses) => api.post(`/forms/${formId}/progress`, { responses }),
  getProgress: (formId) => api.get(`/forms/${formId}/progress`),
  submitResponse: (formId, responses) => api.post(`/forms/${formId}/responses`, { responses }),
};

// Upload API calls
export const uploadAPI = {
  getAuthParams: () => api.get('/uploads/auth'),
  uploadSingle: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/uploads/single', formData);
  },
  uploadMultiple: (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return api.post('/uploads/multiple', formData);
  },
  deleteImage: (fileId) => api.delete(`/uploads/${fileId}`),
};