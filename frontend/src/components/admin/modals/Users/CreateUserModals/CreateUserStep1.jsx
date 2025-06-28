import React, { useState } from "react";

export default function CreateUserStep1({ values, onNext, onCancel }) {
  const [local, setLocal] = useState({
    nombre: values.nombre || "",
    apellido: values.apellido || "",
    cedula: values.cedula || "",
    genero: values.genero || "",
    fechaNacimiento: values.fechaNacimiento || "",
    password: values.password || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [birthError, setBirthError] = useState("");

  // Calcula el máximo para el date input (hoy menos 18 años)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy - 18}-${mm}-${dd}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación para la fecha de nacimiento
    if (name === "fechaNacimiento") {
      if (value > maxDate) {
        setBirthError("The user must be at least 18 years old.");
      } else {
        setBirthError("");
      }
    }
    setLocal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación final antes de enviar
    if (!local.fechaNacimiento || local.fechaNacimiento > maxDate) {
      setBirthError("The user must be at least 18 years old and date cannot be in the future.");
      return;
    }
    setBirthError("");
    onNext(local);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      {/* Personal Info */}
      <div className="border-b pb-2 mb-4">
        <h3 className="text-lg font-semibold text-purple-700 mb-3">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">First Name *</label>
          <input
            name="nombre"
            value={local.nombre}
            onChange={handleChange}
            required
            placeholder="Enter first name"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Last Name *</label>
          <input
            name="apellido"
            value={local.apellido}
            onChange={handleChange}
            required
            placeholder="Enter last name"
            className="mb-2 border rounded w-full px-3 py-2"
          />
          <label className="font-semibold text-sm">Birth date *</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={local.fechaNacimiento}
            onChange={handleChange}
            required
            className={`mb-2 border rounded w-full px-3 py-2 ${birthError ? "border-red-400" : ""}`}
            max={maxDate}
          />
          {birthError && (
            <div className="text-red-500 text-xs -mt-2 mb-2">{birthError}</div>
          )}
          <label className="font-semibold text-sm">Gender *</label>
          <select
            name="genero"
            value={local.genero}
            onChange={handleChange}
            required
            className="mb-2 border rounded w-full px-3 py-2"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>
      {/* Document + Password */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-3">
          Identity Document & Password
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="block text-sm font-medium mb-1">Document Number *</label>
          <input
            name="cedula"
            value={local.cedula}
            onChange={handleChange}
            required
            placeholder="Enter document number"
            className="mb-2 border rounded w-full px-3 py-2"
            type="text"
          />
          <label className="block text-sm font-medium mb-1">Password *</label>
          <div className="relative">
            <input
              name="password"
              value={local.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="mb-2 border rounded w-full px-3 py-2 pr-10"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // 👁️‍🗨️ Ojo abierto
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // 👁️‍🗨️ Ojo cerrado (slash)
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M17.94 17.94C16.12 19.2 14.14 20 12 20 5 20 1.5 12 1.5 12c.95-1.9 2.32-4.15 4.33-6.06M10.12 6.13C10.72 6.04 11.35 6 12 6c7 0 10.5 7 10.5 7-.6 1.21-1.39 2.57-2.41 3.88M9.59 9.59a3 3 0 0 1 4.24 4.24" />
                  <path d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}
