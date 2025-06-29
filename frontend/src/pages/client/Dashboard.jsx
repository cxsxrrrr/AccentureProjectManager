import React, { useMemo } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

// Mockup de proyecto y hitos ejemplo
const mockProject = {
  proyecto_id: 1,
  nombre_proyecto: "Modernización Plataforma E-commerce",
  descripcion_proyecto: "Actualización completa de la infraestructura de ventas online.",
  estado: "En progreso",
  fecha_inicio: "2025-06-01",
  fecha_fin: "2025-12-15",
  gerente: "Ana Torres"
};

const mockMilestones = [
  {
    hito_id: 1,
    nombre: "Kick-off",
    descripcion: "Inicio formal del proyecto",
    estado: "Completado",
    fecha_planeada: "2025-06-01",
    fecha_real: "2025-06-01"
  },
  {
    hito_id: 2,
    nombre: "Fase de Análisis",
    descripcion: "Levantamiento de requerimientos",
    estado: "Completado",
    fecha_planeada: "2025-06-20",
    fecha_real: "2025-06-21"
  },
  {
    hito_id: 3,
    nombre: "Desarrollo Inicial",
    descripcion: "Primera entrega de funcionalidades clave",
    estado: "En progreso",
    fecha_planeada: "2025-08-15",
    fecha_real: null
  },
  {
    hito_id: 4,
    nombre: "Pruebas QA",
    descripcion: "Validación integral de la solución",
    estado: "Pendiente",
    fecha_planeada: "2025-10-30",
    fecha_real: null
  },
  {
    hito_id: 5,
    nombre: "Go Live",
    descripcion: "Despliegue final en producción",
    estado: "Pendiente",
    fecha_planeada: "2025-12-15",
    fecha_real: null
  }
];

function Dashboard() {
  // Calculamos el progreso según hitos 'Completado'
  const completed = useMemo(
    () => mockMilestones.filter(h => h.estado === "Completado").length,
    []
  );
  const total = mockMilestones.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="admin-page">
      <Topbar title="Dashboard" />
      <div className="admin-content mx-auto" style={{maxWidth: "1400px"}}>
        {/* Barra de progreso del proyecto */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-700">
            Proyecto: {mockProject.nombre_proyecto}
          </h2>
          <div className="mb-2 text-gray-500">{mockProject.descripcion_proyecto}</div>
          <div className="mb-2 text-sm">Manager: <span className="font-semibold">{mockProject.gerente}</span></div>
          <div className="mb-2 text-sm">
            <span>Inicio: {mockProject.fecha_inicio}</span> | 
            <span> Fin estimado: {mockProject.fecha_fin}</span>
          </div>

          <div className="my-5">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-purple-600 h-4 rounded-full transition-all duration-700"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1 text-gray-600">{percent}% completado</div>
          </div>
        </div>

        {/* Tabla de hitos del proyecto */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-700">Hitos del Proyecto</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Hito</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Estado</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Fecha Planeada</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Fecha Real</th>
                  <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {mockMilestones.map((hito, idx) => (
                  <tr
                    key={hito.hito_id}
                    className={`
                      transition
                      ${idx % 2 ? "bg-gray-50" : ""}
                      hover:bg-purple-50
                    `}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800 whitespace-nowrap">{hito.nombre}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`
                          px-4 py-1 rounded-full font-bold text-sm
                          ${
                            hito.estado === "Completado"
                              ? "bg-green-100 text-green-700"
                              : hito.estado === "En progreso"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {hito.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{hito.fecha_planeada}</td>
                    <td className="py-3 px-4 text-gray-700">{hito.fecha_real || "-"}</td>
                    <td className="py-3 px-4 text-gray-700">{hito.descripcion}</td>
                  </tr>
                ))}
                {mockMilestones.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">
                      No milestones defined.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;