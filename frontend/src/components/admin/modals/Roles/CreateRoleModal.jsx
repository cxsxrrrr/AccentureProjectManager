import React, { useState } from "react";

export default function CreateRoleModal({ isOpen, toggle, onCreate }) {
  const [form, setForm] = useState({ name: "", description: "", status: "activo" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    // Solo letras y espacios, longitud máxima 30
    if (!form.name.trim()) {
      errs.name = "Role name is required";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(form.name)) {
      errs.name = "Only letters and spaces are allowed";
    } else if (form.name.length > 30) {
      errs.name = "Role name must be 30 characters or less";
    }
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.status.trim()) errs.status = "Status is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onCreate({
      name: form.name,
      description: form.description,
      status: form.status
    });
    toggle();
    setForm({ name: "", description: "", status: "activo" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative">
        <div className="flex items-start mb-10">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">New Role</h2>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-2xl font-bold mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter role name"
              className={`mt-1 w-full rounded border px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 ${
                errors.name ? "border-red-400" : ""
              }`}
              autoFocus
              maxLength={30}
              pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]*"
              title="Only letters and spaces allowed, max 30 characters"
            />
            {errors.name && (
              <div className="text-red-500 mt-1 text-sm">{errors.name}</div>
            )}
          </div>
          <div>
            <label className="block text-2xl font-bold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter role description"
              rows={5}
              className={`mt-1 w-full rounded border px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 resize-none ${
                errors.description ? "border-red-400" : ""
              }`}
            />
            {errors.description && (
              <div className="text-red-500 mt-1 text-sm">{errors.description}</div>
            )}
          </div>
          <div>
            <label className="block text-2xl font-bold mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`mt-1 w-full rounded border px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 ${
                errors.status ? "border-red-400" : ""
              }`}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
            {errors.status && (
              <div className="text-red-500 mt-1 text-sm">{errors.status}</div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={toggle}
              className="px-8 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition text-lg shadow"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
