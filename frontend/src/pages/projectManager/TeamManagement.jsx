import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import UnassignProjectModal from "../../components/manager/modals/Teams/UnassignProjectModal";
import AssignProjectModal from "../../components/manager/modals/Teams/AssignProjectModal";
const mockTeam = [
  {
    id: 1,
    name: "John Doe",
    email: "john@demo.com",
    role: "Developer",
    project: "Website Redesign",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@demo.com",
    role: "Analyst",
    project: "Inventory App",
    status: "Active",
  },
  {
    id: 3,
    name: "Carlos Reyes",
    email: "carlos@demo.com",
    role: "Designer",
    project: "None",
    status: "Unassigned",
  },
];

function TeamManagement() {
  const [showAssign, setShowAssign] = useState(false);
  const [showUnassign, setShowUnassign] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const projectsList = [
    "Website Redesign",
    "Cloud Migration",
    "IT Support",
    "Data Analysis",
  ];

  const [team, setTeam] = useState(mockTeam);

  // El usuario seleccionado según ID
  const selectedUser = team.find((u) => u.id === selectedId);

  // Handlers para abrir los modales
  const handleAssign = () => {
    if (selectedUser) setShowAssign(true);
  };

  const handleUnassign = () => {
    if (selectedUser && selectedUser.project !== "None") {
      setShowUnassign(true);
    }
  };

  // Asignar proyecto (modal)
  const handleAssignProject = (projectName) => {
    setTeam((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? { ...t, project: projectName, status: "Active" }
          : t
      )
    );
    setShowAssign(false);
  };

  // Desasignar proyecto (modal)
  const handleUnassignProject = (user) => {
    setTeam((prev) =>
      prev.map((t) =>
        t.id === user.id ? { ...t, project: "None", status: "Unassigned" } : t
      )
    );
    setShowUnassign(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Team Management">
        <TopControls
          module="team"
          onAssign={selectedUser ? handleAssign : undefined}
          onUnassign={
            selectedUser && selectedUser.project !== "None"
              ? handleUnassign
              : undefined
          }
        />
      </Topbar>
      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/4">
                  NAME
                </th>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/4">
                  ROLE
                </th>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/3">
                  PROJECT
                </th>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, idx) => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedId(member.id)}
                  className={`
                  cursor-pointer transition
                  ${
                    selectedId === member.id
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : idx % 2
                      ? "bg-gray-50"
                      : ""
                  }
                  hover:bg-purple-50
                `}
                >
                  <td className="py-5 px-8 font-semibold text-gray-800 whitespace-nowrap w-1/4">
                    {member.name}
                  </td>
                  <td className="py-5 px-8 text-gray-700 w-1/4">
                    {member.role}
                  </td>
                  <td className="py-5 px-8 text-gray-700 w-1/3">
                    {member.project}
                  </td>
                  <td className="py-5 px-8 w-1/6">
                    <span
                      className={`
                      px-4 py-1 rounded-full font-bold text-base
                      ${
                        member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : member.status === "Unassigned"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AssignProjectModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={handleAssignProject}
        user={selectedUser}
        projects={projectsList}
      />
      <UnassignProjectModal
        isOpen={showUnassign}
        onClose={() => setShowUnassign(false)}
        onUnassign={handleUnassignProject}
        user={selectedUser}
      />
    </div>
  );
}

export default TeamManagement;
