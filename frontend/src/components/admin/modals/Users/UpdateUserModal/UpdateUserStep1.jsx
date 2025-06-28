import React, { useState, useEffect } from "react";

export default function UpdateUserStep1({ values, onNext, onCancel }) {
  const [local, setLocal] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    genero: "",
    cedula: "",
    password: ""
  });

  useEffect(() => {
    setLocal({
      nombre: values.nombre || "",
      apellido: values.apellido || "",
      fechaNacimiento: values.fechaNacimiento || "",
      genero: values.genero || "",
      cedula: values.cedula || "",
      password: values.password || ""
    });
  }, [values]);

  const [showPassword, setShowPassword] = useState(false);

  // Validar edad mínima 18 y que la fecha no sea futura
  const validateDate = (date) => {
    const now = new Date();
    const birthday = new Date(date);
    const minAge = 18;
    const diff = now.getFullYear() - birthday.getFullYear();
    if (
      date &&
      (birthday > now ||
        diff < minAge ||
        (diff === minAge &&
          now < new Date(birthday.setFullYear(birthday.getFullYear() + minAge))))
    ) {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDate(local.fechaNacimiento)) {
      alert("The birth date must be valid, user must be at least 18 years old and not a future date.");
      return;
    }
    onNext(local);
  };

    const handleSizeValue = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length < 9) {
      handleChange(e); // Tu función normal
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
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
                name="nombre"
                value={local.nombre}
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
                name="apellido"
                value={local.apellido}
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
                name="fechaNacimiento"
                value={local.fechaNacimiento}
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
                name="genero"
                value={local.genero}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      {/* Identity Document & Password */}
      <div>
        <h3 className="text-md font-semibold text-purple-600 flex items-center gap-2 mb-3">
          <span className="text-lg"><i className="material-icons">description</i></span> Identity Document & Password
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Document Number *
              <input
                name="cedula"
                value={local.cedula}
                onChange={handleSizeValue}
                required
                type="number"
                className="mb-2 border rounded w-full px-3 py-2"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password *
              <div className="relative">
                <input
                  name="password"
                  value={local.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  className="mb-2 border rounded w-full px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.94 17.94C16.12 19.2 14.14 20 12 20 5 20 1.5 12 1.5 12c.95-1.9 2.32-4.15 4.33-6.06M10.12 6.13C10.72 6.04 11.35 6 12 6c7 0 10.5 7 10.5 7-.6 1.21-1.39 2.57-2.41 3.88M9.59 9.59a3 3 0 0 1 4.24 4.24" />
                      <path d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
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
