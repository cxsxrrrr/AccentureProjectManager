import React, { useState } from "react";

export default function UpdateUserStep1({ values, onNext, onCancel }) {
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
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cedulaError, setCedulaError] = useState("");

  // Calcula el máximo para el date input (hoy menos 18 años)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy - 18}-${mm}-${dd}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/.test(value)) {
        setNameError("Only letters and spaces allowed");
      } else {
        setNameError("");
      }
    }
    if (name === "apellido") {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/.test(value)) {
        setLastNameError("Only letters and spaces allowed");
      } else {
        setLastNameError("");
      }
    }
    if (name === "cedula") {
      if (!/^\d*$/.test(value)) {
        setCedulaError("Only numbers allowed");
      } else {
        setCedulaError("");
      }
    }
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
    let valid = true;
    // Validación nombre
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(local.nombre)) {
      setNameError("Only letters and spaces allowed");
      valid = false;
    }
    // Validación apellido
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(local.apellido)) {
      setLastNameError("Only letters and spaces allowed");
      valid = false;
    }
    // Validación cédula
    if (!/^\d+$/.test(local.cedula)) {
      setCedulaError("Only numbers allowed");
      valid = false;
    }
    // Validación fecha nacimiento
    if (!local.fechaNacimiento || local.fechaNacimiento > maxDate) {
      setBirthError(
        "The user must be at least 18 years old and date cannot be in the future."
      );
      valid = false;
    }
    if (!valid) return;
    setBirthError("");
    onNext(local);
  };

  // Validacion de cifras mayores a 8
  const handleSizeValue = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length < 9) {
      handleChange(e); // Tu función normal
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      {/* Header */}
      <div className="flex items-center mb-6 gap-3">

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
          <span className="text-lg"></span> Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">First Name *</label>
          <input
            name="nombre"
            value={local.nombre}
            onChange={handleChange}
            required
            placeholder="Enter first name"
            className={`mb-2 border rounded w-full px-3 py-2 ${nameError ? "border-red-400" : ""}`}
            maxLength={30}
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]*"
            title="Only letters and spaces allowed"
          />
          {nameError && <div className="text-red-500 text-xs -mt-2 mb-2">{nameError}</div>}
          <label className="font-semibold text-sm">Last Name *</label>
          <input
            name="apellido"
            value={local.apellido}
            onChange={handleChange}
            required
            placeholder="Enter last name"
            className={`mb-2 border rounded w-full px-3 py-2 ${lastNameError ? "border-red-400" : ""}`}
            maxLength={30}
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]*"
            title="Only letters and spaces allowed"
          />
          {lastNameError && <div className="text-red-500 text-xs -mt-2 mb-2">{lastNameError}</div>}
          <label className="font-semibold text-sm">Birth date *</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={local.fechaNacimiento}
            onChange={handleChange}
            required
            className={`mb-2 border rounded w-full px-3 py-2 ${
              birthError ? "border-red-400" : ""
            }`}
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
          <label className="block text-sm font-medium mb-1">
            Document Number *
          </label>
          <input
            name="cedula"
            value={local.cedula}
            onChange={handleChange}
            required
            placeholder="Enter document number"
            className={`mb-2 border rounded w-full px-3 py-2 ${cedulaError ? "border-red-400" : ""}`}
            maxLength={15}
            pattern="\d*"
            title="Only numbers allowed"
            inputMode="numeric"
          />
          {cedulaError && <div className="text-red-500 text-xs -mt-2 mb-2">{cedulaError}</div>}
          <label className="block text-sm font-medium mb-1">
            New Password (Leave empty to keep current)
          </label>
          <div className="relative">
            <input
              name="password"
              value={local.password}
              onChange={handleChange}
              placeholder="Enter new password or leave empty"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // 👁️‍🗨️ Ojo cerrado (slash)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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