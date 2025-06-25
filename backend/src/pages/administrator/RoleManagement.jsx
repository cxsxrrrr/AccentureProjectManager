import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import CreateRoleModal from "../../components/admin/modals/Roles/CreateRoleModal";
import UpdateRoleModal from "../../components/admin/modals/Roles/UpdateRoleModal";
import DisableRoleModal from "../../components/admin/modals/Roles/DisableRoleModal";

// --- MOCK: lista inicial de roles
const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to the system.",
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage users and projects.",
  },
  {
    id: 3,
    name: "Customer",
    description: "Limited client access.",
  },
];

function RoleManagement() {
  // Estado para la lista de roles
  const [roles, setRoles] = useState(initialRoles);

  // Estado para seleccionar los registro que aparecen en la tabla
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  // Crear rol
  const [isCreateOpen, setCreateOpen] = useState(false);
  const handleOpenCreateModal = () => setCreateOpen(true);
  const handleCloseCreateModal = () => setCreateOpen(false);

  const handleCreateRole = (roleData) => {
    setRoles((prev) => [
      ...prev,
      {
        ...roleData,
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
      },
    ]);
    handleCloseCreateModal();
  };

  // Editar rol
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

  const openUpdateModal = (role) => {
    setRoleToEdit(role);
    setUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateOpen(false);
    setRoleToEdit(null);
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === roleToEdit.id ? { ...r, ...updatedRole } : r))
    );
    closeUpdateModal();
  };

  // Deshabilitar Rol
  const [isDisableOpen, setDisableOpen] = useState(false);

  const handleOpenDisableModal = () => setDisableOpen(true);
  const handleCloseDisableModal = () => setDisableOpen(false);

  const handleDisableRole = (role) => {
    // Ejemplo: marcar como inactivo en tu estado
    setRoles((prev) =>
      prev.map((r) => (r.id === role.id ? { ...r, status: "Inactive" } : r))
    );
    setDisableOpen(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Role Management">
        <TopControls
          module="role"
          onCreate={handleOpenCreateModal}
          onUpdate={
            selectedRole ? () => openUpdateModal(selectedRole) : undefined
          }
          onDisable={handleOpenDisableModal}
        />
      </Topbar>

      {/* Modal crear rol */}
      <CreateRoleModal
        isOpen={isCreateOpen}
        toggle={handleCloseCreateModal}
        onCreate={handleCreateRole}
      />

      {/* Modal editar rol */}
      <UpdateRoleModal
        isOpen={isUpdateOpen}
        toggle={closeUpdateModal}
        role={roleToEdit}
        onUpdate={handleUpdateRole}
      />

      <DisableRoleModal
        isOpen={isDisableOpen}
        toggle={handleCloseDisableModal}
        roles={roles}
        onDisable={handleOpenDisableModal}
      />

      {/* --- AQUÍ REEMPLAZAS --- */}
      <div className="admin-content mt-10">
        <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">#</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">
                NAME
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">
                DESCRIPTION
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, i) => (
              <tr
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`
                cursor-pointer transition
                ${
                  selectedRoleId === role.id
                    ? "bg-purple-50 ring-2 ring-purple-200"
                    : "hover:bg-gray-50"
                }
              `}
              >
                <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                <td>
                  <span
                    className={`
                  px-5 py-2 rounded-xl font-bold shadow
                  ${
                    role.name === "Admin" ? "bg-purple-100 text-purple-700" : ""
                  }
                  ${role.name === "Manager" ? "bg-blue-100 text-blue-700" : ""}
                  ${role.name === "Customer" ? "bg-red-100 text-red-600" : ""}
                  ${
                    role.name === "Team Member"
                      ? "bg-green-100 text-green-600"
                      : ""
                  }
                `}
                  >
                    {role.name}
                  </span>
                </td>
                <td>
                  <span className="bg-gray-100 rounded-lg px-5 py-2 text-gray-600 text-sm shadow">
                    {role.description}
                  </span>
                </td>
                <td>
                  <span className="bg-green-100 text-green-600 font-semibold rounded-full px-5 py-2 shadow text-base">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoleManagement;
