import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import AssignResourceModal from "../../components/admin/modals/Resources/AssignResourceModal";
import UpdateResourceModalWizard from "../../components/admin/modals/Resources/UpdateResourceModalWizard";
import DisableResourceModal from "../../components/admin/modals/Resources/DisableResourceModal";
import CreateResourceModalWizard from "../../components/admin/modals/Resources/CreateResourceModalWizard";
import api from "../../services/axios";

function ResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  // Modal handlers
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);
  const [isDisableOpen, setDisableOpen] = useState(false);

  // Projects (mock)
  const [projects] = useState([
    { id: 1, name: "WINDBREAKER SOLUTIONS" },
    { id: 2, name: "HP TECHNLOGY" },
  ]);

  // Selected resource based on ID
  const selectedResource = resources.find((r) => r.recursoId === selectedResourceId);

  // Fetch resources from backend
  useEffect(() => {
    api
      .get("/recursos")
      .then((res) => setResources(res.data))
      .catch((err) => console.error("Error fetching resources:", err));
  }, []);

  // Handlers
  const handleCreateResource = (newResource) => {
    setResources((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        ...newResource,
        // Homologar nombre de propiedad
        unit_measure: newResource.unit || 0,
        availability: newResource.availability || "Available",
      },
    ]);
    setCreateOpen(false);
  };

  const handleAssignResource = async ({ resourceId, projectId }) => {
    try {
      if (!resourceId || !projectId) {
        throw new Error("Resource ID or Project ID is missing.");
      }

      // Validar que los IDs sean números válidos
      if (isNaN(resourceId) || isNaN(projectId)) {
        throw new Error("Invalid Resource ID or Project ID.");
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.usuarioId) {
        throw new Error("User ID is missing. Please log in again.");
      }

      const body = {
        recursoId: resourceId,
        proyectoId: projectId,
        asignadoPor: user.usuarioId,
      };

      console.log("Assigning resource with payload:", body);

      const response = await api.post("http://localhost:8080/api/recursos-proyecto", body);

      if (response.status === 200 || response.status === 201) {
        console.log("Resource assigned successfully.", response.data);
        alert("Resource assigned successfully.");
      } else {
        console.error("Unexpected response status:", response.status, response.data);
        throw new Error("Failed to assign resource. Please check the server logs.");
      }

      setAssignOpen(false);
    } catch (error) {
      console.error("Error assigning resource:", error);
      alert("Error assigning resource. Please try again.");
    }
  };

  // Update resource via backend and update state
  const handleUpdateResource = async (updatedResource) => {
    try {
      const recursoId = updatedResource.recursoId || updatedResource.id;
      if (!recursoId) {
        throw new Error("Resource ID is missing.");
      }

      const payload = {
        nombreRecurso: updatedResource.nombreRecurso,
        descripcionRecurso: updatedResource.descripcionRecurso,
        estado: updatedResource.estado,
        coste: parseFloat(updatedResource.coste),
        cantidad: parseInt(updatedResource.cantidad, 10),
        tipo: updatedResource.tipo,
      };

      console.log("Preparing to send update request with payload:", payload);

      const response = await api.put(`http://localhost:8080/api/recursos/${recursoId}`, payload);

      console.log("Response received:", response);

      if (response.status === 200 || response.status === 201) {
        const updated = response.data;
        console.log("Resource updated successfully.", updated);
        setResources((prev) =>
          prev.map((r) => (r.recursoId === updated.recursoId ? updated : r))
        );
      } else {
        console.error("Unexpected response status:", response.status, response.data);
        throw new Error("Failed to update resource. Please check the server logs.");
      }

      setUpdateOpen(false);
      setResourceToEdit(null);
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Error updating resource. Please try again.");
    }
  };

  // Disable a resource via API (set estado to Disabled) and update state
  const handleDisableResource = async (id) => {
    try {
      if (!id) {
        throw new Error("Resource ID is missing.");
      }

      const resourceToDisable = resources.find((r) => r.recursoId === id);
      if (!resourceToDisable) {
        throw new Error("Resource not found.");
      }

      const payload = {
        nombreRecurso: resourceToDisable.nombreRecurso,
        descripcionRecurso: resourceToDisable.descripcionRecurso,
        estado: "Disabled",
        coste: resourceToDisable.coste,
        cantidad: resourceToDisable.cantidad,
        tipo: resourceToDisable.tipo,
      };

      console.log("Disabling resource with payload:", payload);

      const response = await api.put(`/recursos/${id}`, payload);

      if (response.status === 200 || response.status === 201) {
        const updated = response.data;
        console.log("Resource disabled successfully.", updated);
        setResources((prev) =>
          prev.map((r) => (r.recursoId === updated.recursoId ? updated : r))
        );
      } else {
        console.error("Unexpected response status:", response.status, response.data);
        throw new Error("Failed to disable resource. Please check the server logs.");
      }

      setDisableOpen(false);
      setSelectedResourceId(null);
    } catch (error) {
      console.error("Error disabling resource:", error);
      alert("Error disabling resource. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <Topbar title="Allocate Resources">
        <TopControls
          module="resourceManager"
          onCreate={() => setCreateOpen(true)}
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
      <CreateResourceModalWizard
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateResource}
      />
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

      {/* Responsive Table */}
      <div className="flex items-center justify-between mt-4 mb-2 px-2 flex-wrap">
        <span className="text-purple-600 text-lg font-semibold cursor-pointer hover:underline">
          All Resources
        </span>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <span className="text-gray-600 font-semibold">Category:</span>
          <select className="rounded-lg border-gray-300 px-3 py-1">
            <option>All</option>
          </select>
        </div>
      </div>

      {/* Tabla de recursos (responsive con overflow-x para mobile) */}
      <div className="admin-content overflow-x-auto">
        <table className="min-w-[700px] w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">NAME</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">TYPE</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">STATUS</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">COST</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">UNIT MEASURE</th>
              <th className="px-6 py-3 text-left text-gray-500 font-bold">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr
                key={resource.recursoId}
                onClick={() => setSelectedResourceId(resource.recursoId)}
                className={`cursor-pointer transition ${
                  selectedResourceId === resource.recursoId
                    ? "bg-purple-50 ring-2 ring-purple-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-semibold">{resource.nombreRecurso}</td>
                <td className="px-6 py-4">{resource.tipo}</td>
                <td className="px-6 py-4">
                  <span
                    className={`
                      px-4 py-1 rounded-full font-bold text-sm
                      ${
                        resource.estado === "Available" || resource.estado === "Disponible"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }
                    `}
                  >
                    {resource.estado === "Available" || resource.estado === "Disponible"
                      ? "Activo"
                      : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4">{resource.coste}</td>
                <td className="px-6 py-4">{resource.cantidad}</td>
                <td className="px-6 py-4">{resource.descripcionRecurso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResourcesManagement;
