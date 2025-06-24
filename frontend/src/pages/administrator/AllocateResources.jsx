import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import AssignResourceModal from "../../components/admin/modals/Resources/AssignResourceModal";
import UpdateResourceModalWizard from "../../components/admin/modals/Resources/UpdateResourceModalWizard";
import DisableResourceModal from "../../components/admin/modals/Resources/DisableResourceModal";

const initialResources = [
  {
    id: 1,
    name: "Maria Gonzalez",
    type: "Human",
    availability: "Available",
    cost: "$3500",
    unit_measure: 1,
    description: "FullStack Developer",
  },
  {
    id: 2,
    name: "Laptop Dell",
    type: "Material",
    availability: "Disabled",
    cost: "$600",
    unit_measure: 0,
    description: "Laptop for develop",
  },
  {
    id: 3,
    name: "budget for project A",
    type: "Financial",
    availability: "Available",
    cost: "$1000",
    unit_measure: 10,
    description: "Total budget assigned for project",
  },
];

function AllocateResources() {
  // State principal de recursos y selección
  const [resources, setResources] = useState(initialResources);
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  // Estados para modales
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);
  const [isDisableOpen, setDisableOpen] = useState(false);

  // Proyectos (puedes expandir después)
  const [projects] = useState([
    { id: 1, name: "WINDBREAKER SOLUTIONS" },
    { id: 2, name: "HP TECHNLOGY" },
  ]);

  // Obtener recurso seleccionado (para update)
  const selectedResource = resources.find((r) => r.id === selectedResourceId);

  // Handler para asignar recurso
  const handleAssignResource = ({ resourceName, projectId }) => {
    setResources((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        name: resourceName,
        type: "Human",
        availability: "Available",
        cost: "$0",
        unit_measure: 0,
        description: "",
        projectId,
      },
    ]);
    setAssignOpen(false);
  };

  // Handler para actualizar recurso
  const handleUpdateResource = (updatedResource) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === updatedResource.id ? { ...r, ...updatedResource } : r
      )
    );
    setUpdateOpen(false);
    setResourceToEdit(null);
  };

  // Handler para eliminar recurso
  const handleDisableResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setDisableOpen(false);
    setSelectedResourceId(null);
  };

  return (
    <div className="admin-page">
      <Topbar title="Allocate Resources">
        <TopControls
          module="resource"
          onAssignResource={() => setAssignOpen(true)}
          onUpdate={
            selectedResource
              ? () => {
                  setResourceToEdit(selectedResource);
                  setUpdateOpen(true);
                }
              : undefined
          }
          onDisable={() => setDisableOpen(true)}
        />
      </Topbar>

      {/* Modales CRUD */}
      <AssignResourceModal
        isOpen={isAssignOpen}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssignResource}
        projects={projects}
        resources={resources}
      />

      <UpdateResourceModalWizard
        isOpen={isUpdateOpen}
        resource={resourceToEdit}
        onClose={() => setUpdateOpen(false)}
        onSave={handleUpdateResource}
      />

      <DisableResourceModal
        isOpen={isDisableOpen}
        resources={resources}
        onClose={() => setDisableOpen(false)}
        onDisable={handleDisableResource}
      />

      {/* Filtro por categoría (placeholder) */}
      <div className="flex items-center justify-between mt-4 mb-2">
        <span className="text-purple-600 text-lg font-semibold cursor-pointer hover:underline">
          All Resources
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-semibold">Category:</span>
          <select className="rounded-lg border-gray-300 px-3 py-1">
            <option>All</option>
          </select>
        </div>
      </div>

      {/* Tabla de recursos */}
      <div className="admin-content">
        <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">NAME</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">TYPE</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">AVAILABILITY</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">COST</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">UNIT_MEASURE</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr
                key={resource.id}
                onClick={() => setSelectedResourceId(resource.id)}
                className={`cursor-pointer transition
                  ${selectedResourceId === resource.id
                    ? "bg-purple-50 ring-2 ring-purple-200"
                    : "hover:bg-gray-50"
                  }
                `}
              >
                <td className="px-6 py-4 font-semibold">{resource.name}</td>
                <td className="px-6 py-4">{resource.type}</td>
                <td className="px-6 py-4">
                  <span className={`
                    px-4 py-1 rounded-full font-bold text-sm
                    ${resource.availability === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }
                  `}>
                    {resource.availability}
                  </span>
                </td>
                <td className="px-6 py-4">{resource.cost}</td>
                <td className="px-6 py-4">{resource.unit_measure}</td>
                <td className="px-6 py-4">{resource.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllocateResources;
