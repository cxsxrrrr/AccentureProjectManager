import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import CreateUserModal from "../../components/admin/modals/Users/CreateUserModals/CreateUserModal";
import "../../stylesheets/page.css";
import UpdateUserModal from "../../components/admin/modals/Users/UpdateUserModal/UpdateUserModal";
import DisableUserModal from "../../components/admin/modals/Users/DisableUserModal";
import AssignRoleModal from "../../components/admin/modals/Users/AssignRoleModal";

const usersMock = [
  {
    id: 1,
    firstName: "Cesar",
    lastName: "Moran",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    gender: "Male",
    birthDate: "5/19/25",
    role: "Admin",
    status: "Active",
    avatar: null,
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
  },
  {
    id: 2,
    firstName: "Luis",
    lastName: "Solarte",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    gender: "Male",
    birthDate: "5/19/25",
    role: "Manager",
    status: "Active",
    avatar: null,
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
  },
  {
    id: 3,
    firstName: "Valentina",
    lastName: "Moran",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    gender: "Female",
    birthDate: "5/19/25",
    role: "Customer",
    status: "Disabled",
    avatar: null,
    category: "Developer",
    skills: ["Java Script", "React"],
  },
  {
    id: 4,
    firstName: "Enmanuel",
    lastName: "Fuenmayor",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    gender: "Male",
    birthDate: "5/19/25",
    role: "Admin",
    status: "Active",
    avatar: null,
    category: "Developer",
    skills: ["Java Script"],
  },
];

function UserManagement() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const handleOpenCreateModal = () => setCreateOpen(true);
  const handleCloseCreateModal = () => setCreateOpen(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Selección visual en tabla
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Actualizar usuario
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

  return (
    <div className="admin-page">
      <Topbar title="User Management">
        <TopControls
          module="user"
          onCreate={handleOpenCreateModal}
          onUpdate={() => selectedUser && openUpdateModal(selectedUser)}
          onDisable={() => selectedUser && openDisableModal(selectedUser)}
          onAssign={() => selectedUser && openAssignRoleModal(selectedUser)}
        />
      </Topbar>

      <CreateUserModal
        isOpen={isCreateOpen}
        toggle={handleCloseCreateModal}
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
        <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">USER</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">CONTACT</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">CATEGORY & SKILL</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">ROLE</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">STATUS</th>
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
                    ? "bg-gray-100 ring-2 ring-purple-200"
                    : idx % 2 === 1
                    ? "bg-gray-50"
                    : ""
                  }
                `}
              >
                {/* USER CELL */}
                <td className="flex items-center gap-3 py-4 px-6">
                  <span className="inline-block rounded-full bg-gray-200 p-2">
                    <svg width="30" height="30" fill="none"><circle cx="15" cy="15" r="14" stroke="#888" strokeWidth="2"/><circle cx="15" cy="13" r="6" stroke="#888" strokeWidth="2"/><ellipse cx="15" cy="22" rx="8" ry="5" stroke="#888" strokeWidth="2"/></svg>
                  </span>
                  <div>
                    <span className="font-bold">{user.firstName} {user.lastName}</span>
                    <div className="text-xs text-gray-500">{user.gender} • {user.birthDate}</div>
                  </div>
                </td>
                {/* CONTACT CELL */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-gray-500 text-base">mail</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-icons text-gray-500 text-base">phone</span>
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </td>
                {/* CATEGORY & SKILL */}
                <td className="py-4 px-6">
                  <span className="font-bold text-sm">{user.category}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded-lg font-medium">{skill}</span>
                    ))}
                  </div>
                </td>
                {/* ROLE */}
                <td className="py-4 px-6">
                  <span className={`
                    px-3 py-1 rounded-full font-bold text-xs
                    ${user.role === "Admin" ? "bg-purple-100 text-purple-700"
                      : user.role === "Manager" ? "bg-purple-100 text-purple-500"
                      : user.role === "Customer" ? "bg-purple-100 text-purple-400"
                      : "bg-gray-100 text-gray-500"}
                  `}>
                    {user.role}
                  </span>
                </td>
                {/* STATUS */}
                <td className="py-4 px-6">
                  <span className={`
                    px-4 py-1 rounded-full font-bold text-sm
                    ${user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"}
                  `}>
                    {user.status}
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

export default UserManagement;
