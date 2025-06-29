import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

// Mockup de proyectos asignados al trabajador
const mockProjects = [
  {
    proyecto_id: 10,
    nombre_proyecto: "Website Revamp",
    descripcion_proyecto: "Rediseño completo de la web corporativa.",
    estado: "En progreso",
    fecha_creacion: "2025-05-10T09:00:00Z",
    fecha_inicio: "2025-05-15",
    fecha_fin: "2025-08-01",
    fecha_fin_real: null,
    gerente_nombre: "John Doe",
  },
  {
    proyecto_id: 11,
    nombre_proyecto: "Cloud Migration",
    descripcion_proyecto: "Migración de servidores a AWS.",
    estado: "Pendiente",
    fecha_creacion: "2025-06-03T14:22:00Z",
    fecha_inicio: "2025-07-01",
    fecha_fin: "2025-12-15",
    fecha_fin_real: null,
    gerente_nombre: "Ana Torres",
  },
  {
    proyecto_id: 12,
    nombre_proyecto: "App Movil Logística",
    descripcion_proyecto: "Desarrollo de aplicación móvil para control logístico.",
    estado: "Completado",
    fecha_creacion: "2024-10-29T11:12:00Z",
    fecha_inicio: "2024-11-05",
    fecha_fin: "2025-05-01",
    fecha_fin_real: "2025-04-28",
    gerente_nombre: "Carlos Reyes",
  },
];

function AssignedProject() {
  const [projects] = useState(mockProjects);

  return (
    <div className="admin-page">
      <Topbar title="Assigned Projects" />
      <div className="admin-content">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4 min-w-[950px]">
            <thead>
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Manager
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Start
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  End (Planned)
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr
                  key={proj.proyecto_id}
                  className={`
                    transition
                    ${idx % 2 ? "bg-gray-50" : ""}
                    hover:bg-purple-50
                  `}
                >
                  <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {proj.nombre_proyecto}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{proj.gerente_nombre}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`
                        px-4 py-1 rounded-full font-bold text-sm
                        ${
                          proj.estado === "Completado"
                            ? "bg-green-100 text-green-700"
                            : proj.estado === "En progreso"
                            ? "bg-yellow-100 text-yellow-700"
                            : proj.estado === "Pendiente"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {proj.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{proj.fecha_inicio}</td>
                  <td className="py-4 px-6 text-gray-700">{proj.fecha_fin}</td>
                  <td className="py-4 px-6 text-gray-600 max-w-[300px] truncate" title={proj.descripcion_proyecto}>
                    {proj.descripcion_proyecto}
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No assigned projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignedProject;