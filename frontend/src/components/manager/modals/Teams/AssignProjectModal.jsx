
import React, { useState, useEffect } from "react";
import helpIcon from "../../../../assets/icons/help.svg";
import api from "../../../../services/axios";

function AssignProjectModal({ isOpen, onClose, onAssign, user, projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedProject(null);
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  // IDs de proyectos ya asignados al usuario
  const assignedProjectIds = Array.isArray(user.proyectosAsignados)
    ? user.proyectosAsignados.map(p => p.proyectoId || p.id || p._id)
    : [];

  // Normalizar proyectos
  const normalizedProjects = Array.isArray(projects)
    ? projects
        .filter(p => p && (p.nombreProyecto || p.name || p.nombre))
        .map(p => ({
            _id: p.proyectoId || p.id || p._id,
            _nombre: p.nombreProyecto || p.name || p.nombre,
            _cliente: p.cliente?.nombre || 
                     (p.cliente && typeof p.cliente === 'object' ? (p.cliente.nombre || p.cliente.name) : p.cliente) || 
                     "Sin cliente"
        }))
    : [];

  // No permitir seleccionar proyectos ya asignados
  const availableProjects = normalizedProjects.filter(
    p => !assignedProjectIds.includes(p._id)
  );

  const handleSelect = (projectId) => setSelectedProject(projectId);

  const handleAssign = async () => {
    if (!selectedProject || submitting) return;
    // Validar que el proyecto no esté ya asignado
    if (assignedProjectIds.includes(selectedProject)) {
      setError("Este usuario ya tiene asignado este proyecto.");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const projectObj = normalizedProjects.find(p => p._id === selectedProject);
      if (!projectObj) {
        throw new Error("Proyecto no encontrado");
      }

      const payload = {
        usuarioId: user.id || user.usuarioId,
        proyectoId: projectObj._id,
        fechaAsignacion: new Date().toISOString().slice(0, 10),
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
    } catch (err) {
      console.error("Error assigning project:", err);
      setError(err.response?.data?.message || "Error assigning user to project.");
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

        {/* No warning: ahora se pueden asignar múltiples proyectos */}

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
            `}>
              {user.status || "-"}
            </span>
          </div>
        </div>

        {/* Error/Success messages */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-700 bg-green-100 px-3 py-2 rounded font-semibold">
            ✅ User assigned to project successfully!
          </div>
        )}

        {/* Project Selection */}
        <div>
          <div className="mb-3 font-semibold text-gray-800">
            Select a project to assign the employee
            <span className="text-sm text-gray-500 ml-2">
              ({normalizedProjects.length} projects available)
            </span>
          </div>
          
          <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-2">
            {availableProjects.length === 0 ? (
              <div className="text-gray-400 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="font-semibold">No projects available</p>
                <p className="text-sm mt-1">Todos los proyectos ya han sido asignados a este usuario.</p>
              </div>
            ) : (
              availableProjects.map((project, idx) => (
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
              ))
            )}
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