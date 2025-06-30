import React, { useState, useEffect } from "react";
import helpIcon from "../../../../assets/icons/help.svg";
import api from "../../../../services/axios";

function UnassignProjectModal({ isOpen, onClose, onUnassign, user }) {
  // Permitir seleccionar el proyecto por nombre o id
  const [selectedProject, setSelectedProject] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Actualiza el proyecto seleccionado si cambia el usuario
  useEffect(() => {
    // Si el usuario tiene proyectos asignados, selecciona el primero por defecto
    if (user && Array.isArray(user.proyectosAsignados) && user.proyectosAsignados.length > 0) {
      setSelectedProject(user.proyectosAsignados[0].proyectoId || user.proyectosAsignados[0].nombreProyecto);
    } else {
      setSelectedProject("");
    }
  }, [user]);

  const handleUnassign = async () => {
    if (!canUnassign || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      // Busca el proyecto seleccionado en la lista de proyectos asignados
      const proyectoObj = Array.isArray(user.proyectosAsignados)
        ? user.proyectosAsignados.find(
            p => p.proyectoId === selectedProject || p.nombreProyecto === selectedProject
          )
        : null;
      const proyectoId = proyectoObj ? proyectoObj.proyectoId : selectedProject;
      await api.post("/asignaciones/unassign", {
        usuarioId: user.id || user.usuarioId,
        proyectoId: proyectoId,
      });
      if (onUnassign) onUnassign(user);
      onClose();
    } catch (err) {
      setError("Error unassigning user from project.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-gray-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={helpIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Unassign Project</h2>
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
        {/* User Info */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8 flex flex-wrap justify-between">
          <div className="text-sm text-gray-500">
            <div className="font-semibold mb-1">User Details</div>
            <div>Name: <span className="font-medium">{user.nombre || user.name || "-"}</span></div>
            <div>Email: <span className="font-medium">{user.email || "-"}</span></div>
            <div>Role: <span className="font-medium">{user.rol?.nombre || user.role || "-"}</span></div>
            <div>ID Document: <span className="font-medium">{user.cedula || "-"}</span></div>
            <div>
              Current Status:{" "}
              <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold
                ${user.status === "Active" || user.status === "Activo"
                  ? "bg-green-100 text-green-700"
                  : user.status === "Unassigned" || user.status === "Sin asignar"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-600"
                }`}>
                {user.status || "-"}
              </span>
            </div>
          </div>
        </div>
        {/* Proyecto asignado */}
        <div className="mb-6">
          <div className="font-medium mb-2">Select a project to unassign the employee</div>
          {Array.isArray(user.proyectosAsignados) && user.proyectosAsignados.length > 0 ? (
            <div className="flex flex-col gap-2">
              {user.proyectosAsignados.map((p) => (
                <div
                  key={p.proyectoId}
                  className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 cursor-pointer
                    ${selectedProject === p.proyectoId
                      ? "bg-red-600/90 border-red-600 text-white"
                      : "bg-gray-200/70 border-gray-300 text-gray-400"
                    }
                    text-lg font-semibold mb-1 transition
                  `}
                  onClick={() => setSelectedProject(p.proyectoId)}
                >
                  <span>{p.nombreProyecto}</span>
                  {selectedProject === p.proyectoId && (
                    <span className="material-icons text-2xl">check</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 px-5 py-4">No project assigned</div>
          )}
        </div>
        {/* Error message */}
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}
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
            disabled={!canUnassign || submitting}
            onClick={handleUnassign}
            className={`
              px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2
              ${!canUnassign || submitting ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {submitting ? "Unassigning..." : "Unassign"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnassignProjectModal;