import axios from 'axios';

// Crear instancia de Axios con la URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL del backend
});

// Servicio de autenticación
export const authService = {
  // Login
  login: async (cedula, password) => {
    try {
      console.log('Login URL:', 'http://localhost:8080/api/auth/login');
      console.log('Usuario URL:', `http://localhost:8080/api/usuario/cedula/${cedula}`);

      const response = await api.post('/auth/login', {
        cedula,
        password,
      });

      // El token viene directamente como string según tu controller
      const token = response.data;

      // Guardar token en localStorage
      localStorage.setItem('token', token);

      // Obtener información del usuario para redireccionar según rol
      const usuarioRes = await api.get(`/usuario/cedula/${cedula}`);
      const usuario = usuarioRes.data;

      // Guardar información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(usuario));

      // Return token and user for component to handle navigation
      return { success: true, token, usuario };
    } catch (error) {
      console.log('Error completo:', error); // Para debug

      // Manejo específico para error 401 (credenciales inválidas)
      if (error.response?.status === 401) {
        const errorMessage = error.response.data || 'Credenciales inválidas';
        return {
          success: false,
          error: errorMessage,
        };
      }

      // Otros errores
      const errorMessage = error.response?.data || 'Error de conexión con el servidor';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Register
  register: async (usuarioData) => {
    try {
      const response = await api.post('/auth/register', usuarioData);
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      const errorMessage = error.response?.data || 'Error en el servidor';
      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Obtener token actual
  getToken: () => {
    return localStorage.getItem('token');
  },
};