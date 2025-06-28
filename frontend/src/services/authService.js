import api from './axios';

// Servicio de autenticación
export const authService = {
  // Login
  login: async (cedula, password) => {
    try {
      const response = await api.post('/auth/login', {
        cedula,
        password
      });
      
      // El token viene directamente como string según tu controller
      const token = response.data;
      
      // Guardar token en localStorage
      localStorage.setItem('token', token);
      
      return { success: true, token };
    } catch (error) {
      console.log("Error completo:", error); // Para debug
      
      // Manejo específico para error 401 (credenciales inválidas)
      if (error.response?.status === 401) {
        const errorMessage = error.response.data || 'Credenciales inválidas';
        return { 
          success: false, 
          error: errorMessage 
        };
      }
      
      // Otros errores
      const errorMessage = error.response?.data || 'Error de conexión con el servidor';
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  },

  // Register
  register: async (usuarioData) => {
    try {
      const response = await api.post('/auth/register', usuarioData);
      return { 
        success: true, 
        user: response.data 
      };
    } catch (error) {
      const errorMessage = error.response?.data || 'Error en el servidor';
      return { 
        success: false, 
        error: errorMessage 
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
  }
};