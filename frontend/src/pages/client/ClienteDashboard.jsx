import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TrackingProject from "./TrackingProject";
import "../../stylesheets/page.css";

// Simulación de proyectos asociados al cliente
const mockProjects = [
  {
    id: 1,
    nombre: "Proyecto A",
    descripcion: "Implementación de sistema ERP",
    manager: "Juan Pérez",
    recursos: 8,
    tareasCompletadas: 24,
    tareasTotales: 30,
    tiempoFinalizacion: "2025-12-20",
    milestones: [
      { id: 1, nombre: "Kick-off", fecha_planeada: "2025-06-01", fecha_real: "2025-06-01", estado: "Completado" },
      { id: 2, nombre: "Fase de Análisis", fecha_planeada: "2025-06-20", fecha_real: "2025-06-21", estado: "Completado" },
      { id: 3, nombre: "Desarrollo", fecha_planeada: "2025-08-15", fecha_real: null, estado: "En progreso" },
      { id: 4, nombre: "QA", fecha_planeada: "2025-10-30", fecha_real: null, estado: "Pendiente" },
      { id: 5, nombre: "Go Live", fecha_planeada: "2025-12-15", fecha_real: null, estado: "Pendiente" }
    ],
    phases: [
      { nombre: "Análisis", porcentaje: 100 },
      { nombre: "Desarrollo", porcentaje: 70 },
      { nombre: "QA", porcentaje: 0 },
      { nombre: "Deploy", porcentaje: 0 }
    ]
  },
  {
    id: 2,
    nombre: "Proyecto B",
    descripcion: "Desarrollo de app móvil",
    manager: "Ana Gómez",
    recursos: 5,
    tareasCompletadas: 10,
    tareasTotales: 20,
    tiempoFinalizacion: "2026-03-10",
    milestones: [
      { id: 1, nombre: "Kick-off", fecha_planeada: "2025-07-01", fecha_real: "2025-07-01", estado: "Completado" },
      { id: 2, nombre: "Desarrollo", fecha_planeada: "2025-09-01", fecha_real: null, estado: "En progreso" },
      { id: 3, nombre: "QA", fecha_planeada: "2025-11-01", fecha_real: null, estado: "Pendiente" },
      { id: 4, nombre: "Go Live", fecha_planeada: "2026-03-10", fecha_real: null, estado: "Pendiente" }
    ],
    phases: [
      { nombre: "Análisis", porcentaje: 100 },
      { nombre: "Desarrollo", porcentaje: 40 },
      { nombre: "QA", porcentaje: 0 },
      { nombre: "Deploy", porcentaje: 0 }
    ]
  }
];

function ClienteDashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer fetch a la API real
    setProjects(mockProjects);
  }, []);

  return (
    <div className="admin-page">
      <Topbar title="Mis Proyectos" showSearch={false} />
      <div className="admin-content" style={{ maxWidth: "1200px", margin: "0 auto", display: "block" }}>
        <h2 className="text-xl font-bold mb-6 text-gray-700">Proyectos Asociados</h2>
        <div className="mb-10 flex flex-wrap gap-6">
          {projects.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`p-6 rounded-2xl shadow-lg border-2 transition-all min-w-[260px] text-left ${selectedProject?.id === proj.id ? "border-purple-600 bg-purple-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
            >
              <div className="font-bold text-lg text-purple-700 mb-1">{proj.nombre}</div>
              <div className="text-gray-600 text-sm mb-2">{proj.descripcion}</div>
              <div className="text-xs text-gray-500">Manager: {proj.manager}</div>
              <div className="text-xs text-gray-500">Recursos: {proj.recursos}</div>
            </button>
          ))}
        </div>
        {selectedProject ? (
          <TrackingProject project={selectedProject} />
        ) : (
          <div className="text-gray-400 text-center py-12">Selecciona un proyecto para ver su avance y detalles.</div>
        )}
      </div>
    </div>
  );
}

export default ClienteDashboard;
