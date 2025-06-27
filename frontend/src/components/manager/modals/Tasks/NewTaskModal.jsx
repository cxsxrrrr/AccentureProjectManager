import React, { useState, useEffect } from "react";
import taskIcon from "../../../../assets/icons/task.svg"; // O el icono que prefieras

function NewTaskModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    task: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (isOpen) setForm({ task: "", assignedTo: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, status: "To Do" }); // status fijo
    // Puedes cerrar aquí si lo prefieres: onClose();
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
            <h2 className="text-3xl font-bold">Register New Task</h2>
            <p className="text-sm text-gray-500">Complete the information to create a new task</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-4xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Info */}
          <div>
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
              {/* Status fijo */}
              <div className="font-semibold text-sm mt-2">
                Status:{" "}
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold ml-2">
                  To Do
                </span>
              </div>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;
