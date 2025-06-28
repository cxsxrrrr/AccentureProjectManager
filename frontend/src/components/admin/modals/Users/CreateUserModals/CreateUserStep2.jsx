import React, { useState, useMemo } from "react";

export default function CreateUserStep2({
  values,
  categories,
  skills,
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

  // Filtrar las skills según la categoría seleccionada
  const filteredSkills = useMemo(() => {
    const selectedCat = categories?.find((c) => c.name === local.categoria);
    if (!selectedCat) return [];
    return skills?.filter((sk) => sk.categoryId === selectedCat.id) || [];
  }, [local.categoria, categories, skills]);

  // Manejar cambios de campos
  const handleChange = (e) => {
    setLocal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "categoria" ? { habilidades: [] } : {}),
    }));
  };

  // Manejar selección de habilidades (skills)
  const handleSkillToggle = (skillId) => {
    setLocal((prev) => ({
      ...prev,
      habilidades: prev.habilidades.includes(skillId)
        ? prev.habilidades.filter((id) => id !== skillId)
        : [...prev.habilidades, skillId],
    }));
  };

  // Guardar usuario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(local); // Body en español
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
            {filteredSkills.length === 0 && (
              <span className="text-gray-400 italic">
                Select a category first
              </span>
            )}
            {filteredSkills.map((skill) => (
              <button
                type="button"
                key={skill.id}
                onClick={() => handleSkillToggle(skill.id)}
                className={`px-3 py-1 rounded-lg border font-semibold text-sm transition ${
                  local.habilidades.includes(skill.id)
                    ? "bg-purple-600 text-white border-purple-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {skill.name}
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
          className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
