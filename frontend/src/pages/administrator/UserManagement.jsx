import React, { useEffect, useState } from "react";
import { authService } from "../../services/authService"; // Importar el servicio de auth
import api from "../../services/axios"; // Usar la instancia configurada de axios
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import CreateUserModal from "../../components/admin/modals/Users/CreateUserModals/CreateUserModal";
import "../../stylesheets/page.css";
import UpdateUserModal from "../../components/admin/modals/Users/UpdateUserModal/UpdateUserModal";
import DisableUserModal from "../../components/admin/modals/Users/DisableUserModal";
import AssignRoleModal from "../../components/admin/modals/Users/AssignRoleModal";

// Traducción de roles y estado para UI
const roleToEN = (role) => {
  switch (role) {
    case "Administrador":
      return "Admin";
    case "Gerente":
      return "Manager";
    case "Cliente":
      return "Customer";
    default:
      return role;
  }
};

const statusToEN = (estado) =>
  estado === "Activo" ? "Active" : estado === "Inactivo" ? "Inactive" : estado;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      window.location.href = '/login';
      return;
    }
    loadUsers();
  }, []);

  const handleOpenCreateModal = () => setCreateOpen(true);
  const handleCloseCreateModal = () => setCreateOpen(false);
  
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
    setSelectedUserId(user.id);
  };
  
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
    setSelectedUser(null);
  };
  
  const openDisableModal = (user) => {
    setSelectedUser(user);
    setIsDisableOpen(true);
    setSelectedUserId(user.id);
  };
  
  const closeDisableModal = () => {
    setIsDisableOpen(false);
    setSelectedUser(null);
  };
  
  const openAssignRoleModal = (user) => {
    setSelectedUser(user);
    setIsAssignOpen(true);
    setSelectedUserId(user.id);
  };
  
  const closeAssignRoleModal = () => {
    setIsAssignOpen(false);
    setSelectedUser(null);
  };

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar que el usuario esté autenticado
      if (!authService.isAuthenticated()) {
        throw new Error('No authenticated');
      }

      // Usar la instancia de axios configurada que incluye automáticamente el token
      const response = await api.get('/usuario');
      
      const usersFromApi = response.data;
      const formattedUsers = usersFromApi.map((u) => ({
        id: u.usuarioId,
        nombre: u.nombre,
        apellido: u.apellido,
        email: u.email,
        numeroTelefono: u.numeroTelefono,
        cedula: u.cedula,
        genero: u.genero,
        fechaNacimiento: u.fechaNacimiento,
        estado: u.estado,
        fechaCreacion: u.fechaCreacion,
        ultimoAcceso: u.ultimoAcceso,
        rol: u.rolUsuario,
      }));
      
      setUsers(formattedUsers);
    } catch (err) {
      console.error("Error loading users:", err);
      
      // Manejo específico de errores
      if (err.response?.status === 401) {
        // Token expirado o inválido - el interceptor ya maneja esto
        setError("Session expired. Please login again.");
        authService.logout();
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view users.");
      } else if (err.message === 'No authenticated') {
        setError("Please login to continue.");
        authService.logout();
      } else {
        setError("Error loading users. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await loadUsers();
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again.");
    }
  };

  const handleDisableUser = async (userWithReason) => {
    try {
      await loadUsers();
      closeDisableModal();
    } catch (error) {
      console.error("Error disabling user:", error);
      setError("Error disabling user. Please try again.");
    }
  };

  const handleAssignRole = async (newRole) => {
    try {
      await loadUsers();
      closeAssignRoleModal();
    } catch (error) {
      console.error("Error assigning role:", error);
      setError("Error assigning role. Please try again.");
    }
  };

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("en-GB") : "-";

  const genderDisplay = (g) =>
    g === "M" ? "Male" : g === "F" ? "Female" : "Other";

  // Función para refrescar la lista de usuarios
  const handleRefresh = () => {
    loadUsers();
  };

  return (
    <div className="admin-page h-full flex flex-col">
      <Topbar title="User Management">
        <TopControls
          module="user"
          onCreate={handleOpenCreateModal}
          onUpdate={() => selectedUser && openUpdateModal(selectedUser)}
          onDisable={() => selectedUser && openDisableModal(selectedUser)}
          onAssign={() => selectedUser && openAssignRoleModal(selectedUser)}
          onRefresh={handleRefresh} // Agregar botón de refresh si existe
        />
      </Topbar>

      <CreateUserModal 
        isOpen={isCreateOpen} 
        toggle={handleCloseCreateModal} 
        onUserCreated={loadUsers} 
      />
      <UpdateUserModal
        isOpen={isUpdateOpen}
        toggle={closeUpdateModal}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
      <DisableUserModal
        isOpen={isDisableOpen}
        toggle={closeDisableModal}
        user={selectedUser}
        onDisable={handleDisableUser}
      />
      <AssignRoleModal
        isOpen={isAssignOpen}
        toggle={closeAssignRoleModal}
        user={selectedUser}
        onAssign={handleAssignRole}
      />

      <div className="admin-content h-full flex-1 p-0">
        <div className="overflow-x-auto h-full w-full min-h-[70vh] py-8 px-10">
          {isLoading ? (
            <div className="text-center text-gray-500 py-4">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                Loading users...
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                  <span className="material-icons">error</span>
                  <span className="font-semibold">Error</span>
                </div>
                <p className="text-red-600 text-sm">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 min-w-[900px]">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">User</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">Contact</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">ID Number</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">Gender</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">Birthdate</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">Role</th>
                  <th className="px-3 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedUserId(user.id);
                    }}
                    className={`cursor-pointer transition ${selectedUserId === user.id ? "bg-purple-100 ring-2 ring-purple-300" : idx % 2 === 1 ? "bg-gray-50" : ""} hover:bg-purple-50`}
                  >
                    <td className="py-4 px-3 whitespace-nowrap font-semibold flex items-center gap-2">
                      <span className="inline-block rounded-full bg-gray-200 p-2">
                        <svg width="28" height="28" fill="none">
                          <circle cx="14" cy="14" r="12" stroke="#888" strokeWidth="2" />
                          <circle cx="14" cy="12" r="5" stroke="#888" strokeWidth="2" />
                          <ellipse cx="14" cy="19" rx="7" ry="4" stroke="#888" strokeWidth="2" />
                        </svg>
                      </span>
                      <div>
                        <span className="font-bold">{user.nombre} {user.apellido}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-gray-800 text-sm">
                          <span className="material-icons text-base text-gray-500">mail</span>
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1 text-gray-800 text-sm">
                          <span className="material-icons text-base text-gray-500">phone</span>
                          {user.numeroTelefono}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{user.cedula}</td>
                    <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{genderDisplay(user.genero)}</td>
                    <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{formatDate(user.fechaNacimiento)}</td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
                        {roleToEN(user.rol?.nombre)}
                      </span>
                    </td>
                    <td className="py-4 px-3 whitespace-nowrap">
                      <span className={`px-4 py-1 rounded-full font-bold text-sm ${statusToEN(user.estado) === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {statusToEN(user.estado)}
                      </span>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && !isLoading && !error && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-icons text-4xl text-gray-300">people_outline</span>
                        <span>No users found.</span>
                        <button 
                          onClick={handleRefresh}
                          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          Refresh
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;