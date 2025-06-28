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

  useEffect(() => {
  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Roles cargados:", response.data);

      const mappedRoles = response.data.map((r) => ({
        id: r.rolId,
        name: r.nombre,
        description: r.descripcion,
        status: "Active", // Ajusta si tu backend tiene otro campo para estado
      }));

      setRoles(mappedRoles);
    } catch (err) {
      console.error("Error loading roles", err);
      setError("Error loading roles.");
    }
  };

    fetchRoles();
  }, []);

  const handleCreateRole = async (roleData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/roles",
        { ...roleData, status: "Active" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoles((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error creating role", err);
      setError("Error creating role.");
    } finally {
      setCreateOpen(false);
    }
  };

  const handleUpdateRole = (updatedRole) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === roleToEdit.id ? { ...r, ...updatedRole } : r))
    );
    setUpdateOpen(false);
    setRoleToEdit(null);
  };

  const handleDisableRole = (role) => {
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
                  className={`cursor-pointer transition ${
                    selectedRoleId === role.id
                      ? "bg-purple-50 ring-2 ring-purple-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td>
                    <span className="px-5 py-2 rounded-xl font-bold shadow">
                      {role.name ?? "Unnamed"}
                    </span>
                  </td>
                  <td>
                    <span className="bg-gray-100 rounded-lg px-5 py-2 text-gray-600 text-sm shadow">
                      {role.description ?? "No description"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-5 py-2 rounded-full font-semibold shadow text-base ${
                        role.status === "Inactive"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {role.status ?? "Active"}
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
