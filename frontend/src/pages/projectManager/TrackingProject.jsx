import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

// Color maps (no switch/case)
const STATUS_STYLE = {
  NO_INICIADA: "bg-gray-200 text-gray-700",
  EN_PROGRESO: "bg-yellow-100 text-yellow-700",
  COMPLETADA: "bg-green-100 text-green-700",
  BLOQUEADA: "bg-red-100 text-red-600",
};

const PRIORITY_STYLE = {
  ALTA: "bg-red-200 text-red-700",
  MEDIA: "bg-yellow-200 text-yellow-700",
  BAJA: "bg-green-200 text-green-700",
};

const PROJECT_STATUS_STYLE = {
  "En progreso": "bg-yellow-100 text-yellow-700",
  Completada: "bg-green-100 text-green-700",
  "No iniciada": "bg-gray-200 text-gray-700",
  Bloqueada: "bg-red-100 text-red-600",
};

// MOCK de proyectos y tareas por proyecto
const mockProjects = [
  {
    id: 1,
    nombreProyecto: "PJUTJ",
    descripcionProyecto: "Claudio2",
    fechaInicio: "2025-05-01",
    fechaFin: "2025-06-15",
    fechaFinReal: "2025-07-15",
    estado: "En progreso",
    fechaCreacion: "2025-05-03T10:30:00",
    cliente: { usuarioId: 1, nombre: "Empresa X" },
    gerenteProyecto: { usuarioId: 1, nombre: "Luis Solarte" },
    creadoPor: { usuarioId: 1, nombre: "Luis Solarte" },
    tareas: [
      {
        id: 11,
        proyectoId: 1,
        nombre: "Levantamiento de requerimientos",
        descripcion: "Reunión con el cliente y documentación",
        estado: "COMPLETADA",
        prioridad: "ALTA",
        fechaInicioEstimada: "2025-05-01",
        fechaFinEstimada: "2025-05-03",
        fechaInicioReal: "2025-05-01",
        fechaFinReal: "2025-05-03",
        creadoPorId: 1,
        fechaCreacion: "2025-05-01T08:00:00",
        ultimaActualizacion: "2025-05-03T17:00:00",
      },
      {
        id: 12,
        proyectoId: 1,
        nombre: "Desarrollo módulo principal",
        descripcion: "Programación del módulo principal del sistema",
        estado: "EN_PROGRESO",
        prioridad: "ALTA",
        fechaInicioEstimada: "2025-05-04",
        fechaFinEstimada: "2025-06-05",
        fechaInicioReal: "2025-05-04",
        fechaFinReal: "",
        creadoPorId: 1,
        fechaCreacion: "2025-05-04T10:00:00",
        ultimaActualizacion: "2025-06-05T16:30:00",
      },
      {
        id: 13,
        proyectoId: 1,
        nombre: "Pruebas e integración",
        descripcion: "QA y corrección de bugs",
        estado: "NO_INICIADA",
        prioridad: "MEDIA",
        fechaInicioEstimada: "2025-06-10",
        fechaFinEstimada: "2025-06-15",
        fechaInicioReal: "",
        fechaFinReal: "",
        creadoPorId: 1,
        fechaCreacion: "2025-06-09T10:00:00",
        ultimaActualizacion: "",
      },
      {
        id: 14,
        proyectoId: 1,
        nombre: "Entrega final",
        descripcion: "Presentación y despliegue con cliente",
        estado: "NO_INICIADA",
        prioridad: "BAJA",
        fechaInicioEstimada: "2025-07-14",
        fechaFinEstimada: "2025-07-15",
        fechaInicioReal: "",
        fechaFinReal: "",
        creadoPorId: 1,
        fechaCreacion: "2025-07-13T11:00:00",
        ultimaActualizacion: "",
      },
    ],
  },
  {
    id: 2,
    nombreProyecto: "PROJ-TASK",
    descripcionProyecto: "Sistema de tareas",
    fechaInicio: "2025-06-01",
    fechaFin: "2025-08-15",
    fechaFinReal: "",
    estado: "En progreso",
    fechaCreacion: "2025-06-01T12:00:00",
    cliente: { usuarioId: 2, nombre: "Cliente B" },
    gerenteProyecto: { usuarioId: 2, nombre: "Claudio Martins" },
    creadoPor: { usuarioId: 2, nombre: "Claudio Martins" },
    tareas: [
      {
        id: 21,
        proyectoId: 2,
        nombre: "Setup inicial",
        descripcion: "Configuración base del entorno",
        estado: "COMPLETADA",
        prioridad: "MEDIA",
        fechaInicioEstimada: "2025-06-01",
        fechaFinEstimada: "2025-06-03",
        fechaInicioReal: "2025-06-01",
        fechaFinReal: "2025-06-02",
        creadoPorId: 2,
        fechaCreacion: "2025-06-01T09:00:00",
        ultimaActualizacion: "2025-06-02T15:00:00",
      },
      {
        id: 22,
        proyectoId: 2,
        nombre: "Back-end API",
        descripcion: "Desarrollo de endpoints principales",
        estado: "EN_PROGRESO",
        prioridad: "ALTA",
        fechaInicioEstimada: "2025-06-04",
        fechaFinEstimada: "2025-07-10",
        fechaInicioReal: "2025-06-04",
        fechaFinReal: "",
        creadoPorId: 2,
        fechaCreacion: "2025-06-04T10:00:00",
        ultimaActualizacion: "2025-06-28T12:30:00",
      },
      {
        id: 23,
        proyectoId: 2,
        nombre: "Front-end UI",
        descripcion: "Maquetación y componentes principales",
        estado: "NO_INICIADA",
        prioridad: "ALTA",
        fechaInicioEstimada: "2025-07-11",
        fechaFinEstimada: "2025-08-10",
        fechaInicioReal: "",
        fechaFinReal: "",
        creadoPorId: 2,
        fechaCreacion: "2025-07-11T10:00:00",
        ultimaActualizacion: "",
      },
    ],
  },
];

