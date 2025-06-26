import React, { useState } from "react";
import projectIcon from "../../../../assets/icons/project.svg"; // Ajusta el path si es necesario

function NewProjectModal({ isOpen, onClose, onSave, clients = [], managers = [] }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    client: "",
    manager: "",
    // NO status aquí
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Añade status: "Active" al objeto que se envía
    onSave({ ...form, status: "Active" });
    onClose(); // Puedes cerrar aquí o en el parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={projectIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Register New Project</h2>
            <p className="text-sm text-gray-500">Complete the information to create a new project</p>
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
          {/* Project Info */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
              <span className="text-xl bg-purple-100 p-1 rounded">
                <img src={projectIcon} alt="" className="w-6 h-6" />
              </span>
              Project Information
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <label className="font-semibold text-sm">
                Title *
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter project title"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Description *
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter project description"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Start Date *
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Estimated End Date *
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Client *
                <select
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  required
                  className="mt-1 border rounded w-full px-3 py-2"
                >
                  <option value="">Client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
              <label className="font-semibold text-sm">
                Manager *
                <input
                  name="manager"
                  value={form.manager}
                  onChange={handleChange}
                  required
                  placeholder="Enter project manager"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
                {/* Si prefieres un dropdown:
                <select
                  name="manager"
                  value={form.manager}
                  onChange={handleChange}
                  required
                  className="mt-1 border rounded w-full px-3 py-2"
                >
                  <option value="">Manager</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
                */}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectModal;
