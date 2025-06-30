import React, { useState } from "react";
import helpIcon from "../../../../assets/icons/help.svg"; // Cambia el path si es necesario
import api from "../../../../services/axios"; // Ajusta el path si es necesario

function AssignProjectModal({ isOpen, onClose, onAssign, user, projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Restricción: no permitir abrir ni mostrar nada si el usuario ya tiene proyectos asignados
  const alreadyAssigned = Array.isArray(user?.proyectosAsignados) && user.proyectosAsignados.length > 0;
  if (!isOpen || !user || alreadyAssigned) return null;

  // Normaliza proyectos para mostrar solo nombre y cliente
  const normalizedProjects = Array.isArray(projects)
    ? projects
        .filter(p => p && (p.nombreProyecto || p.name || p.nombre))
        .map(p => ({
            _id: p.id || p.proyectoId || p._id,
            _nombre: p.nombreProyecto || p.name || p.nombre,
            _cliente: p.cliente?.nombre || (p.cliente && (p.cliente.nombre || p.cliente.name)) || ""
        }))
    : [];

  const handleSelect = (projectId) => setSelectedProject(projectId);

  const handleAssign = async () => {
    if (!selectedProject || submitting) return;
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // Buscar el objeto del proyecto por id
      const projectObj = normalizedProjects.find(
        (p) => p._id === selectedProject
      );
      const projectId = projectObj ? projectObj._id : undefined;
      // Payload esperado por el backend
      const payload = {
        usuarioId: user.id || user.usuarioId,
        proyectoId: projectId,
        fechaAsignacion: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
        fechaDesignacion: null,
        capacidadMaxima: 5.0,
        disponibilidad: true
      };
      await api.post("/miembros-proyectos", payload);
      setSuccess(true);
      if (onAssign) onAssign(selectedProject);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
      setError("");
    } catch (err) {
      setError("Error assigning user to project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-gray-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={helpIcon} alt="" className="w-10 h-10" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Assign to Project</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* User Details */}
        <div className="bg-gray-50 rounded-xl px-6 py-4 mb-7 flex flex-wrap justify-between items-center">
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div><span className="font-semibold">Name:</span> {user.nombre || user.name || "-"}</div>
            <div><span className="font-semibold">Email:</span> {user.email || "-"}</div>
            <div><span className="font-semibold">Role:</span> {user.rol?.nombre || user.role || "-"}</div>
            <div><span className="font-semibold">ID Document:</span> {user.cedula || "-"}</div>
          </div>
          <div>
            <div className="text-right text-gray-500 text-sm mb-1">Current Status:</div>
            <span className={`px-3 py-1 rounded-full font-bold text-xs
              ${user.status === "Active" || user.status === "Activo"
                ? "bg-green-100 text-green-700"
                : user.status === "Unassigned" || user.status === "Sin asignar"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
              }
            `}>{user.status || "-"}</span>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded">{error}</div>}
        {success && <div className="mb-4 text-green-700 bg-green-100 px-3 py-2 rounded font-semibold">User assigned to project successfully!</div>}

        {/* Project Selection */}
        <div>
          <div className="mb-3 font-semibold text-gray-800">
            Select a project to assign the employee
          </div>
          <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-2">
            {normalizedProjects.length === 0 && (
              <div className="text-gray-400 text-center py-4">No projects found.</div>
            )}
            {normalizedProjects.map((project, idx) => (
              <button
                type="button"
                key={project._id || idx}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border 
                  transition font-medium text-base flex items-center justify-between
                  ${selectedProject === project._id
                    ? "bg-purple-100 border-purple-300 ring-2 ring-purple-200"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                  }
                `}
                onClick={() => handleSelect(project._id)}
              >
                <span className="font-semibold">{project._nombre}</span>
                <span className="text-xs text-gray-500 ml-2">{project._cliente}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedProject || submitting}
            onClick={handleAssign}
            className={`px-8 py-2 rounded-xl font-semibold transition
              ${selectedProject && !submitting
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-purple-200 text-white cursor-not-allowed"
              }`}
          >
            {submitting ? "Assigning..." : "✓ Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignProjectModal;