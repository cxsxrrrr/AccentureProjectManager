import React, { useState } from "react";

export default function CreateRoleModal({ isOpen, toggle, onCreate }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(e => ({ ...e, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Role name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onCreate(form);
    toggle();
    setForm({ name: "", description: "" });
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
          >×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-2xl font-bold mb-2">Role Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter role name"
              className={`mt-1 w-full rounded border px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 ${errors.name && "border-red-400"}`}
              autoFocus
            />
            {errors.name && <div className="text-red-500 mt-1 text-sm">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-2xl font-bold mb-2">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter role description"
              rows={5}
              className={`mt-1 w-full rounded border px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 resize-none ${errors.description && "border-red-400"}`}
            />
            {errors.description && <div className="text-red-500 mt-1 text-sm">{errors.description}</div>}
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
