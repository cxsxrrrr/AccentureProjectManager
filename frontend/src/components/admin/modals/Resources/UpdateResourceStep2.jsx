import React, { useState, useEffect } from "react";

const UpdateResourceStep2 = ({ values, onBack, onSave, onCancel }) => {
  const [local, setLocal] = useState({
    unit: values.unit || "",
    description: values.description || "",
  });

  useEffect(() => {
    setLocal({
      unit: values.unit || "",
      description: values.description || "",
    });
  }, [values]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Limita a 7 dígitos (solo números)
    if (name === "unit") {
      value = value.replace(/\D/, "");
      if (value.length > 7) value = value.slice(0, 7);
    }
    setLocal({ ...local, [name]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-7">Update Resource</h2>
      {/* Resource Unit */}
      <label className="block font-semibold text-lg mb-1">
        Resource Unit <span className="text-purple-600">*</span>
      </label>
      <input
        name="unit"
        placeholder="Enter Resource stock"
        value={local.unit}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400"
        type="number"
        min={0}
        max={9999999}
        onInput={e => {
          if (e.target.value.length > 7) {
            e.target.value = e.target.value.slice(0, 7);
          }
        }}
      />

      {/* Resource Description */}
      <label className="block font-semibold text-lg mb-1">
        Resource Description <span className="text-purple-600">*</span>
      </label>
      <textarea
        name="description"
        placeholder="Enter a Description"
        value={local.description}
        onChange={handleChange}
        className="w-full mb-8 px-4 py-2 border rounded-lg text-base outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        rows={5}
      />

      <div className="flex justify-end gap-2 mt-6">
        <button
          className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow"
          onClick={() => onBack(local)}
        >
          Back
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow"
          onClick={() => onSave(local)}
        >
          Save Change
        </button>
      </div>
    </div>
  );
};

export default UpdateResourceStep2;
