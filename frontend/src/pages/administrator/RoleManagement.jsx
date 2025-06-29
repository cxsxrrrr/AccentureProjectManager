import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import CreateRoleModal from "../../components/admin/modals/Roles/CreateRoleModal";
import UpdateRoleModal from "../../components/admin/modals/Roles/UpdateRoleModal";
import DisableRoleModal from "../../components/admin/modals/Roles/DisableRoleModal";

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isDisableOpen, setDisableOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [error, setError] = useState(null);

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  const colorVariants = [
    { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
    { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
    { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
    { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
    { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
    { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200' },
  ];

  const getRoleColor = (index, roleId) => {
    const colorIndex = roleId ? (roleId % colorVariants.length) : (index % colorVariants.length);
    return colorVariants[colorIndex];
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedRoles = response.data.map((r) => ({
          id: r.rolId,
          nombre: r.nombre,
          descripcion: r.descripcion,
          estado: r.estado || "activo",
        }));

        setRoles(mappedRoles);
      } catch (err) {
        console.error("Error loading roles", err);
        setError("Error loading roles.");
      }
    };

    fetchRoles();
  }, []);

  const handleApiError = (error, defaultMessage) => {
    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || '';
      const duplicatePatterns = [
        /duplicate/i,
        /already exists/i,
        /nombre.*existe/i,
        /name.*exists/i,
        /unique/i,
        /constraint/i
      ];
      const isDuplicateName = duplicatePatterns.some(pattern => pattern.test(errorMessage));
      if (isDuplicateName) {
        return "Role with duplicate name";
      }
      return errorMessage || "Invalid request";
    }
    return defaultMessage;
  };

  const handleCreateRole = async (roleData) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/roles",
        {
          nombre: roleData.name,
          descripcion: roleData.description,
          estado: (roleData.status || "activo").toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newRole = {
        id: response.data.rolId || response.data.id,
        nombre: response.data.nombre,
        descripcion: response.data.descripcion,
        estado: response.data.estado || "activo"
      };

      setRoles((prev) => [...prev, newRole]);
      setCreateOpen(false);
    } catch (err) {
      console.error("Error creating role", err);
      const errorMessage = handleApiError(err, "Error creating role.");
      setError(errorMessage);
    }
  };

  const handleUpdateRole = async (updatedRole) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/roles/${updatedRole.id}`,
        {
          nombre: updatedRole.nombre,
          descripcion: updatedRole.descripcion,
          estado: typeof updatedRole.estado === 'string' ? updatedRole.estado.toLowerCase() : "activo"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRoles((prev) =>
        prev.map((r) =>
          r.id === updatedRole.id
            ? {
                ...r,
                nombre: updatedRole.nombre,
                descripcion: updatedRole.descripcion,
                estado: updatedRole.estado.toLowerCase(),
              }
            : r
        )
      );

      setUpdateOpen(false);
      setRoleToEdit(null);
    } catch (err) {
      console.error("Error updating role", err);
      const errorMessage = handleApiError(err, "Error updating role.");
      setError(errorMessage);
    }
  };

  const handleDisableRole = (role) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === role.id ? { ...r, estado: "inactivo" } : r))
    );
    setDisableOpen(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Role Management">
        <TopControls
          module="role"
          onCreate={() => setCreateOpen(true)}
          onUpdate={
            selectedRole
              ? () => {
                  setRoleToEdit(selectedRole);
                  setUpdateOpen(true);
                }
              : undefined
          }
          onDisable={() => setDisableOpen(true)}
        />
      </Topbar>

      {error && (
        <div className="text-center p-4 bg-red-100 text-red-700 mb-4 rounded">
          {error}
        </div>
      )}

      <CreateRoleModal
        isOpen={isCreateOpen}
        toggle={() => setCreateOpen(false)}
        onCreate={handleCreateRole}
      />

      <UpdateRoleModal
        isOpen={isUpdateOpen}
        toggle={() => setUpdateOpen(false)}
        role={roleToEdit}
        onUpdate={handleUpdateRole}
      />

      <DisableRoleModal
        isOpen={isDisableOpen}
        toggle={() => setDisableOpen(false)}
        roles={roles}
        onDisable={handleDisableRole}
      />

      <div className="admin-content mt-10">
        <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">#</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">NAME</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">DESCRIPTION</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role, i) => (
                <tr
                  key={role.id ?? `role-${i}`}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedRoleId === role.id
                      ? "bg-purple-50 ring-2 ring-purple-200 shadow-sm"
                      : "hover:bg-purple-50/50 hover:ring-1 hover:ring-purple-100 hover:shadow-sm"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td>
                    <span className={`px-4 py-2 rounded-lg font-semibold text-sm border ${getRoleColor(i, role.id).bg} ${getRoleColor(i, role.id).text} ${getRoleColor(i, role.id).border} transition-all duration-200 hover:shadow-md`}>
                      {role.nombre ?? "Unnamed"}
                    </span>
                  </td>
                  <td>
                    <span className="bg-gray-100 rounded-lg px-5 py-2 text-gray-600 text-sm shadow">
                      {role.descripcion ?? "No description"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-5 py-2 rounded-full font-semibold shadow text-base ${
                        role.estado?.toLowerCase() === "inactivo"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {role.estado ?? "activo"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoleManagement;