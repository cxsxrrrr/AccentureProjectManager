import React, { useState } from "react";

const typeOptions = ["Human", "Material", "Financial"];
const availabilityOptions = ["Available", "Disabled"];

const UpdateResourceStep1 = ({ values, onNext, onCancel }) => {
  const [local, setLocal] = useState({
    name: values.name || "",
    type: values.type || "",
    cost: values.cost || "",
    availability: values.availability || "",
  });

  const handleChange = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
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
      <label className="block font-semibold text-lg mb-1">
        Resource Type
      </label>
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
          onClick={() => onNext(local)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpdateResourceStep1;
