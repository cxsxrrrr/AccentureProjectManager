import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

function NewMilestoneModal({ isOpen, onClose, onCreate, setToast }) {
  const [milestone, setMilestone] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaPlaneada: "",
    proyectoId: "",
  });

  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api
      .get("http://localhost:8080/api/proyectos")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));

    const fetchMilestones = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/hitos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const hitos = response.data;
          console.log("Fetched milestones:", hitos);
          setMilestone(hitos);
        } else {
          console.error(
            "Failed to fetch milestones. Status:",
            response.status,
            "Message:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    if (isOpen) {
      fetchMilestones();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setMilestone({ ...milestone, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!milestone.nombre.trim())
      newErrors.nombre = "El nombre es obligatorio.";
    if (!milestone.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!milestone.fechaInicio)
      newErrors.fechaInicio = "La fecha de inicio es obligatoria.";
    if (!milestone.fechaPlaneada)
      newErrors.fechaPlaneada = "La fecha planeada es obligatoria.";
    if (!milestone.proyectoId)
      newErrors.proyectoId = "Debe seleccionar un proyecto.";

    // Validaciones de fechas
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (milestone.fechaInicio) {
      const start = new Date(milestone.fechaInicio);
      if (start < today)
        newErrors.fechaInicio = "La fecha de inicio no puede ser menor a hoy.";
    }
    if (milestone.fechaInicio && milestone.fechaPlaneada) {
      const start = new Date(milestone.fechaInicio);
      const end = new Date(milestone.fechaPlaneada);
      if (end < start)
        newErrors.fechaPlaneada =
          "La fecha fin no puede ser menor a la fecha de inicio.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const response = await api.post("http://localhost:8080/api/hitos", {
        ...milestone,
        estado: "Activado",
        fechaReal: milestone.fechaInicio, // Set fechaReal to fechaInicio
        proyecto: milestone.proyectoId
          ? { proyectoId: milestone.proyectoId }
          : null,
      });
      console.log("Request sent to endpoint: http://localhost:8080/api/hitos");

      if (response.status === 200) {
        const createdMilestone = response.data;
        onCreate(createdMilestone);
        if (setToast) setToast("Milestone creado exitosamente");
        onClose();
      } else {
        console.error("Failed to create milestone:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Milestone
        </h2>

        <div className="space-y-4">
          <input
            name="nombre"
            placeholder="Milestone Name"
            value={milestone.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.nombre && (
            <div className="text-red-500 text-sm">{errors.nombre}</div>
          )}
          <textarea
            name="descripcion"
            placeholder="Description"
            value={milestone.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl resize-none"
            rows={3}
          />
          {errors.descripcion && (
            <div className="text-red-500 text-sm">{errors.descripcion}</div>
          )}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col">
              <label
                htmlFor="fechaInicio"
                className="mb-1 font-medium text-gray-700"
              >
                Fecha de inicio
              </label>
              <input
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                value={milestone.fechaInicio}
                onChange={handleChange}
                className="px-4 py-2 border rounded-xl"
              />
              {errors.fechaInicio && (
                <div className="text-red-500 text-sm">{errors.fechaInicio}</div>
              )}
            </div>
            <div className="w-1/2 flex flex-col">
              <label
                htmlFor="fechaPlaneada"
                className="mb-1 font-medium text-gray-700"
              >
                Fecha planeada
              </label>
              <input
                id="fechaPlaneada"
                name="fechaPlaneada"
                type="date"
                value={milestone.fechaPlaneada}
                onChange={handleChange}
                className="px-4 py-2 border rounded-xl"
              />
              {errors.fechaPlaneada && (
                <div className="text-red-500 text-sm">{errors.fechaPlaneada}</div>
              )}
            </div>
          </div>
          <div className="border rounded-xl p-4 max-h-40 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Select Project</h3>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border rounded-xl mb-2"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm) {
                  setProjects((prevProjects) =>
                    prevProjects.filter((project) =>
                      project.nombreProyecto.toLowerCase().includes(searchTerm)
                    )
                  );
                } else {
                  api
                    .get("http://localhost:8080/api/proyectos")
                    .then((res) => setProjects(res.data))
                    .catch((err) => console.error("Error fetching projects:", err));
                }
              }}
            />
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project.proyectoId}
                  className={`p-2 border rounded-lg cursor-pointer ${
                    milestone.proyectoId === project.proyectoId ? "bg-purple-100" : ""
                  }`}
                  onClick={() =>
                    setMilestone({ ...milestone, proyectoId: project.proyectoId })
                  }
                >
                  {project.nombreProyecto}
                </li>
              ))}
            </ul>
            {errors.proyectoId && (
              <div className="text-red-500 text-sm">{errors.proyectoId}</div>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewMilestoneModal;