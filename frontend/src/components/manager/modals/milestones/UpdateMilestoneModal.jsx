import React, { useState, useEffect } from "react";

function UpdateMilestoneModal({ isOpen, onClose, milestone, onUpdate }) {
  const [updated, setUpdated] = useState({ ...milestone });

  useEffect(() => {
    if (milestone) {
      setUpdated({ ...milestone });
    }
  }, [milestone]);

  const handleChange = (e) => {
    setUpdated({ ...updated, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(updated);
    onClose();
  };

  if (!isOpen || !milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Update Milestone</h2>

        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Milestone Name"
            value={updated.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
          <textarea
            name="descripcion"
            placeholder="Description"
            value={updated.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl resize-none"
            rows={3}
          />
          <div className="flex gap-4">
            <input
              name="fechaInicio"
              type="date"
              value={updated.fechaInicio}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-xl"
            />
            <input
              name="fechaPlaneada"
              type="date"
              value={updated.fechaPlaneada}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-xl"
            />
          </div>
          <input
            name="estado"
            placeholder="Status"
            value={updated.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateMilestoneModal;
