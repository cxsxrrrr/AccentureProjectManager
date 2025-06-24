import React, { useState, useEffect } from "react";

export default function UpdateUserModal({ isOpen, toggle, user, onUpdate }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    docType: "",
    docNumber: "",
  });

  // Cuando recibes usuario, precarga los datos
  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="text-3xl text-purple-600">👤</span>
          <div>
            <h2 className="text-xl font-semibold">Update User</h2>
            <p className="text-sm text-gray-500">Complete the information to update user account</p>
          </div>
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
          {/* Personal Info */}
          <div>
            <h3 className="text-md font-semibold text-purple-600 flex items-center gap-2 mb-3">
              <span className="text-lg">👤</span> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name *
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name *
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Birth Date *
                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender *
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Identity Document */}
          <div>
            <h3 className="text-md font-semibold text-purple-600 flex items-center gap-2 mb-3">
              <span className="text-lg">📄</span> Identity Document
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Document Type *
                  <select
                    name="docType"
                    value={form.docType}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Document</option>
                    <option>ID - National identity document</option>
                    <option>Passport</option>
                    <option>Driver's License</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Document Number *
                  <input
                    name="docNumber"
                    value={form.docNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={toggle}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
