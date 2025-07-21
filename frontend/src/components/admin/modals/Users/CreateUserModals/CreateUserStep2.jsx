
import React, { useState, useMemo, useEffect } from "react";


export default function CreateUserStep2({
  values,
  categories,
  skills,
  roles = [],
  isLoadingData,
  onBack,
  onSave,
  onCancel,
}) {
  const [local, setLocal] = useState({
    numeroTelefono: values.numeroTelefono || "",
    email: values.email || "",
    categoria: values.categoria || "",
    habilidades: values.habilidades || [],
    rol: values.rol || "",
  });
  const [phoneError, setPhoneError] = useState("");

  const [emailError, setEmailError] = useState("");


  // Si el padre actualiza values (ej: back), sincroniza local
  useEffect(() => {
    setLocal((prev) => ({
      ...prev,
      numeroTelefono: values.numeroTelefono || "",
      email: values.email || "",
      categoria: values.categoria || "",
      habilidades: values.habilidades || [],
      rol: values.rol || "",
    }));
  }, [values]);

  // Filtrar categorías activas
  const activeCategories = useMemo(() => {
    return categories?.filter((cat) =>
      typeof cat.estado === "string"
        ? cat.estado.toLowerCase() === "activo"
        : false
    ) || [];
  }, [categories]);

  // Filtrar skills activas según categoría seleccionada
  const filteredSkills = useMemo(() => {
    if (!local.categoria || !activeCategories || !skills) return [];

    const selectedCat = activeCategories.find(
      (c) => c.nombre === local.categoria || c.name === local.categoria
    );
    if (!selectedCat) return [];

    const selectedCatId = selectedCat.id || selectedCat.categoriaId;

    return skills.filter(
      (sk) =>
        (sk.categoriaId === selectedCatId || sk.categoryId === selectedCatId) &&
        sk.estado?.toLowerCase() === "activo"
    );
  }, [local.categoria, activeCategories, skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "numeroTelefono") {
      // Permitir solo formato internacional: +[código][número], sin espacios
      let val = value.replace(/[^+\d]/g, "");
      // Solo un + al inicio
      if (val.startsWith("+")) {
        val = "+" + val.slice(1).replace(/[^\d]/g, "");
      } else {
        val = val.replace(/[^\d]/g, "");
      }
      setLocal((prev) => ({ ...prev, numeroTelefono: val }));
      // Validar formato
      const phoneRegex = /^\+\d{10,15}$/;
      if (val && !phoneRegex.test(val)) {
        setPhoneError("Formato inválido. Ejemplo: +584125296432");
      } else {
        setPhoneError("");
      }
      return;
    }

    if (name === "email") {
      // Validar email con regex
      if (!/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(value)) {
        setEmailError("Formato de email inválido");
      } else {
        setEmailError("");
      }
    }

    setLocal((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categoria" ? { habilidades: [] } : {}),
    }));
  };

  const handleSkillToggle = (skillId) => {
    setLocal((prev) => ({
      ...prev,
      habilidades: prev.habilidades.includes(skillId)
        ? prev.habilidades.filter((id) => id !== skillId)
        : [...prev.habilidades, skillId],
    }));
  };


  const phoneRegex = /^\+\d{10,15}$/;
  const isFormValid =
    local.email &&
    !emailError &&
    /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(local.email) &&
    local.numeroTelefono &&
    phoneRegex.test(local.numeroTelefono) &&
    local.categoria &&
    local.habilidades.length > 0 &&
    local.rol;


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar formato telefónico antes de guardar
    if (!phoneRegex.test(local.numeroTelefono)) {
      setPhoneError("Formato inválido. Ejemplo: +584125296432");
      return;
    }
    setPhoneError("");
    onSave(local);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4">
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-3">
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
            className={`mb-2 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${emailError ? 'border-red-400' : ''}`}
            pattern="^[a-zA-Z0-9_\-.+]+@[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}$"
            title="Ingresa un email válido"
          />
          {emailError && (
            <div className="text-red-500 text-xs -mt-2 mb-2">{emailError}</div>
          )}
          <label className="font-semibold text-sm">Phone number *</label>
          <input
            name="numeroTelefono"
            value={local.numeroTelefono}
            onChange={handleChange}
            required
            placeholder="+584125296432"
            className={`mb-2 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${phoneError ? 'border-red-400' : ''}`}
            inputMode="tel"
            maxLength={16}
            autoComplete="off"
            pattern="\+\d{10,15}"
          />
          {phoneError && (
            <div className="text-red-500 text-xs -mt-2 mb-2">{phoneError}</div>
          )}
        </div>
      </div>

      {/* Role Selection */}
      <div>
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3 mt-6">
          Role
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="font-semibold text-sm">Role *</label>
          <select
            name="rol"
            value={local.rol}
            onChange={handleChange}
            required
            className="mb-2 border rounded w-full px-3 py-2"
          >
            <option value="">Select Role</option>
            {(roles || []).map((r) => (
              <option key={r.rolId || r.id} value={r.rolId || r.id}>
                {r.nombre} - {r.descripcion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category & Skills */}
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
            disabled={isLoadingData || activeCategories.length === 0}
            className="mb-2 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {isLoadingData
                ? "Loading categories..."
                : activeCategories.length === 0
                ? "No categories available"
                : "Select Category"}
            </option>
            {activeCategories.map((cat) => (
              <option key={cat.id || cat.nombre} value={cat.nombre || cat.name}>
                {cat.nombre || cat.name}
              </option>
            ))}
          </select>

          <label className="font-semibold text-sm">Skills *</label>
          <div className="min-h-[50px] border rounded p-3 bg-gray-50">
            {isLoadingData ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm">Loading skills...</span>
              </div>
            ) : !local.categoria ? (
              <span className="text-gray-400 italic text-sm">
                Select a category first
              </span>
            ) : filteredSkills.length === 0 ? (
              <span className="text-gray-400 italic text-sm">
                No skills available for this category
              </span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((skill) => (
                  <button
                    type="button"
                    key={`${skill.skillId}-${skill.nombre}`}
                    onClick={() => handleSkillToggle(skill.skillId)}
                    className={`px-3 py-1 rounded-lg border font-semibold text-sm transition hover:scale-105 ${
                      local.habilidades.includes(skill.skillId)
                        ? "bg-purple-600 text-white border-purple-500 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    {skill.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected skills */}
          {local.habilidades.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-600">
                Selected skills ({local.habilidades.length}):
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {local.habilidades.map((skillId) => {
                  const skill = skills?.find((s) => s.skillId === skillId);
                  return skill ? (
                    <span
                      key={`selected-${skillId}`}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                    >
                      {skill.nombre}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={() => onBack(local)}
          className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isLoadingData}
          className={`px-6 py-2 rounded-xl font-semibold transition-colors ${
            isFormValid && !isLoadingData
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoadingData ? "Loading..." : "Save User"}
        </button>
      </div>
    </form>
  );
}
