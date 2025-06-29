// En ProjectManagement.jsx
import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewProjectModal from "../../components/manager/modals/Projects/NewProjectModal";
import UpdateProjectModal from "../../components/manager/modals/Projects/UpdateProjectModal";

function ProjectManagement() {
  // Mock de proyectos
const [projects, setProjects] = useState([
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign of client website",
    client: "Globant",
    manager: "Luis Pérez",
    startDate: "2024-03-01",
    endDate: "2024-08-15",
    status: "Active",
  },
  {
    id: 2,
    title: "Mobile App",
    description: "Development of a new mobile app",
    client: "Accenture",
    manager: "Carla Smith",
    startDate: "2024-04-15",
    endDate: "2024-09-10",
    status: "On Hold",
  },
]);

  const [selected, setSelected] = useState(null);

  // Modal states
  const [modalNew, setModalNew] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  // Clientes y managers mock
  const clients = [
    { id: 1, name: "Globant" },
    { id: 2, name: "Accenture" },
  ];
  const managers = [
    { id: 1, name: "Luis Pérez" },
    { id: 2, name: "Carla Smith" },
  ];

  // Handlers
  const handleCreate = () => setModalNew(true);
  const handleUpdate = () => setModalUpdate(true);

  // Al seleccionar fila
  const handleRowSelect = (proj) => setSelected(proj);

  // Guardar nuevo proyecto (mock)
  const handleSaveNew = (data) => {
    setProjects([...projects, { ...data, id: projects.length + 1 }]);
    setModalNew(false);
  };

  // Actualizar proyecto
  const handleSaveUpdate = (data) => {
    setProjects(
      projects.map((p) => (p.id === selected.id ? { ...selected, ...data } : p))
    );
    setModalUpdate(false);
    setSelected(null);
  };

  return (
    <div className="admin-page">
      <Topbar title="Project Management">
        <TopControls
          module="project"
          onCreate={handleCreate}
          onUpdate={selected ? handleUpdate : null}
        />
      </Topbar>
      <div className="admin-content">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4 min-w-[1000px]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  DESCRIPTION
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  CLIENT
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  MANAGER
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  START DATE
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  END DATE
                </th>
                <th className="px-6 py-3 text-left text-gray-500 font-bold uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr
                  key={proj.id}
                  onClick={() => handleRowSelect(proj)}
                  className={`
              cursor-pointer transition 
              ${
                selected && selected.id === proj.id
                  ? "bg-purple-100 ring-2 ring-purple-300"
                  : idx % 2 === 1
                  ? "bg-gray-50"
                  : ""
              }
              hover:bg-purple-50
            `}
                >
                  <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    <span className="inline-block rounded-full bg-purple-50 p-2 mr-2 align-middle" />
                    {proj.title}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {proj.description}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{proj.client}</td>
                  <td className="py-4 px-6 text-gray-700">{proj.manager}</td>
                  <td className="py-4 px-6 text-gray-700">{proj.startDate}</td>
                  <td className="py-4 px-6 text-gray-700">{proj.endDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`
                px-4 py-1 rounded-full font-bold text-xs
                ${
                  proj.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : proj.status === "Completed"
                    ? "bg-blue-100 text-blue-700"
                    : proj.status === "On Hold"
                    ? "bg-yellow-100 text-yellow-700"
                    : proj.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-700"
                }
              `}
                    >
                      {proj.status}
                    </span>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* MODALES */}
        <NewProjectModal
          isOpen={modalNew}
          onClose={() => setModalNew(false)}
          onSave={handleSaveNew}
          clients={clients}
          managers={managers}
        />
        <UpdateProjectModal
          isOpen={modalUpdate}
          onClose={() => setModalUpdate(false)}
          onSave={handleSaveUpdate}
          initialData={selected}
          clients={clients}
          managers={managers}
        />
      </div>
    </div>
  );
}

export default ProjectManagement;
