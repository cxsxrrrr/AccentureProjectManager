import { useState, useEffect } from 'react';

// Hook para obtener el usuario autenticado y su rol desde localStorage
export default function useAuth() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('authChange', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('authChange', handleStorage);
    };
  }, []);

  // Extrae el rol correctamente del objeto anidado
  let role = null;
  if (user?.rol && typeof user.rol === 'object') {
    role = user.rol.rolId ?? user.rol.id;
  } else if (user?.rol) {
    role = Number(user.rol);
  }

  // DEBUG
  console.log('[useAuth] user:', user);
  console.log('[useAuth] role:', role);

  return {
    user,
    isAuthenticated: !!user,
    role,
  };
}
