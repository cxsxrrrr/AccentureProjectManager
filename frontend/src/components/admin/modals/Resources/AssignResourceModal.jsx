import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

const AssignResourceModal = ({ isOpen, onClose, onAssign, resources }) => {
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [resourceSearch, setResourceSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedResourceId(null);
      setResourceSearch("");
      setSelectedProject(null);
      setProjectSearch("");
      setProjects([]);
    }
    if (isOpen) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.usuarioId) {
        api
          .get(`/miembros-proyectos/usuario/${user.usuarioId}`)
          .then((res) => {
            const formattedProjects = res.data.map((item) => ({
              id: item.proyecto.proyectoId,
              name: item.proyecto.nombreProyecto,
              raw: item.proyecto
            }));
            setProjects(formattedProjects);
          })
          .catch(() => setProjects([]));
      }
    }
  }, [isOpen]);

  const handleAssign = async (e) => {
    if (e) e.preventDefault();

    if (!selectedResourceId || !selectedProject) {
      alert("Please select both a resource and a project.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.usuarioId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const body = {
        recursoId: selectedResourceId,
        proyectoId: selectedProject.id || selectedProject.proyecto?.proyectoId, // Asegurar que se use el ID correcto
        asignadoPor: user.usuarioId
      };

      console.log("Assigning resource with payload:", body);

      // Realizar la petición al backend
      const response = await api.post('http://localhost:8080/api/recursos-proyecto', body);

      if (response.status === 200 || response.status === 201) {
        console.log("Resource assigned successfully.", response.data);
        alert("Resource assigned successfully.");
      } else {
        console.error("Unexpected response status:", response.status, response.data);
        throw new Error("Failed to assign resource. Please check the server logs.");
      }

      onClose();
    } catch (err) {
      alert("Error assigning resource: " + (err.response?.data?.message || err.message));
    }
  };

  if (!isOpen) {
    console.log("Modal is closed");
    return null;
  }

  console.log("Modal is open", { projects, resources });

  // Normaliza recursos a la estructura estándar para el modal
  const normalizedResources = resources.map((r) => ({
    id: r.id || r.recursoId,
    name: r.name || r.nombreRecurso,
    type: r.type || r.tipo,
    availability: r.availability || r.disponibilidad || r.estado,
    cost: r.cost || r.coste,
    unit_measure: r.unit_measure || r.unit || r.cantidad,
    description: r.description || r.descripcionRecurso,
    raw: r // Guarda el objeto original por si se necesita
  }));

  // Filtrar recursos por nombre
  const filteredResources = normalizedResources.filter((r) =>
    (r.name || "").toLowerCase().includes(resourceSearch.trim().toLowerCase())
  );

  // Filter projects by name
  const filteredProjects = projects.filter((p) => {
    const projectName = p.proyecto?.nombreProyecto || "";
    return projectName.toLowerCase().includes(projectSearch.trim().toLowerCase());
  });

  // Corrección de errores de sintaxis en el JSX
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-2 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Assign Resource</h2>

        {/* Resource selector */}
        <div className="mb-2 font-semibold text-base">Select Resource *</div>
        <input
          type="text"
          className="block w-full mb-3 border rounded-lg px-4 py-2 focus:outline-purple-500"
          placeholder="Search resource..."
          value={resourceSearch}
          onChange={(e) => setResourceSearch(e.target.value)}
        />
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {filteredResources.length === 0 ? (
            <div className="text-gray-400 px-4 py-3">No resources found.</div>
          ) : (
            filteredResources.map((r) => (
              <div
                key={r.id}
                className={`px-4 py-3 rounded border cursor-pointer font-semibold flex items-center justify-between transition
                  ${selectedResourceId === r.id
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-50 border-gray-300"
                  }`}
                onClick={() => setSelectedResourceId(r.id)}
              >
                <span>{r.name}</span>
                {selectedResourceId === r.id && <span>✓</span>}
              </div>
            ))
          )}
        </div>

        {/* Project selector */}
        <div className="mb-2 font-semibold text-base">Select Project *</div>
        <input
          type="text"
          className="block w-full mb-3 border rounded-lg px-4 py-2 focus:outline-purple-500"
          placeholder="Search project..."
          value={projectSearch}
          onChange={(e) => setProjectSearch(e.target.value)}
        />
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {filteredProjects.length === 0 ? (
            <div className="text-gray-400 px-4 py-3">No projects found.</div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                className={`px-4 py-3 rounded border cursor-pointer font-semibold flex items-center justify-between transition
                  ${selectedProject && selectedProject.id === p.id
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-50 border-gray-300"
                  }`}
                onClick={() => setSelectedProject(p)}
              >
                <span>{p.name || p.proyecto?.nombreProyecto || "Unknown Project"}</span>
                {selectedProject && selectedProject.id === p.id && <span>✓</span>}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            disabled={!selectedResourceId || !selectedProject}
            onClick={handleAssign}
            type="button"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignResourceModal;
