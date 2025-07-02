// AssignResourceModal.jsx
import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

const AssignResourceModal = ({ isOpen, onClose, onAssign, resources, setResources, onSubmit }) => {
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
            const seen = new Set();
            const formattedProjects = res.data.map((item) => item.proyecto)
              .filter((p) => {
                if (seen.has(p.proyectoId)) return false;
                seen.add(p.proyectoId);
                return true;
              })
              .map((p) => ({
                id: p.proyectoId,
                name: p.nombreProyecto,
                raw: p
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
        proyectoId: selectedProject.id,
        asignadoPor: user.usuarioId
      };
      const response = await api.post('http://localhost:8080/api/recursos-proyecto', body);
      if (response.status === 200 || response.status === 201) {
        await api.put(`/recursos/${selectedResourceId}`, { estado: "Inactive" });
        if (setResources) {
          setResources(prev => prev.map(r =>
            r.recursoId === selectedResourceId ? { ...r, estado: "Inactive" } : r
          ));
        }
        alert("Resource assigned successfully.");
        if (onSubmit) await onSubmit();
        onClose();
      } else {
        throw new Error("Failed to assign resource. Unexpected status code.");
      }
    } catch (err) {
      // Custom error message for already assigned resource
      const backendMsg = err.response?.data?.message || err.message || "";
      if (
        backendMsg.toLowerCase().includes("ya está asignado") ||
        backendMsg.toLowerCase().includes("already assigned") ||
        backendMsg.toLowerCase().includes("recurso ya asignado")
      ) {
        alert("Este recurso ya está asignado a un proyecto.");
      } else {
        alert("Error assigning resource: " + backendMsg);
      }
    }
  };

  if (!isOpen) return null;

  const normalizedResources = resources.map((r) => ({
    id: r.id || r.recursoId,
    name: r.name || r.nombreRecurso,
    type: r.type || r.tipo,
    availability: r.availability || r.disponibilidad || r.estado,
    cost: r.cost || r.coste,
    unit_measure: r.unit_measure || r.unit || r.cantidad,
    description: r.description || r.descripcionRecurso,
    raw: r
  }));

  const filteredResources = normalizedResources
    .filter((r) => (r.name || "").toLowerCase().includes(resourceSearch.trim().toLowerCase()))
    .filter((r) => r.availability === "Available" || r.availability === "Disponible");

  const filteredProjects = projects.filter((p) =>
    (p.name || "").toLowerCase().includes(projectSearch.trim().toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-2 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Assign Resource</h2>

        <div className="mb-2 font-semibold text-base">Select Resource *</div>
        <input
          type="text"
          className="block w-full mb-3 border rounded-lg px-4 py-2 focus:outline-purple-500"
          placeholder="Search resource..."
          value={resourceSearch}
          onChange={(e) => {
            // Allow only letters, numbers, hyphens, and parentheses
            let value = e.target.value.replace(/[^a-zA-Z0-9\-()]/g, "");
            setResourceSearch(value);
          }}
        />
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {filteredResources.length === 0 ? (
            <div className="text-gray-400 px-4 py-3">No resources found.</div>
          ) : (
            filteredResources.map((r) => (
              <div
                key={r.id}
                className={`px-4 py-3 rounded border cursor-pointer font-semibold flex items-center justify-between transition ${selectedResourceId === r.id ? "bg-purple-100 border-purple-400" : "hover:bg-gray-50 border-gray-300"}`}
                onClick={() => setSelectedResourceId(r.id)}
              >
                <span>{r.name}</span>
                {selectedResourceId === r.id && <span>✓</span>}
              </div>
            ))
          )}
        </div>

        <div className="mb-2 font-semibold text-base">Select Project *</div>
        <input
          type="text"
          className="block w-full mb-3 border rounded-lg px-4 py-2 focus:outline-purple-500"
          placeholder="Search project..."
          value={projectSearch}
          onChange={(e) => {
            // Allow only letters, numbers, hyphens, and parentheses
            let value = e.target.value.replace(/[^a-zA-Z0-9\-()]/g, "");
            setProjectSearch(value);
          }}
        />
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {filteredProjects.length === 0 ? (
            <div className="text-gray-400 px-4 py-3">No projects found.</div>
          ) : (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                className={`px-4 py-3 rounded border cursor-pointer font-semibold flex items-center justify-between transition ${selectedProject && selectedProject.id === p.id ? "bg-purple-100 border-purple-400" : "hover:bg-gray-50 border-gray-300"}`}
                onClick={() => setSelectedProject(p)}
              >
                <span>{p.name}</span>
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