function TrackingProject() {
  const [selected, setSelected] = useState(null);

  // Función para formato fecha (si es LocalDate o String YYYY-MM-DD)
  const fmtDate = (date) =>
    date ? (date.length > 10 ? date.split("T")[0] : date) : "-";

  // Estados y colores para las tareas (sin switch-case)
  const estadoChip = (estado) =>
    STATUS_STYLE[estado] || "bg-gray-100 text-gray-500";

  const prioridadChip = (prioridad) =>
    PRIORITY_STYLE[prioridad] || "bg-gray-100 text-gray-500";

  return (
    <div className="admin-page h-full min-h-screen flex flex-col">
      <Topbar title="Tracking Project" showSearch={false} />
      <div className="admin-content flex-1 flex flex-col justify-center items-center p-0">
        {/* LISTA */}
        {!selected ? (
          <div className="w-full max-w-7xl mx-auto py-8 flex flex-col gap-6 h-full">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4 px-4">
              Project List
            </h2>
            <div className="overflow-x-auto w-full flex-1">
              <table className="w-full text-lg rounded-2xl bg-white shadow-2xl border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                      Manager
                    </th>
                    <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockProjects.map((proj, i) => (
                    <tr
                      key={proj.id}
                      className={`
                      hover:bg-purple-50 hover:scale-[1.01] transition cursor-pointer
                      ${i % 2 ? "bg-gray-50" : "bg-white"}
                    `}
                      style={{ height: "68px" }}
                      onClick={() => setSelected(proj)}
                    >
                      <td className="px-6 py-6 font-semibold text-gray-800 text-lg">
                        {proj.nombreProyecto}
                      </td>
                      <td className="px-6 py-6 text-base">
                        {proj.cliente.nombre}
                      </td>
                      <td className="px-6 py-6 text-base">
                        {proj.gerenteProyecto.nombre}
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={`px-4 py-1 rounded-full font-bold text-base 
                        ${
                          PROJECT_STATUS_STYLE[proj.estado] ||
                          "bg-gray-100 text-gray-500"
                        }
                      `}
                        >
                          {proj.estado}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(proj);
                          }}
                          className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold text-base shadow-lg hover:from-purple-600 hover:to-purple-800 transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // DETAIL + TASKS
          <div className="w-full h-full flex justify-center items-stretch">
            <div className="w-full max-w-6xl mx-auto my-8 bg-white rounded-3xl shadow-2xl p-5 sm:p-10 md:p-16 relative flex flex-col min-h-[75vh] animate-fade-in">
              {/* Volver */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-purple-700 transition"
                title="Back"
              >
                <span className="mr-1 text-xl">←</span> Back
              </button>

              {/* Info principal */}
              <div className="w-full flex flex-col md:flex-row gap-10 mb-8">
                {/* Izquierda: Nombre y descripción */}
                <div className="flex-1 min-w-[220px] flex flex-col justify-center">
                  <h2 className="text-4xl font-extrabold text-purple-700 mb-3">
                    {selected.nombreProyecto}
                  </h2>
                  <div className="text-gray-500 text-xl mb-6">
                    {selected.descripcionProyecto}
                  </div>
                  {/* Info general ahora en fila horizontal */}
                  <div className="flex flex-row flex-wrap gap-x-10 gap-y-2 mt-4">
                    <div>
                      <span className="block text-gray-400 text-base">
                        Client
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.cliente.nombre ||
                          "Client #" + selected.cliente.usuarioId}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Project Manager
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.gerenteProyecto.nombre ||
                          "User #" + selected.gerenteProyecto.usuarioId}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Created By
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.creadoPor.nombre ||
                          "User #" + selected.creadoPor.usuarioId}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Created On
                      </span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {fmtDate(selected.fechaCreacion)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Derecha: Fechas & Status */}
                <div className="flex-1 min-w-[230px] flex flex-col md:justify-end md:items-end">
                  <div className="flex flex-row flex-wrap gap-x-10 gap-y-2 w-full md:w-auto md:justify-end">
                    <div>
                      <span className="block text-gray-400 text-base">
                        Start Date
                      </span>
                      <span className="font-bold text-gray-800 text-lg">
                        {fmtDate(selected.fechaInicio)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Planned End
                      </span>
                      <span className="font-bold text-gray-800 text-lg">
                        {fmtDate(selected.fechaFin)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Actual End
                      </span>
                      <span className="font-bold text-gray-800 text-lg">
                        {fmtDate(selected.fechaFinReal)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">
                        Status
                      </span>
                      <span
                        className={`font-bold px-4 py-1 rounded-full text-base ${
                          PROJECT_STATUS_STYLE[selected.estado] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {selected.estado}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TASKS */}
              <div className="mt-4 w-full min-w-0">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">
                  Tasks
                </h3>
                <div className="w-full min-w-0">
                  <div className="overflow-x-auto w-full min-w-0 bg-transparent">
                    <div className="rounded-2xl shadow-lg bg-white min-w-0 p-0">
                      <table className="min-w-[900px] w-full text-base sm:text-sm">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Task
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Description
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Status
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Priority
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Est. Start
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Est. End
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Real Start
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Real End
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {(selected.tareas || []).length === 0 ? (
                            <tr>
                              <td
                                colSpan={9}
                                className="text-center py-10 text-gray-400"
                              >
                                No tasks registered for this project.
                              </td>
                            </tr>
                          ) : (
                            selected.tareas.map((task, idx) => (
                              <tr
                                key={task.id}
                                className={idx % 2 === 1 ? "bg-gray-50" : ""}
                              >
                                <td className="px-4 py-3 sm:px-2 font-semibold whitespace-nowrap">
                                  {task.nombre}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {task.descripcion}
                                </td>
                                <td className="px-4 py-3 sm:px-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${estadoChip(
                                      task.estado
                                    )}`}
                                  >
                                    {task.estado.replace(/_/g, " ")}
                                  </span>
                                </td>
                                <td className="px-4 py-3 sm:px-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${prioridadChip(
                                      task.prioridad
                                    )}`}
                                  >
                                    {task.prioridad}
                                  </span>
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaInicioEstimada)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaFinEstimada)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaInicioReal)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaFinReal)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackingProject;
