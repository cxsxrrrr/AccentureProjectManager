import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL del backend SIEMPRE
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token automáticamente a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró (401 o 403), limpiar sesión y redirigir al login
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('roleName');
      window.dispatchEvent(new Event('authChange'));
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;