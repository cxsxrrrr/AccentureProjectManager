import React, { useState, useEffect } from "react";

const STATUS_OPTIONS = [
  { value: "NO INICIADA", label: "No Iniciada" },
  { value: "EN_PROGRESO", label: "En progreso" },
  { value: "Completada", label: "Completada" },
];

function UpdateStatusModal({ isOpen, onClose, onUpdate, task }) {
  const [status, setStatus] = useState(task?.estado || "No_iniciada");

  useEffect(() => {
    setStatus(task?.estado || "No_iniciada");
  }, [task, isOpen]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl p-8 min-w-[300px] max-w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Update Task Status</h2>
        <div className="mb-3">
          <div className="mb-1 text-gray-500 text-sm">Task:</div>
          <div className="font-semibold text-gray-800">{task.nombre}</div>
          <div className="text-xs text-gray-400">{task.proyecto_nombre}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 text-sm">
            New Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 font-bold shadow"
            onClick={() => onUpdate(status)}
            disabled={task.estado === status}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatusModal;