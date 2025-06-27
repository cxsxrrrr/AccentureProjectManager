import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import CreateUserModal from "../../components/admin/modals/Users/CreateUserModals/CreateUserModal";
import "../../stylesheets/page.css";
import UpdateUserModal from "../../components/admin/modals/Users/UpdateUserModal/UpdateUserModal";
import DisableUserModal from "../../components/admin/modals/Users/DisableUserModal";
import AssignRoleModal from "../../components/admin/modals/Users/AssignRoleModal";

// Mock users using body fields in Spanish but English UI
const usersMock = [
  {
    id: 1,
    nombre: "Cesar",
    apellido: "Moran",
    email: "cesar.moran@email.com",
    numeroTelefono: "1234567890",
    cedula: 12345678,
    genero: "M",
    fechaNacimiento: "2025-05-19T12:00:00",
    password: "contraseña1",
    estado: "Activo",
    fechaCreacion: "2025-05-03T12:00:00",
    ultimoAcceso: "2025-05-03T12:00:00",
    rol: { rolId: 1, nombre: "Administrador" },
  },
  {
    id: 2,
    nombre: "Luis",
    apellido: "Solarte",
    email: "luis.solarte@email.com",
    numeroTelefono: "1234567899",
    cedula: 87654321,
    genero: "M",
    fechaNacimiento: "2025-06-01T12:00:00",
    password: "contraseña2",
    estado: "Activo",
    fechaCreacion: "2025-05-04T12:00:00",
    ultimoAcceso: "2025-06-25T12:00:00",
    rol: { rolId: 2, nombre: "Gerente" },
  },
  {
    id: 3,
    nombre: "Valentina",
    apellido: "Moran",
    email: "valen.moran@email.com",
    numeroTelefono: "0987654321",
    cedula: 54321678,
    genero: "F",
    fechaNacimiento: "2025-02-12T12:00:00",
    password: "contraseña3",
    estado: "Inactivo",
    fechaCreacion: "2025-04-29T12:00:00",
    ultimoAcceso: "2025-06-10T12:00:00",
    rol: { rolId: 3, nombre: "Cliente" },
  },
];

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
  estado === "Activo"
    ? "Active"
    : estado === "Inactivo"
    ? "Inactive"
    : estado;

function UserManagement() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const handleOpenCreateModal = () => setCreateOpen(true);
  const handleCloseCreateModal = () => setCreateOpen(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
    setSelectedUserId(user.id);
  };
  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
    setSelectedUser(null);
  };
  const handleUpdateUser = (userData) => {
    // lógica para actualizar
    closeUpdateModal();
  };

  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const openDisableModal = (user) => {
    setSelectedUser(user);
    setIsDisableOpen(true);
    setSelectedUserId(user.id);
  };
  const closeDisableModal = () => {
    setIsDisableOpen(false);
    setSelectedUser(null);
  };
  const handleDisableUser = (userWithReason) => {
    // lógica deshabilitar
    closeDisableModal();
  };

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const openAssignRoleModal = (user) => {
    setSelectedUser(user);
    setIsAssignOpen(true);
    setSelectedUserId(user.id);
  };
  const closeAssignRoleModal = () => {
    setIsAssignOpen(false);
    setSelectedUser(null);
  };
  const handleAssignRole = (newRole) => {
    // lógica rol
    closeAssignRoleModal();
  };

  // Puedes reemplazar por tu propio estado si tienes usuarios dinámicos
  const users = usersMock;

  // Formatea la fecha al estilo YYYY-MM-DD (solo para visual)
  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("en-GB") : "-";

  // Traduce género
  const genderDisplay = (g) =>
    g === "M" ? "Male" : g === "F" ? "Female" : "Other";

 return (
  <div className="admin-page h-full flex flex-col">
    <Topbar title="User Management">
      <TopControls
        module="user"
        onCreate={handleOpenCreateModal}
        onUpdate={() => selectedUser && openUpdateModal(selectedUser)}
        onDisable={() => selectedUser && openDisableModal(selectedUser)}
        onAssign={() => selectedUser && openAssignRoleModal(selectedUser)}
      />
    </Topbar>

    <CreateUserModal isOpen={isCreateOpen} toggle={handleCloseCreateModal} />
    <UpdateUserModal isOpen={isUpdateOpen} toggle={closeUpdateModal} user={selectedUser} onUpdate={handleUpdateUser} />
    <DisableUserModal isOpen={isDisableOpen} toggle={closeDisableModal} user={selectedUser} onDisable={handleDisableUser} />
    <AssignRoleModal isOpen={isAssignOpen} toggle={closeAssignRoleModal} user={selectedUser} onAssign={handleAssignRole} />

    <div className="admin-content h-full flex-1 p-0">
      <div className="overflow-x-auto h-full w-full min-h-[70vh] py-8 px-10">
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
                className={`
                  cursor-pointer transition
                  ${selectedUserId === user.id
                    ? "bg-purple-100 ring-2 ring-purple-300"
                    : idx % 2 === 1
                    ? "bg-gray-50"
                    : ""
                  } hover:bg-purple-50
                `}
              >
                {/* USER CELL */}
                <td className="py-4 px-3 whitespace-nowrap font-semibold flex items-center gap-2">
                  <span className="inline-block rounded-full bg-gray-200 p-2">
                    <svg width="28" height="28" fill="none">
                      <circle cx="14" cy="14" r="12" stroke="#888" strokeWidth="2"/>
                      <circle cx="14" cy="12" r="5" stroke="#888" strokeWidth="2"/>
                      <ellipse cx="14" cy="19" rx="7" ry="4" stroke="#888" strokeWidth="2"/>
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold">{user.nombre} {user.apellido}</span>
                  </div>
                </td>
                {/* CONTACT CELL */}
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
                {/* ID NUMBER */}
                <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{user.cedula}</td>
                {/* GENDER */}
                <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{genderDisplay(user.genero)}</td>
                {/* BIRTHDATE */}
                <td className="py-4 px-3 whitespace-nowrap text-gray-800 text-sm">{formatDate(user.fechaNacimiento)}</td>
                {/* ROLE */}
                <td className="py-4 px-3 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full font-bold text-xs bg-purple-100 text-purple-700">
                    {roleToEN(user.rol?.nombre)}
                  </span>
                </td>
                {/* STATUS */}
                <td className="py-4 px-3 whitespace-nowrap">
                  <span className={`
                    px-4 py-1 rounded-full font-bold text-sm
                    ${statusToEN(user.estado) === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"}
                  `}>
                    {statusToEN(user.estado)}
                  </span>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

}

export default UserManagement;
