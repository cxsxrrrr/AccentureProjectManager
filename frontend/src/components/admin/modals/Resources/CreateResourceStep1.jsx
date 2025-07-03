import React, { useState, useEffect } from "react";

const typeOptions = ["Human", "Material", "Financial"];
const availabilityOptions = ["Available", "Disabled"];

const CreateResourceStep1 = ({ values, onNext, onCancel }) => {
  // Normaliza los valores a la estructura estándar
  const normalize = (v) => ({
    name: v.name || v.nombreRecurso || "",
    type: v.type || v.tipo || "",
    cost: v.cost || v.costo || v.coste || "",
    availability: v.availability || v.disponibilidad || v.estado || "",
  });

  const [local, setLocal] = useState(normalize(values));

  useEffect(() => {
    setLocal(normalize(values));
  }, [values]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      value = value.replace(/[^a-zA-Z0-9\-() ]/g, "");
    }
    if (name === "cost") {
      // Permitir números y un solo punto decimal, pero permitir escribir el punto si hay al menos un dígito antes
      value = value.replace(/[^0-9.]/g, "");
      // Solo un punto permitido
      const parts = value.split('.');
      if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
      // No permitir punto al inicio (pero permitir "0.")
      if (value.startsWith('.') && value.length === 1) value = '';
      // Si hay punto, limitar a 2 decimales
      if (value.includes('.')) {
        let [intPart, decPart] = value.split('.');
        // Permitir "0." pero no "."
        if (intPart === '' && decPart !== undefined) intPart = '0';
        // Limita a 2 decimales
        if (decPart !== undefined) decPart = decPart.slice(0, 2);
        value = decPart !== undefined ? intPart + '.' + decPart : intPart;
      }
    }
    setLocal({ ...local, [name]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Create Resource</h2>
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
        <option value="">Select a Type</option>
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
        onBlur={e => {
          let value = e.target.value;
          // Si termina en punto sin decimales, lo borra
          if (/^\d+\.$/.test(value)) {
            value = value.slice(0, -1);
            setLocal(prev => ({ ...prev, cost: value }));
          }
        }}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
        inputMode="decimal"
        maxLength={12}
        autoComplete="off"
      />

      {/* Resource Availability */}
      <label className="block font-semibold text-lg mb-1">
        Resource Availability <span className="text-purple-600">*</span>
      </label>
      <select
        name="availability"
        value={local.availability}
        onChange={handleChange}
        className="w-full mb-8 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Select status</option>
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
          onClick={() => onNext(local)}
          disabled={
            !local.name ||
            !local.type ||
            !local.cost ||
            !local.availability
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateResourceStep1;