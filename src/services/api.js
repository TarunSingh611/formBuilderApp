// frontend/src/services/api.js  
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
  const token = localStorage.getItem('token');  
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
      localStorage.removeItem('user');  
      window.location.href = '/login';  
    }  
    return Promise.reject(error.response?.data || error);  
  }  
);  

export const authAPI = {  
  login: (credentials) => api.post('/auth/login', credentials),  
  register: (userData) => api.post('/auth/register', userData),  
  logout: () => api.post('/auth/logout'),  
};  

export const formAPI = {  
  createForm: (formData) => api.post('/forms', formData),  
  getForms: () => api.get('/forms'),  
  getForm: (id) => api.get(`/forms/${id}`),  
  updateForm: (id, formData) => api.put(`/forms/${id}`, formData),  
  deleteForm: (id) => api.delete(`/forms/${id}`),  
  submitResponse: (id, responseData) => api.post(`/forms/${id}/responses`, responseData),  
  getResponses: (id) => api.get(`/forms/${id}/responses`), 
  getFormById: (formId) => api.get(`/forms/${formId}`),
  getFormResponses: (formId) => api.get(`/forms/${formId}/responses`), 
};  

export const uploadAPI = {  
  uploadImage: (file) => {  
    const formData = new FormData();  
    formData.append('image', file);  
    return api.post('/uploads/single', formData, {  
      headers: { 'Content-Type': 'multipart/form-data' },  
    });  
  },  
};  