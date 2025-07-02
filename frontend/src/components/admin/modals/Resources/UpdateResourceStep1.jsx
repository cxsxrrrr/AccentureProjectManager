import React, { useState, useEffect } from "react";

const typeOptions = ["Human", "Material", "Financial"];
const availabilityOptions = ["Available", "Disabled"];

const UpdateResourceStep1 = ({ values, onNext, onCancel }) => {
  // Normaliza los valores a la estructura estándar
  const normalize = (v) => ({
    name: v.name || v.nombreRecurso || "",
    type: v.type || v.tipo || "",
    cost: v.cost || v.costo || v.coste || "",
    availability: v.availability || v.disponibilidad || v.estado || "",
  });

  const [local, setLocal] = useState(normalize(values));

  // Sync local state when values change (on resource change or modal open)
  useEffect(() => {
    setLocal(normalize(values));
  }, [values]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      value = value.replace(/[^a-zA-Z0-9\-() ]/g, "");
    }
    if (name === "cost") {
      // Solo números positivos, máximo 2 decimales, punto como separador
      value = value.replace(/[^0-9.]/g, ""); // Solo dígitos y punto
      // Solo un punto permitido
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      // No permitir punto al inicio
      if (value.startsWith('.')) value = '';
      // No permitir más de un cero al inicio (excepto si es "0.")
      if (/^0[0-9]+/.test(value)) value = value.replace(/^0+/, '');
      // Si hay punto, debe haber al menos un dígito antes y después, y máximo 2 decimales
      if (value.includes('.')) {
        let [intPart, decPart] = value.split('.');
        // Si no hay dígito antes o después del punto, elimina el punto
        if (intPart === '' || decPart === '') value = intPart;
        // Limita a 2 decimales
        else value = intPart + '.' + decPart.slice(0, 2);
      }
    }
    setLocal({ ...local, [name]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Update Resource</h2>
      {/* Resource Name */}
      <label className="block font-semibold text-lg mb-1">
        Resource Name <span className="text-purple-600">*</span>
      </label>
      <input
        name="name"
        placeholder="Enter a Name"
        value={local.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Resource Type */}
      <label className="block font-semibold text-lg mb-1">Resource Type</label>
      <select
        name="type"
        value={local.type}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Enter a Module Type</option>
        {typeOptions.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>

      {/* Resource Cost */}
      <label className="block font-semibold text-lg mb-1">
        Resource Cost <span className="text-purple-600">*</span>
      </label>
      <input
        name="cost"
        placeholder="Enter a Cost"
        value={local.cost}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Resource Availability */}
      <label className="block font-semibold text-lg mb-1">
        Resource availability <span className="text-purple-600">*</span>
      </label>
      <select
        name="availability"
        value={local.availability}
        onChange={handleChange}
        className="w-full mb-8 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Enter resource status</option>
        {availabilityOptions.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>

      <div className="flex justify-end gap-2 mt-6">
        <button
          className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow"
          onClick={() => {
            console.log("Step 1 data:", local); // Log para depuración
            onNext(local);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpdateResourceStep1;
