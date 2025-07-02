import React, { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import api from "../../services/axios";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import AssignResourceModal from "../../components/admin/modals/Resources/AssignResourceModal";
import UpdateResourceModalWizard from "../../components/admin/modals/Resources/UpdateResourceModalWizard";
import DisableResourceModal from "../../components/admin/modals/Resources/DisableResourceModal";
import CreateResourceModalWizard from "../../components/admin/modals/Resources/CreateResourceModalWizard";

function AllocateResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  // Modal states
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isAssignOpen, setAssignOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);
  const [isDisableOpen, setDisableOpen] = useState(false);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Projects mock
  const [projects] = useState([
    { id: 1, name: "WINDBREAKER SOLUTIONS" },
    { id: 2, name: "HP TECHNLOGY" },
  ]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!authService.isAuthenticated()) {
        throw new Error("No authenticated");
      }

      const response = await api.get("http://localhost:8080/api/recursos");
      const resourcesFromApi = response.data;

      const formattedResources = resourcesFromApi.map((r) => ({
        id: r.recursoId,
        nombreRecurso: r.nombreRecurso,
        descripcionRecurso: r.descripcionRecurso,
        estado: r.estado,
        coste: r.coste,
        tipo: r.tipo,
        cantidad: r.cantidad,
      }));

      setResources(formattedResources);
    } catch (err) {
      console.error("Error loading resources:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        authService.logout();
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view resources.");
      } else if (err.message === "No authenticated") {
        setError("Please login to continue.");
        authService.logout();
      } else {
        setError("Error loading resources. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResource = (newResource) => {
    setResources((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        nombreRecurso: newResource.nombreRecurso,
        descripcionRecurso: newResource.descripcionRecurso,
        estado: newResource.estado || "Disponible",
        coste: newResource.coste || 0,
        tipo: newResource.tipo || "Material",
        cantidad: newResource.cantidad || 0,
      },
    ]);
    setCreateOpen(false);
  };

  const handleAssignResource = async ({ resourceId, projectId }) => {
    try {
      if (!resourceId || !projectId) {
        throw new Error("Resource ID or Project ID is missing.");
      }
      if (isNaN(resourceId) || isNaN(projectId)) {
        throw new Error("Invalid Resource ID or Project ID.");
      }

      const userId = authService.getCurrentUserId ? authService.getCurrentUserId() : null;
      if (!userId) throw new Error("User not logged in.");

      const body = {
        recursoId: resourceId,
        proyectoId: projectId,
        asignadoPor: userId,
      };

      const response = await api.post("http://localhost:8080/api/recursos-proyecto", body);
      if (response.status === 200 || response.status === 201) {
        alert("Resource assigned successfully.");
      } else {
        throw new Error("Failed to assign resource.");
      }

      await loadResources();
      setAssignOpen(false);
    } catch (error) {
      console.error("Error assigning resource:", error);
      alert("Error assigning resource. Please try again.");
    }
  };

  const handleUpdateResource = async (updatedResource) => {
    try {
      const body = {
        nombreRecurso: updatedResource.nombreRecurso,
        descripcionRecurso: updatedResource.descripcionRecurso,
        estado: updatedResource.estado,
        coste: parseFloat(updatedResource.coste),
        cantidad: parseInt(updatedResource.cantidad, 10),
        tipo: updatedResource.tipo,
      };

      await api.put(`http://localhost:8080/api/recursos/${updatedResource.id}`, body);

      await loadResources();
      setUpdateOpen(false);
      setResourceToEdit(null);
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Error updating resource. Please try again.");
    }
  };

  const handleDisableResource = async (id) => {
    try {
      await api.put(`http://localhost:8080/api/recursos/${id}`, {
        estado: "Inactivo",
      });
      await loadResources();
      setDisableOpen(false);
      setSelectedResourceId(null);
    } catch (error) {
      console.error("Error disabling resource:", error);
      alert("Error disabling resource. Please try again.");
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      categoryFilter === "All" || resource.tipo === categoryFilter;

    const resourceStatus =
      resource.estado === "Disponible" || resource.estado === "Available"
        ? "Active"
        : "Inactive";

    const matchesStatus = statusFilter === "All" || resourceStatus === statusFilter;

    return matchesCategory && matchesStatus;
  });

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
          onRefresh={loadResources}
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

      {/* Filtros */}
      <div className="flex items-center justify-between mt-4 mb-2 px-2 flex-wrap gap-4">
        <span className="text-purple-600 text-lg font-semibold cursor-pointer hover:underline">
          All Resources
        </span>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-semibold">Category:</span>
          <select
            className="rounded-lg border-gray-300 px-3 py-1"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Human">Human</option>
            <option value="Material">Material</option>
            <option value="Financial">Financial</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-semibold">Status:</span>
          <select
            className="rounded-lg border-gray-300 px-3 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Tabla de recursos */}
      <div className="admin-content overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              Loading resources...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <span className="material-icons">error</span>
                <span className="font-semibold">Error</span>
              </div>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={loadResources}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
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
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => {
                  const displayStatus =
                    resource.estado === "Disponible" || resource.estado === "Available"
                      ? "Active"
                      : "Inactive";

                  return (
                    <tr
                      key={resource.id}
                      onClick={() => {
                        setSelectedResourceId(resource.id);
                        setSelectedResource(resource);
                      }}
                      className={`cursor-pointer transition ${
                        selectedResourceId === resource.id
                          ? "bg-purple-50 ring-2 ring-purple-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold">{resource.nombreRecurso}</td>
                      <td className="px-6 py-4">{resource.tipo}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1 rounded-full font-bold text-sm ${
                            displayStatus === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {displayStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">{resource.coste}</td>
                      <td className="px-6 py-4">{resource.cantidad}</td>
                      <td className="px-6 py-4">{resource.descripcionRecurso}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-icons text-4xl text-gray-300">inventory_2</span>
                      <span>No resources found.</span>
                      <button
                        onClick={loadResources}
                        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Refresh
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllocateResources;