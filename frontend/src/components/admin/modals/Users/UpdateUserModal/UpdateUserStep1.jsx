import React, { useState } from "react";

export default function UpdateUserStep1({ values, onNext, onCancel }) {
  const [local, setLocal] = useState({
    firstName: values.firstName || "",
    lastName: values.lastName || "",
    birthDate: values.birthDate || "",
    gender: values.gender || "",
    docType: values.docType || "",
    docNumber: values.docNumber || "",
  });

  const handleChange = (e) => {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(local);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
      {/* Header */}
      <div className="flex items-center mb-6 gap-3">
        <span className="text-3xl text-purple-600 bg-purple-100 p-2 rounded-xl">
          <i className="material-icons">person</i>
        </span>
        <div>
          <h2 className="text-xl font-semibold">Update User</h2>
          <p className="text-sm text-gray-500">Complete the information to update user account</p>
        </div>
        <button
          onClick={onCancel}
          className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>
      </div>
      {/* Personal Info */}
      <div>
        <h3 className="text-md font-semibold text-purple-600 flex items-center gap-2 mb-3">
          <span className="text-lg"><i className="material-icons">person</i></span> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name *
              <input
                name="firstName"
                value={local.firstName}
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
                value={local.lastName}
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
                value={local.birthDate}
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
                value={local.gender}
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
      <div className="mt-4">
        <h3 className="text-md font-semibold text-purple-600 flex items-center gap-2 mb-3">
          <span className="text-lg"><i className="material-icons">description</i></span> Identity Document
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Document Type *
              <select
                name="docType"
                value={local.docType}
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
                value={local.docNumber}
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
          onClick={onCancel}
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
  );
}
