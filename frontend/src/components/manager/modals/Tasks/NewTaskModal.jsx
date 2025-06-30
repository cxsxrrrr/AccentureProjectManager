import React, { useState, useEffect } from "react";
import taskIcon from "../../../../assets/icons/task.svg"; // Icono de tarea

function getToday() {
  const d = new Date();
  return d.toISOString().split("T")[0]; // yyyy-mm-dd
}

function NewTaskModal({ isOpen, onClose, onSave, currentUser, proyectos }) {
  const [form, setForm] = useState({
    proyectoId: "",
    nombre: "",
    descripcion: "",
    prioridad: "MEDIA",
    fechaInicioEstimada: "",
    fechaFinEstimada: "",
    creadoPorId: "", // Se asigna automáticamente
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && currentUser && currentUser.usuarioId) {
      setForm({
        proyectoId: "",
        nombre: "",
        descripcion: "",
        prioridad: "MEDIA",
        fechaInicioEstimada: "",
        fechaFinEstimada: "",
        creadoPorId: currentUser.usuarioId.toString(),
      });
      setErrors({});
    }
  }, [isOpen, currentUser]);

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

    // Construye el objeto igual que el JSON backend
    const tareaNueva = {
      proyecto: { proyectoId: Number(form.proyectoId) },
      nombre: form.nombre,
      descripcion: form.descripcion,
      estado: "NO_INICIADA",
      prioridad: form.prioridad,
      fechaInicioEstimada: form.fechaInicioEstimada,
      fechaFinEstimada: form.fechaFinEstimada,
      fechaInicioReal: null,
      fechaFinReal: null,
      creadoPor: { usuarioId: Number(form.creadoPorId) },
      fechaCreacion: new Date().toISOString(),
      ultimaActualizacion: new Date().toISOString(),
    };
    onSave(tareaNueva);
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
            <h2 className="text-3xl font-bold">Register New Task</h2>
            <p className="text-sm text-gray-500">
              Complete the form to create a new task
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
                {proyectos.map((p) => (
                  <option key={p.proyectoId} value={p.proyectoId}>
                    {p.nombreProyecto}
                  </option>
                ))}
              </select>
            </label>
            <label className="font-semibold text-sm flex flex-col">
              Created By *
              <input
                value={currentUser?.nombre || ""}
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
            <span className="text-xs text-gray-400 mt-1">
              {form.nombre.length}/60
            </span>
            {errors.nombre && (
              <span className="text-xs text-red-500">{errors.nombre}</span>
            )}
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
            <span className="text-xs text-gray-400 mt-1">
              {form.descripcion.length}/255
            </span>
            {errors.descripcion && (
              <span className="text-xs text-red-500">{errors.descripcion}</span>
            )}
          </label>
          {/* Status y prioridad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="font-semibold text-sm flex flex-col">
              Status
              <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                Not Started
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
                <span className="text-xs text-red-500">
                  {errors.fechaInicioEstimada}
                </span>
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
                <span className="text-xs text-red-500">
                  {errors.fechaFinEstimada}
                </span>
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
              disabled={
                Object.keys(errors).length > 0 ||
                !form.proyectoId ||
                !form.nombre ||
                !form.fechaInicioEstimada ||
                !form.fechaFinEstimada ||
                !form.creadoPorId // <-- Añade esto
              }
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;
