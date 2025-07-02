import React, { useState, useEffect } from "react";
import projectIcon from "../../../../assets/icons/project.svg";
import api from "../../../../services/axios"; // Ajusta el path si es necesario

function NewProjectModal({ isOpen, onClose, onSave, clients = [] }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    client: "",
    categoriaId: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Cargar categorías al abrir el modal
  useEffect(() => {
    if (!isOpen) return;
    const fetchCategorias = async () => {
      try {
        const res = await api.get("/category");
        setCategorias(res.data || []);
      } catch {
        setCategorias([]);
      }
    };
    fetchCategorias();
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Obtener el usuario logueado (ajusta según tu auth)
      const user = JSON.parse(localStorage.getItem("user")) || {};

      // 1. Crear el proyecto
      const payload = {
        nombreProyecto: form.title,
        descripcionProyecto: form.description,
        fechaInicio: form.startDate,
        fechaFin: form.endDate,
        estado: "Active",
        cliente: { usuarioId: Number(form.client) },
        gerenteProyecto: { usuarioId: user.usuarioId || user.id || 1 },
        creadoPor: { usuarioId: user.usuarioId || user.id || 1 },
      };
      const projectRes = await api.post("/proyectos", payload);
      const proyectoId = projectRes.data.proyectoId || projectRes.data.id;

      // 2. Relacionar proyecto con categoría seleccionada
      await api.post("/proyectos-categorias", {
        proyectoId,
        categoriaId: Number(form.categoriaId),
      });

      if (onSave) onSave(projectRes.data);
      onClose();
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        client: "",
        categoriaId: "",
      });
    } catch (err) {
      setError("Ocurrió un error creando el proyecto y su categoría.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={projectIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Register New Project</h2>
            <p className="text-sm text-gray-500">Complete the information to create a new project</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mensaje de error simple */}
          {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
          {/* Project Info */}
          <div>
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
              <span className="text-xl bg-purple-100 p-1 rounded">
                <img src={projectIcon} alt="" className="w-6 h-6" />
              </span>
              Project Information
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <label className="font-semibold text-sm">
                Title *
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="Enter project title"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Description *
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="Enter project description"
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Start Date *
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Estimated End Date *
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="mt-1 border rounded w-full px-3 py-2"
                />
              </label>
              <label className="font-semibold text-sm">
                Client *
                <select
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="mt-1 border rounded w-full px-3 py-2"
                >
                  <option value="">Client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                  ))}
                </select>
              </label>
              <label className="font-semibold text-sm">
                Category *
                <select
                  name="categoriaId"
                  value={form.categoriaId}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="mt-1 border rounded w-full px-3 py-2"
                >
                  <option value="">Select category</option>
                  {categorias.map((cat) => (
                    <option key={cat.categoriaId} value={cat.categoriaId}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectModal;