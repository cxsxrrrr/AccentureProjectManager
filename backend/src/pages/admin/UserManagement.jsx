import React, { useState } from "react";
import Topbar from "../../components/admin/layout/Topbar";
import TopControls from "../../components/admin/layout/TopControls";
import CreateUserModal from "../../components/admin/modals/Users/CreateUserModals/CreateUserModal"; // Asegúrate de crear este componente
import "../../stylesheets/page.css";
import UpdateUserModal from "../../components/admin/modals/Users/UpdateUserModal/UpdateUserModal";
import DisableUserModal from "../../components/admin/modals/Users/DisableUserModal";
import AssignRoleModal from "../../components/admin/modals/Users/AssignRoleModal";

function UserManagement() {
  // 1. Agrega el estado del modal
  const [isCreateOpen, setCreateOpen] = useState(false);

  // 2. Función para abrir/cerrar el modal
  const handleOpenCreateModal = () => setCreateOpen(true);
  const handleCloseCreateModal = () => setCreateOpen(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openUpdateModal = () => {
    // Aquí puedes poner el usuario seleccionado, o por ahora un mock:
    setSelectedUser({
      firstName: "Claudio",
      lastName: "Martins",
      birthDate: "2005-12-16",
      gender: "Male",
      docType: "ID - National identity document",
      docNumber: "32082355",
    });
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (userData) => {
    // Aquí va la lógica para actualizar el usuario (backend o estado)
    closeUpdateModal();
  };

  const [isDisableOpen, setIsDisableOpen] = useState(false);

  const openDisableModal = (user) => {
    setSelectedUser(user);
    setIsDisableOpen(true);
  };

  const closeDisableModal = () => {
    // Aquí puedes poner el usuario seleccionado, o por ahora un mock:
    setSelectedUser({
      firstName: "Claudio",
      lastName: "Martins",
      birthDate: "2005-12-16",
      gender: "Male",
      docType: "ID - National identity document",
      docNumber: "32082355",
    });
    setIsDisableOpen(false);
    setSelectedUser(null);
  };

  const handleDisableUser = (userWithReason) => {
    // Aquí haces la lógica de deshabilitar el usuario (por ejemplo, llamar a tu API)
    closeDisableModal();
  };

  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const openAssignRoleModal = (user) => {
    setSelectedUser(user);
    setIsAssignOpen(true);
  };

  const closeAssignRoleModal = () => {
    setIsAssignOpen(false);
    setSelectedUser(null);
  };

  const handleAssignRole = (newRole) => {
    // Aquí puedes actualizar el usuario con el nuevo rol
    // Por ejemplo, actualizar el estado o llamar a tu backend
    closeAssignRoleModal();
  };

  return (
    <div className="admin-page">
      <Topbar title="User Management">
        {/* 3. Pasa la función como prop a TopControls */}
        <TopControls
          module="user"
          onCreate={handleOpenCreateModal}
          onUpdate={openUpdateModal}
          onDisable={openDisableModal}
          onAssign={openAssignRoleModal}
        />
      </Topbar>

      {/* 4. Renderiza el modal fuera del admin-content */}
      <CreateUserModal
        isOpen={isCreateOpen}
        toggle={handleCloseCreateModal}
        // onCreate={(data) => {
        //   // Aquí puedes manejar el nuevo usuario (guardar en estado, backend, etc.)
        //   setCreateOpen(false);
        // }}
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

      <div className="admin-content">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>admin@company.com</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
