import React, { useState, useEffect } from "react";

export default function AssignResourceModal({
  isOpen,
  onClose,
  onAssign,
  projects = [],
  resources = [],
}) {
  const [form, setForm] = useState({ resourceName: "", projectId: null });
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  // Reinicia estado cuando se abre/cierra
  useEffect(() => {
    if (!isOpen) {
      setForm({ resourceName: "", projectId: null });
      setSearch("");
      setErrors({});
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

  // Filtrado de proyectos
  const filteredProjects = projects.filter((proj) =>
    proj.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-2 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Assign Resource</h2>

        <label className="block mb-3 font-semibold text-base">
          Resource Name *
          <input
            type="text"
            name="resourceName"
            className={`block mt-1 w-full border rounded-lg px-4 py-2 focus:outline-purple-500 ${
              errors.resourceName ? "border-red-400" : ""
            }`}
            placeholder="Enter Resource name"
            value={form.resourceName}
            onChange={handleChange}
          />
          {errors.resourceName && (
            <div className="text-red-500 mt-1 text-sm">{errors.resourceName}</div>
          )}
        </label>

        <div className="mb-2 font-semibold text-base">Select Project *</div>
        <input
          className={`w-full border rounded-lg px-4 py-2 mb-3 focus:outline-purple-500 ${
            errors.projectId ? "border-red-400" : ""
          }`}
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
                ${form.projectId === proj.id
                  ? "bg-purple-100 border-purple-400"
                  : "hover:bg-gray-50 border-gray-300"
                }`}
              onClick={() => setForm((prev) => ({ ...prev, projectId: proj.id }))}
            >
              {proj.name}
            </div>
          ))}
        </div>
        {errors.projectId && (
          <div className="text-red-500 mt-1 text-sm">{errors.projectId}</div>
        )}
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
            disabled={!form.resourceName || !form.projectId}
            onClick={handleSubmit}
            type="button"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};
