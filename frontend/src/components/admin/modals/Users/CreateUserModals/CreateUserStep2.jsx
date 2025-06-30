import React, { useState, useMemo } from "react";

export default function CreateUserStep2({
  values,
  categories,
  skills,
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
  });

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
    setLocal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "categoria" ? { habilidades: [] } : {}),
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

  const isFormValid =
    local.email &&
    local.numeroTelefono &&
    local.categoria &&
    local.habilidades.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
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
            className="mb-2 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <label className="font-semibold text-sm">Phone number *</label>
          <input
            name="numeroTelefono"
            value={local.numeroTelefono}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4456"
            className="mb-2 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
