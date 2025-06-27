import React, { useState, useEffect } from "react";
import taskIcon from "../../../../assets/icons/task.svg"; // Usa tu icono real

const STATUS_OPTIONS = [
  { value: "To Do", label: "To Do" },
  { value: "Completed", label: "Completed" },
];

function UpdateTaskModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    task: "",
    status: "To Do",
  });

  // Cuando abres el modal o cambia la tarea seleccionada, carga los datos
  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        task: initialData.task || "",
        status: initialData.status || "To Do",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...initialData, ...form }); // Para mantener el ID y el assignedTo actual
    // Puedes cerrar aquí o desde el parent
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={taskIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Update Task</h2>
            <p className="text-sm text-gray-500">
              Modify the information for this task
            </p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Info */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
              <span className="text-xl bg-purple-100 p-1 rounded">
                <img src={taskIcon} alt="" className="w-6 h-6" />
              </span>
              Task Information
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <label className="font-semibold text-sm">
                Task Name *
                <input
                  name="task"
                  value={form.task}
                  onChange={handleChange}
                  required
                  placeholder="Enter task name"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Status *
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                  className="mt-1 border rounded w-full px-3 py-2"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTaskModal;
