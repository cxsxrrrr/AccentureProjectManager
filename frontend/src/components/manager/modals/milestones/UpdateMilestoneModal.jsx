import React, { useState, useEffect } from "react";
import api from "../../../../services/axios";

function UpdateMilestoneModal({ isOpen, onClose, milestone, onUpdate }) {
  const [updatedMilestone, setUpdatedMilestone] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaPlaneada: "",
    proyectoId: "",
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (milestone) {
      setUpdatedMilestone({
        nombre: milestone.nombre || "",
        descripcion: milestone.descripcion || "",
        fechaInicio: milestone.fechaInicio || "",
        fechaPlaneada: milestone.fechaPlaneada || "",
        proyectoId: milestone.proyecto?.proyectoId || "",
      });
    }

    api
      .get("http://localhost:8080/api/proyectos")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, [milestone]);

  const handleChange = (e) => {
    setUpdatedMilestone({ ...updatedMilestone, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!milestone || !milestone.hitoId) {
      console.error("Milestone or hitoId is undefined.");
      return;
    }

    if (!updatedMilestone.nombre || !updatedMilestone.descripcion || !updatedMilestone.fechaInicio || !updatedMilestone.fechaPlaneada || !updatedMilestone.proyectoId) {
      console.error("All fields are required.");
      alert("Please fill out all fields before submitting.");
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

      const response = await api.put(`/hitos/${milestone.hitoId}`, payload);

      if (response.status === 200) {
        const updatedData = response.data;
        onUpdate((prevMilestones) => {
          const updatedMilestones = prevMilestones.map((milestone) =>
            milestone.hitoId === updatedData.hitoId ? updatedData : milestone
          );
          return updatedMilestones;
        });
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
          <textarea
            name="descripcion"
            placeholder="Description"
            value={updatedMilestone.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl resize-none"
            rows={3}
          />
          <div className="flex gap-4">
            <input
              name="fechaInicio"
              type="date"
              value={updatedMilestone.fechaInicio}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-xl"
            />
            <input
              name="fechaPlaneada"
              type="date"
              value={updatedMilestone.fechaPlaneada}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-xl"
            />
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
                    updatedMilestone.proyectoId === project.proyectoId ? "bg-purple-100" : ""
                  }`}
                  onClick={() =>
                    setUpdatedMilestone({
                      ...updatedMilestone,
                      proyectoId: project.proyectoId,
                    })
                  }
                >
                  {project.nombreProyecto}
                </li>
              ))}
            </ul>
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