import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

const AssignResourceModal = ({ isOpen, onClose, onAssign }) => {
  const [resourceName, setResourceName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  // Reinicia estado cuando se abre/cierra
  useEffect(() => {
    if (!isOpen) {
      setResourceName("");
      setSelectedProjectId(null);
      setSearch("");
      setProjects([]);
    }
    if (isOpen) {
      // fetch user-associated projects
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.usuarioId) {
        api
          .get(`/miembros-proyectos/usuario/${user.usuarioId}`)
          .then((res) => setProjects(res.data))
          .catch(() => setProjects([]));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtrado de proyectos
  const filteredProjects = projects.filter((proj) =>
    proj.proyecto.nombreProyecto
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-2 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Assign Resource</h2>

        <label className="block mb-3 font-semibold text-base">
          Resource Name *
          <input
            type="text"
            className="block mt-1 w-full border rounded-lg px-4 py-2 focus:outline-purple-500"
            placeholder="Enter Resource name"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
          />
        </label>

        <div className="mb-2 font-semibold text-base">Select Project *</div>
        <input
          className="w-full border rounded-lg px-4 py-2 mb-3 focus:outline-purple-500"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {filteredProjects.length === 0 && (
            <div className="text-gray-400 px-4 py-3">No projects found.</div>
          )}
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`px-4 py-3 rounded border cursor-pointer text-base font-bold flex items-center transition
                ${
                  selectedProjectId === proj.id
                    ? "bg-purple-100 border-purple-400"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              onClick={() => setSelectedProjectId(proj.id)}
            >
              {proj.proyecto.nombreProyecto}
            </div>
          ))}
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
            disabled={!resourceName || !selectedProjectId}
            onClick={() => {
              onAssign({
                resourceName,
                projectId: selectedProjectId,
              });
            }}
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
