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
  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  // Modales
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [isDisableOpen, setDisableOpen] = useState(false);

  // Estado para carga y error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRoles(response.data);
    } catch (error) {
      console.error("Error loading roles:", error);
      setError("Error loading roles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRole = async (roleData) => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/roles",
        { ...roleData, status: "Active" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRoles((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating role:", error);
      setError("Error creating role. Please try again.");
    } finally {
      setCreateOpen(false);
    }
  };

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
          onUpdate={selectedRole ? () => openUpdateModal(selectedRole) : undefined}
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
        toggle={closeUpdateModal}
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
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading roles...</div>
        ) : (
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
              {roles.map((role, i) => (
                <tr
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`cursor-pointer transition ${
                    selectedRoleId === role.id
                      ? "bg-purple-50 ring-2 ring-purple-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-bold">{i + 1}</td>
                  <td>
                    <span
                      className={`px-5 py-2 rounded-xl font-bold shadow ${
                        role.name === "Admin" ? "bg-purple-100 text-purple-700" : ""
                      } ${role.name === "Manager" ? "bg-blue-100 text-blue-700" : ""}
                      ${role.name === "Customer" ? "bg-red-100 text-red-600" : ""}
                      ${role.name === "Team Member" ? "bg-green-100 text-green-600" : ""}`}
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
                    <span
                      className={`px-5 py-2 rounded-full font-semibold shadow text-base ${
                        role.status === "Inactive"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {role.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default RoleManagement;
