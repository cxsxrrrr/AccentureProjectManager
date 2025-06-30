import React, { useEffect, useState } from "react";
import { authService } from "../../services/authService"; // Importar el servicio de auth
import api from "../../services/axios"; // Usar la instancia configurada de axios
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import AssignResourceModal from "../../components/admin/modals/Resources/AssignResourceModal";
import UpdateResourceModalWizard from "../../components/admin/modals/Resources/UpdateResourceModalWizard";
import DisableResourceModal from "../../components/admin/modals/Resources/DisableResourceModal";

function AllocateResources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const [isAssignOpen, setAssignOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [resourceToEdit, setResourceToEdit] = useState(null);
  const [isDisableOpen, setDisableOpen] = useState(false);

  const [projects] = useState([
    { id: 1, name: "WINDBREAKER SOLUTIONS" },
    { id: 2, name: "HP TECHNLOGY" },
  ]);

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      window.location.href = '/login';
      return;
    }
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Verificar que el usuario esté autenticado
      if (!authService.isAuthenticated()) {
        throw new Error('No authenticated');
      }

      // Usar la instancia de axios configurada que incluye automáticamente el token
      // Cambiar la URL al endpoint correcto
      const response = await api.get('http://localhost:8080/api/recursos');
      const resourcesFromApi = response.data;
      // Mapear los campos del backend a los del frontend
      const formattedResources = resourcesFromApi.map((r) => ({
        id: r.recursoId,
        name: r.nombreRecurso,
        description: r.descripcionRecurso,
        availability: r.estado === 'Disponible' ? 'Available' : r.estado,
        cost: r.coste,
        type: r.tipo,
        unit_measure: r.cantidad,
      }));
      setResources(formattedResources);
    } catch (err) {
      console.error("Error loading resources:", err);
      
      // Manejo específico de errores
      if (err.response?.status === 401) {
        // Token expirado o inválido - el interceptor ya maneja esto
        setError("Session expired. Please login again.");
        authService.logout();
      } else if (err.response?.status === 403) {
        setError("You don't have permission to view resources.");
      } else if (err.message === 'No authenticated') {
        setError("Please login to continue.");
        authService.logout();
      } else {
        setError("Error loading resources. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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

      // Obtener el usuario autenticado para asignadoPor
      const assignedBy = authService.getCurrentUserId ? authService.getCurrentUserId() : 50; // fallback demo

      console.log("Assigning resource:", { recursoId: resourceId, proyectoId: projectId, asignadoPor: assignedBy });

      // Realizar la petición al backend
      const response = await api.post('http://localhost:8080/api/recursos-proyecto', {
        recursoId: resourceId,
        proyectoId: projectId,
        asignadoPor: assignedBy
      });

      if (response.status === 200) {
        console.log("Resource assigned successfully.");
      } else {
        throw new Error("Failed to assign resource.");
      }

      await loadResources();
      setAssignOpen(false);
    } catch (error) {
      console.error("Error assigning resource:", error);
      setError("Error assigning resource. Please try again.");
    }
  };

  const handleUpdateResource = async (updatedResource) => {
    try {
      // Construir el body con los campos esperados por el backend
      const body = {
        nombreRecurso: updatedResource.name,
        descripcionRecurso: updatedResource.description,
        estado: updatedResource.availability === 'Available' ? 'Disponible' : updatedResource.availability,
        coste: updatedResource.cost,
        cantidad: updatedResource.unit_measure,
        tipo: updatedResource.type,
      };
      // Hacer la petición PUT al endpoint con el id del recurso
      await api.put(`http://localhost:8080/api/recursos/${updatedResource.id}`, body);
      await loadResources();
      setUpdateOpen(false);
      setResourceToEdit(null);
    } catch (error) {
      console.error("Error updating resource:", error);
      setError("Error updating resource. Please try again.");
    }
  };

  const handleDisableResource = async (id) => {
    try {
      await api.patch(`http://localhost:8080/api/recursos/${id}`, { estado: "Inactivo" });
      await loadResources();
      setDisableOpen(false);
      setSelectedResourceId(null);
    } catch (error) {
      console.error("Error disabling resource:", error);
      setError("Error disabling resource. Please try again.");
    }
  };

  const handleRefresh = () => {
    loadResources();
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
          onRefresh={handleRefresh}
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
                onClick={handleRefresh}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
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
                  onClick={() => {
                    setSelectedResourceId(resource.id);
                    setSelectedResource(resource);
                  }}
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
              {resources.length === 0 && !isLoading && !error && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-icons text-4xl text-gray-300">inventory_2</span>
                      <span>No resources found.</span>
                      <button 
                        onClick={handleRefresh}
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

