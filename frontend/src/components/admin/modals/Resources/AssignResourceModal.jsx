import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

const AssignResourceModal = ({ isOpen, onClose, onAssign, resources }) => {
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [resourceSearch, setResourceSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectSearch, setProjectSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedResourceId(null);
      setResourceSearch("");
      setSelectedProjectId(null);
      setProjectSearch("");
      setProjects([]);
    }
    if (isOpen) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.usuarioId) {
        api
          .get(`/miembros-proyectos/usuario/${user.usuarioId}`)
          .then((res) => setProjects(res.data))
          .catch(() => setProjects([]));
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.resourceName.trim()) errs.resourceName = "Resource name is required";
    if (!form.projectId) errs.projectId = "Project is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAssign({
      resourceName: form.resourceName,
      projectId: form.projectId,
    });
    onClose();
  };

  if (!isOpen) return null;

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
  const filteredProjects = projects.filter((p) =>
    p.proyecto.nombreProyecto.toLowerCase().includes(projectSearch.trim().toLowerCase())
  );

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
                  ${selectedProjectId === p.id
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-50 border-gray-300"
                  }`}
                onClick={() => setSelectedProjectId(p.id)}
              >
                <span>{p.proyecto.nombreProyecto}</span>
                {selectedProjectId === p.id && <span>✓</span>}
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
            disabled={!selectedResourceId || !selectedProjectId}
            onClick={() => onAssign({ resourceId: selectedResourceId, projectId: selectedProjectId })}
            type="button"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};
