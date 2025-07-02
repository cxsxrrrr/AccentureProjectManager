import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// rolesPermitidos: array de roles que pueden acceder a la ruta
const ProtectedRoute = ({ rolesPermitidos }) => {
  const { isAuthenticated, role } = useAuth();

  // DEBUG
  console.log('[ProtectedRoute] isAuthenticated:', isAuthenticated);
  console.log('[ProtectedRoute] role:', role);
  console.log('[ProtectedRoute] rolesPermitidos:', rolesPermitidos);

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] No autenticado, redirigiendo a /');
    return <Navigate to="/" replace />;
  }

  // Permitir acceso a todas las rutas si es admin (rol 1)
  if (role === 1) {
    console.log('[ProtectedRoute] Admin detectado, acceso total');
    return <Outlet />; // comentar esta parte si no se quiere acceso total a admin
  }

  if (!rolesPermitidos.includes(role)) {
    console.log('[ProtectedRoute] Rol no permitido, redirigiendo según rol:', role);
    switch (role) {
      case 1:
        return <Navigate to="/admin" replace />;
      case 2:
        return <Navigate to="/manager" replace />;
      case 3:
        return <Navigate to="/team" replace />;
      case 4:
        return <Navigate to="/client" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Si está autenticado y tiene el rol correcto, renderiza la ruta
  console.log('[ProtectedRoute] Acceso permitido, renderizando ruta');
  return <Outlet />;
};

export default ProtectedRoute;
