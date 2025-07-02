import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

function UpdateMilestoneModal({ isOpen, onClose, milestone, onUpdate, setToast }) {
  const [updatedMilestone, setUpdatedMilestone] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaPlaneada: "",
    proyectoId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (milestone) {
      setUpdatedMilestone({
        nombre: milestone.nombre || "",
        descripcion: milestone.descripcion || "",
        fechaInicio: milestone.fechaReal || "", // Use fechaReal for fechaInicio
        fechaPlaneada: milestone.fechaPlaneada || "",
        proyectoId: milestone.proyecto?.proyectoId || "",
      });
    }
  }, [milestone]);

  const handleChange = (e) => {
    setUpdatedMilestone({ ...updatedMilestone, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!updatedMilestone.nombre) newErrors.nombre = "El nombre es requerido.";
    if (!updatedMilestone.descripcion) newErrors.descripcion = "La descripción es requerida.";
    if (!updatedMilestone.fechaInicio) newErrors.fechaInicio = "La fecha de inicio es requerida.";
    if (!updatedMilestone.fechaPlaneada) newErrors.fechaPlaneada = "La fecha planeada es requerida.";
    if (!updatedMilestone.proyectoId) newErrors.proyectoId = "El proyecto es requerido.";

    // Additional date validation
    if (updatedMilestone.fechaInicio && updatedMilestone.fechaPlaneada) {
      if (new Date(updatedMilestone.fechaInicio) > new Date(updatedMilestone.fechaPlaneada)) {
        newErrors.fechaInicio = "La fecha de inicio no puede ser mayor que la fecha planeada.";
        newErrors.fechaPlaneada = "La fecha planeada no puede ser menor que la fecha de inicio.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!milestone || !milestone.hitoId) {
      console.error("Milestone or hitoId is undefined.");
      return;
    }

    if (!validateFields()) {
      alert("Por favor corrige los errores antes de enviar.");
      return;
    }

    try {
      const payload = {
        nombre: updatedMilestone.nombre,
        descripcion: updatedMilestone.descripcion,
        fechaPlaneada: updatedMilestone.fechaPlaneada,
        fechaReal: updatedMilestone.fechaReal || updatedMilestone.fechaPlaneada,
        estado: updatedMilestone.estado || "Activo", // Default to "Activo" if not provided
        proyecto: updatedMilestone.proyectoId
          ? { proyectoId: updatedMilestone.proyectoId }
          : milestone.proyecto?.proyectoId
          ? { proyectoId: milestone.proyecto.proyectoId }
          : null,
      };

      const response = await api.patch(`/hitos/${milestone.hitoId}`, payload);

      if (response.status === 200) {
        const updatedData = response.data;
        onUpdate((prevMilestones) => {
          const updatedMilestones = prevMilestones.map((milestone) =>
            milestone.hitoId === updatedData.hitoId ? updatedData : milestone
          );
          return updatedMilestones;
        });
        if (setToast) setToast("Milestone actualizado exitosamente");
        onClose();
      } else {
        console.error("Failed to update milestone:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
  };

  if (!isOpen) return null;

  if (!milestone || !milestone.hitoId) {
    console.error("Milestone or hitoId is undefined. Modal will not render.");
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Update Milestone</h2>

        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Milestone Name"
            value={updatedMilestone.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors && errors.nombre && (
            <div className="text-red-500 text-sm">{errors.nombre}</div>
          )}
          <textarea
            name="descripcion"
            placeholder="Description"
            value={updatedMilestone.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl resize-none"
            rows={3}
          />
          {errors && errors.descripcion && (
            <div className="text-red-500 text-sm">{errors.descripcion}</div>
          )}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col">
              <label htmlFor="fechaInicio" className="mb-1 font-medium text-gray-700">Fecha de inicio</label>
              <input
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={updatedMilestone.fechaInicio}
                onChange={handleChange}
                className="px-4 py-2 border rounded-xl"
              />
              {errors && errors.fechaInicio && (
                <div className="text-red-500 text-sm">{errors.fechaInicio}</div>
              )}
            </div>
            <div className="w-1/2 flex flex-col">
              <label htmlFor="fechaPlaneada" className="mb-1 font-medium text-gray-700">Fecha planeada</label>
              <input
                id="fechaPlaneada"
                name="fechaPlaneada"
                type="date"
                value={updatedMilestone.fechaPlaneada}
                onChange={handleChange}
                className="px-4 py-2 border rounded-xl"
              />
              {errors && errors.fechaPlaneada && (
                <div className="text-red-500 text-sm">{errors.fechaPlaneada}</div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-lg font-semibold">Estado</label>
            <select
              name="estado"
              value={updatedMilestone.estado}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
            >
              <option value="Activo">Activo</option>
              <option value="Desactivado">Desactivado</option>
            </select>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateMilestoneModal;