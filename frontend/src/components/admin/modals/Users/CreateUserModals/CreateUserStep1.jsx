import React, { useState } from "react";
import user from '../../../../../assets/icons/user.svg'

export default function CreateUserStep1({ values, onNext, onCancel }) {
  const [local, setLocal] = useState({
    firstName: values.firstName,
    lastName: values.lastName,
    birthDate: values.birthDate,
    gender: values.gender,
    docNumber: values.docNumber,
  });

  const handleChange = (e) => {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(local);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      {/* Header */}
      <div className="flex items-center mb-3 gap-3">
        <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500"><i className="material-icons">
        </i> </span>
        <div>
          <h2 className="text-2xl font-bold">Register New User</h2>
          <p className="text-sm text-gray-500">Complete the information to create a new user account</p>
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
      {/* Sección info personal */}
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
          <span className="text-xl bg-purple-100 p-1 rounded"><i className="material-icons"></i></span> Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">First Name *</label>
          <input
            name="firstName"
            value={local.firstName}
            onChange={handleChange}
            required
            placeholder="Enter first name"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Last Name *</label>
          <input
            name="lastName"
            value={local.lastName}
            onChange={handleChange}
            required
            placeholder="Enter last name"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Birth date *</label>
          <input
            type="date"
            name="birthDate"
            value={local.birthDate}
            onChange={handleChange}
            required
            placeholder="mm/dd/yyyy"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Gender *</label>
          <select
            name="gender"
            value={local.gender}
            onChange={handleChange}
            required
            className="mb-2 border rounded w-full px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      {/* Sección documento */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
          <span className="text-xl bg-purple-100 p-1 rounded"><i className="material-icons"></i></span> Identity Document
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="block text-sm font-medium mb-1">Document Number *</label>
          <input
            name="docNumber"
            value={local.docNumber}
            onChange={handleChange}
            required
            placeholder="Enter document number"
            className="mb-2 border rounded w-full px-3 py-2"
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end gap-3 mt-4">
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
