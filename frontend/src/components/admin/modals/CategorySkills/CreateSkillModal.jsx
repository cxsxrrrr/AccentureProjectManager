import React, { useState, useEffect } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";

export default function CreateSkillModal({ isOpen, toggle, categories = [], onCreate }) {
  const [nombre, setNombre] = useState("");
  const maxNameLength = 40;
  // Solo letras, números, espacios y tildes
  const allowedRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9\s]+$/;
  const [catSearch, setCatSearch] = useState("");
  const [categoriaId, setCategoriaId] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNombre("");
      setCatSearch("");
      setCategoriaId(null);
      setTouched(false);
    }
  }, [isOpen]);


  // Normaliza categorías para que funcionen con el nuevo modelo del frontend
  const normalizedCategories = categories.map(c => ({
    id: c.id || c.categoriaId,
    name: c.name || c.nombre,
    description: c.description || c.descripcion
  }));

  const filteredCategories = normalizedCategories.filter(c =>
    (typeof c?.name === "string" && c.name.toLowerCase().includes(catSearch.toLowerCase())) ||
    (typeof c?.description === "string" && c.description.toLowerCase().includes(catSearch.toLowerCase()))
  );


  const validName = nombre.trim() && allowedRegex.test(nombre.trim()) && nombre.trim().length <= maxNameLength;
  const valid = validName && categoriaId;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!nombre.trim()) {
      window.alert("El nombre de la habilidad es obligatorio.");
      return;
    }
    if (nombre.trim().length > maxNameLength) {
      window.alert(`El nombre no puede exceder ${maxNameLength} caracteres.`);
      return;
    }
    if (!allowedRegex.test(nombre.trim())) {
      window.alert("El nombre solo puede contener letras, números y espacios.");
      return;
    }
    if (!categoriaId) {
      window.alert("Debes seleccionar una categoría.");
      return;
    }
    // Busca la categoría seleccionada para enviar el id correcto
    const selectedCat = normalizedCategories.find(c => c.id === categoriaId);
    onCreate && onCreate({
      name: nombre.trim(),
      category: selectedCat ? selectedCat.name : "",
      category_id: selectedCat ? selectedCat.id : categoriaId
    });
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative"
      >
        {/* Header */}
        <div className="flex items-start mb-10">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">Nueva Habilidad</h2>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Cerrar modal"
            type="button"
          >×</button>
        </div>
        {/* Formulario */}
        <div className="flex flex-col gap-8 mb-10">
          <div>
            <label className="block text-2xl font-bold mb-4" htmlFor="skillname">
              Nombre de la Habilidad <span className="text-red-500">*</span>
            </label>
            <input
              id="skillname"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
              placeholder="Escribe el nombre de la habilidad"
              value={nombre}
              onChange={e => setNombre(e.target.value.slice(0, maxNameLength))}
              maxLength={maxNameLength}
              autoFocus
            />
            <div className="text-xs text-gray-400 mb-1 text-right">{nombre.length}/{maxNameLength}</div>
            {touched && !nombre.trim() && (
              <div className="text-red-500 text-sm mb-2">El nombre es obligatorio.</div>
            )}
            {touched && nombre.trim() && !allowedRegex.test(nombre.trim()) && (
              <div className="text-red-500 text-sm mb-2">Solo se permiten letras, números y espacios.</div>
            )}
            {nombre.trim().length > maxNameLength && (
              <div className="text-red-500 text-sm mb-2">Máximo {maxNameLength} caracteres.</div>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold mb-4">Selecciona una Categoría</div>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-5 bg-gray-50 shadow-inner">
              <FiSearch className="text-xl text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Buscar categoría..."
                value={catSearch}
                onChange={e => setCatSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-lg"
              />
            </div>
            <div className="max-h-48 overflow-y-auto flex flex-col gap-3">
              {filteredCategories.length === 0 && (
                <div className="text-gray-400 py-4 text-center">No hay categorías.</div>
              )}
              {filteredCategories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoriaId(c.id)}
                  className={`
                    flex flex-col items-start p-4 rounded-xl border w-full transition
                    text-left shadow-sm
                    ${categoriaId === c.id
                      ? "bg-purple-500 text-white border-purple-500"
                      : "bg-white border-gray-200 hover:bg-purple-100"}
                  `}
                >
                  <div className="flex items-center w-full">
                    <span className="font-bold text-lg flex-1">{c.name}</span>
                    {categoriaId === c.id && <FiCheck className="text-2xl ml-2 font-bold" />}
                  </div>
                  <span className={`text-xs mt-2 ${categoriaId === c.id ? "text-purple-100" : "text-gray-500"}`}>
                    {c.description || "Sin descripción"}
                  </span>
                </button>
              ))}
            </div>
            {touched && !categoriaId && (
              <div className="text-red-500 text-sm mt-3">Selecciona una categoría.</div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-8 pt-10">
          <button
            type="button"
            onClick={toggle}
            className="px-8 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition text-lg shadow"
            disabled={!valid}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}