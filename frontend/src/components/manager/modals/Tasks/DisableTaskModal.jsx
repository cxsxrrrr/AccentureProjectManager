import React from "react";
import helpIcon from "../../../../assets/icons/help.svg"; // Usa cualquier ícono de advertencia

// Asume que usuariosMock está definido global o lo pasas por props/context
const usuariosMock = [
  { usuarioId: 1, name: "Jane Smith" },
  { usuarioId: 2, name: "John Doe" },
  { usuarioId: 3, name: "Carlos Reyes" },
];

// Función para buscar nombre del usuario por ID
function getUserNameById(id) {
  const u = usuariosMock.find((u) => u.usuarioId === Number(id));
  return u ? u.name : "Unknown";
}

function DisableTaskModal({ isOpen, onClose, onDisable, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-red-100 rounded-xl p-2 text-4xl text-red-500">
            <img src={helpIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-2xl font-bold">Disable Task</h2>
            <p className="text-sm text-gray-500">
              This will mark the task as disabled. You can’t assign or complete it while disabled.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-red-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        {/* Info */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <div className="font-medium mb-2">Task:</div>
          <div className="text-lg font-bold">{task.nombre}</div>
          <div className="text-gray-500">
            Created by:{" "}
            <span className="font-semibold">
              {getUserNameById(task.creadoPor?.usuarioId)}
            </span>
          </div>
          <div className="text-gray-500 mt-1">
            <span className="font-semibold">Status:</span>{" "}
            {task.estado === "NO_INICIADA" && "Not Started"}
            {task.estado === "EN_PROGRESO" && "In Progress"}
            {task.estado === "COMPLETADA" && "Completed"}
            {task.estado === "BLOQUEADA" && "Blocked"}
            {task.estado === "DISABLED" && "Disabled"}
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onDisable(task)}
            className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2"
          >
            <span className="material-icons text-lg">block</span>
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisableTaskModal;
