import React, { useState, useEffect } from "react";
import taskIcon from "../../../../assets/icons/task.svg";

// Mock de proyectos y usuarios
const proyectosMock = [
  { proyectoId: 1, nombreProyecto: "Website Redesign" },
  { proyectoId: 2, nombreProyecto: "Inventario 2025" },
];
const usuariosMock = [
  { usuarioId: 1, name: "Jane Smith" },
  { usuarioId: 2, name: "John Doe" },
  { usuarioId: 3, name: "Carlos Reyes" },
];

function getToday() {
  const d = new Date();
  return d.toISOString().split("T")[0]; // yyyy-mm-dd
}

// Función para buscar nombre del usuario
function getUserNameById(id) {
  const u = usuariosMock.find((u) => u.usuarioId === Number(id));
  return u ? u.name : "Unknown";
}

function UpdateTaskModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    proyectoId: "",
    nombre: "",
    descripcion: "",
    prioridad: "MEDIA",
    fechaInicioEstimada: "",
    fechaFinEstimada: "",
    creadoPorId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && initialData) {
      setForm({
        proyectoId: initialData.proyecto?.proyectoId?.toString() || "",
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        prioridad: initialData.prioridad || "MEDIA",
        fechaInicioEstimada: initialData.fechaInicioEstimada || "",
        fechaFinEstimada: initialData.fechaFinEstimada || "",
        creadoPorId: initialData.creadoPor?.usuarioId?.toString() || "",
      });
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validate = (field, value) => {
    const today = getToday();
    let errs = {};

    if (field === "fechaInicioEstimada" || field === "fechaFinEstimada") {
      if (form.fechaInicioEstimada && form.fechaInicioEstimada < today) {
        errs.fechaInicioEstimada = "Start date cannot be in the past";
      }
      if (form.fechaFinEstimada && form.fechaFinEstimada < today) {
        errs.fechaFinEstimada = "End date cannot be in the past";
      }
      if (
        form.fechaInicioEstimada &&
        form.fechaFinEstimada &&
        form.fechaFinEstimada < form.fechaInicioEstimada
      ) {
        errs.fechaFinEstimada = "End date cannot be before start date";
      }
    }

    if (field === "nombre" && value.length > 60) {
      errs.nombre = "Task name cannot be longer than 60 characters";
    }
    if (field === "descripcion" && value.length > 255) {
      errs.descripcion = "Description cannot be longer than 255 characters";
    }

    setErrors((prev) => ({ ...prev, ...errs }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre" && value.length > 60) return;
    if (name === "descripcion" && value.length > 255) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = getToday();
    let valid = true;
    let errs = {};

    if (form.fechaInicioEstimada < today) {
      errs.fechaInicioEstimada = "Start date cannot be in the past";
      valid = false;
    }
    if (form.fechaFinEstimada < today) {
      errs.fechaFinEstimada = "End date cannot be in the past";
      valid = false;
    }
    if (
      form.fechaInicioEstimada &&
      form.fechaFinEstimada &&
      form.fechaFinEstimada < form.fechaInicioEstimada
    ) {
      errs.fechaFinEstimada = "End date cannot be before start date";
      valid = false;
    }
    if (form.nombre.length > 60) {
      errs.nombre = "Task name cannot be longer than 60 characters";
      valid = false;
    }
    if (form.descripcion.length > 255) {
      errs.descripcion = "Description cannot be longer than 255 characters";
      valid = false;
    }
    setErrors(errs);
    if (!valid) return;

    const tareaEditada = {
      tareasId: initialData.tareasId,
      proyecto: { proyectoId: Number(form.proyectoId) },
      nombre: form.nombre,
      descripcion: form.descripcion,
      estado: initialData.estado || "NO_INICIADA",
      prioridad: form.prioridad,
      fechaInicioEstimada: form.fechaInicioEstimada,
      fechaFinEstimada: form.fechaFinEstimada,
      fechaInicioReal: initialData.fechaInicioReal || null,
      fechaFinReal: initialData.fechaFinReal || null,
      creadoPor: { usuarioId: Number(form.creadoPorId) },
      fechaCreacion: initialData.fechaCreacion,
      ultimaActualizacion: new Date().toISOString(),
    };
    onSave(tareaEditada);
  };

  if (!isOpen) return null;

  const today = getToday();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={taskIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Edit Task</h2>
            <p className="text-sm text-gray-500">
              Update the information for this task
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-4xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="font-semibold text-sm flex flex-col">
              Project *
              <select
                name="proyectoId"
                value={form.proyectoId}
                onChange={handleChange}
                required
                className="mt-1 border rounded w-full px-3 py-2"
              >
                <option value="">Select project</option>
                {proyectosMock.map((p) => (
                  <option key={p.proyectoId} value={p.proyectoId}>
                    {p.nombreProyecto}
                  </option>
                ))}
              </select>
            </label>
            <label className="font-semibold text-sm flex flex-col">
              Created By *
              <input
                value={getUserNameById(form.creadoPorId)}
                readOnly
                className="mt-1 border rounded w-full px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </label>
          </div>
          <label className="font-semibold text-sm flex flex-col w-full">
            Task Name *
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              maxLength={60}
              placeholder="Enter task name"
              className="mt-1 border rounded w-full px-3 py-2"
            />
            <span className="text-xs text-gray-400 mt-1">{form.nombre.length}/60</span>
            {errors.nombre && <span className="text-xs text-red-500">{errors.nombre}</span>}
          </label>
          <label className="font-semibold text-sm flex flex-col w-full">
            Description
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              maxLength={255}
              placeholder="Enter task description"
              className="mt-1 border rounded w-full px-3 py-2"
              rows={2}
            />
            <span className="text-xs text-gray-400 mt-1">{form.descripcion.length}/255</span>
            {errors.descripcion && <span className="text-xs text-red-500">{errors.descripcion}</span>}
          </label>
          {/* Status y prioridad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-semibold text-sm flex flex-col">
              Status
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                initialData.estado === "COMPLETADA" ? "bg-green-100 text-green-700"
                : initialData.estado === "EN_PROGRESO" ? "bg-blue-100 text-blue-700"
                : initialData.estado === "BLOQUEADA" ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
              }`}>
                {initialData.estado === "NO_INICIADA" && "Not Started"}
                {initialData.estado === "EN_PROGRESO" && "In Progress"}
                {initialData.estado === "COMPLETADA" && "Completed"}
                {initialData.estado === "BLOQUEADA" && "Blocked"}
              </span>
            </div>
            <label className="font-semibold text-sm flex flex-col">
              Priority *
              <select
                name="prioridad"
                value={form.prioridad}
                onChange={handleChange}
                className="mt-1 border rounded w-full px-3 py-2"
                required
              >
                <option value="ALTA">High</option>
                <option value="MEDIA">Medium</option>
                <option value="BAJA">Low</option>
              </select>
            </label>
          </div>
          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="font-semibold text-sm flex flex-col">
              Estimated Start *
              <input
                name="fechaInicioEstimada"
                value={form.fechaInicioEstimada}
                onChange={handleChange}
                type="date"
                min={today}
                required
                className="mt-1 border rounded w-full px-3 py-2"
              />
              {errors.fechaInicioEstimada && (
                <span className="text-xs text-red-500">{errors.fechaInicioEstimada}</span>
              )}
            </label>
            <label className="font-semibold text-sm flex flex-col">
              Estimated End *
              <input
                name="fechaFinEstimada"
                value={form.fechaFinEstimada}
                onChange={handleChange}
                type="date"
                min={form.fechaInicioEstimada || today}
                required
                className="mt-1 border rounded w-full px-3 py-2"
              />
              {errors.fechaFinEstimada && (
                <span className="text-xs text-red-500">{errors.fechaFinEstimada}</span>
              )}
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              disabled={Object.keys(errors).length > 0}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTaskModal;
