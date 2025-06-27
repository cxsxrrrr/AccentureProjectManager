import React, { useState, useEffect } from "react";

export default function UpdateUserStep2({
  values,
  categories,
  skills,
  onBack,
  onSave,
  onCancel,
}) {
  const [local, setLocal] = useState({
    email: "",
    numeroTelefono: "",
    categoria: "",
    habilidades: [],
  });

  // Precargar datos cuando abres la modal (con body en español)
  useEffect(() => {
    setLocal({
      email: values.email || "",
      numeroTelefono: values.numeroTelefono || "",
      categoria: values.categoria || "",
      habilidades: values.habilidades || [],
    });
  }, [values]);

  // Manejar cambios de campos
  const handleChange = (e) => {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Skills (habilidades)
  const handleSkillToggle = (skill) => {
    setLocal((prev) => ({
      ...prev,
      habilidades: prev.habilidades.includes(skill)
        ? prev.habilidades.filter((s) => s !== skill)
        : [...prev.habilidades, skill],
    }));
  };

  // Guardar
  const handleSubmit = (e) => {
    e.preventDefault();
    // Devuelve body en español
    onSave(local);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-center mb-3 gap-3">
        <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
          <i className="material-icons">person</i>
        </span>
        <div>
          <h2 className="text-2xl font-bold">Update User</h2>
          <p className="text-sm text-gray-500">
            Complete the information to update user account
          </p>
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
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
          <span className="text-xl bg-purple-100 p-1 rounded">
            <i className="material-icons">mail</i>
          </span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">Email *</label>
          <input
            name="email"
            type="email"
            value={local.email}
            onChange={handleChange}
            required
            placeholder="example@correo.com"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Phone number *</label>
          <input
            name="numeroTelefono"
            value={local.numeroTelefono}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4456"
            className="mb-2 border rounded w-full px-3 py-2"
          />
        </div>
      </div>
      {/* Categoría y Skills */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
          <span className="text-xl bg-purple-100 p-1 rounded">
            <i className="material-icons">check_circle</i>
          </span>
          Category & Skills
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">Category *</label>
          <select
            name="categoria"
            value={local.categoria}
            onChange={handleChange}
            required
            className="mb-2 border rounded w-full px-3 py-2"
          >
            <option value="">Select Category</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <label className="font-semibold text-sm">Skills *</label>
          <div className="flex flex-wrap gap-2">
            {(skills || []).map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-lg border font-semibold text-sm transition ${
                  local.habilidades.includes(skill)
                    ? "bg-purple-600 text-white border-purple-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => onBack(local)}
          className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
