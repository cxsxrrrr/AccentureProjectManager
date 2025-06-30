import React, { useState, useEffect } from "react";
import api from "../../services/axios";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import UpdateStatusModal from "../../components/teamMember/modals/Task/UpdateStatusModal";
import "../../stylesheets/page.css";


// Mockup de tareas asignadas al trabajador
const mockTasks = [
  {
    tareas_id: 201,
    descripcion: "Diseñar la interfaz de usuario para el nuevo módulo de ventas.",
    estado: "En progreso",
    fecha_creacion: "2025-06-01T10:24:00Z",
    fecha_fin_estimada: "2025-06-20",
    fecha_fin_real: null,
    fecha_inicio_estimada: "2025-06-10",
    fecha_inicio_real: "2025-06-12",
    nombre: "Diseño UI ventas",
    peso: 5,
    prioridad: "Alta",
    ultima_actualizacion: "2025-06-14T09:10:00Z",
    creado_por: 9,
    proyecto_nombre: "Ventas WebApp"
  },
  {
    tareas_id: 202,
    descripcion: "Actualizar la base de datos de productos.",
    estado: "Pendiente",
    fecha_creacion: "2025-05-15T08:43:00Z",
    fecha_fin_estimada: "2025-06-25",
    fecha_fin_real: null,
    fecha_inicio_estimada: "2025-06-18",
    fecha_inicio_real: null,
    nombre: "Update DB productos",
    peso: 3,
    prioridad: "Media",
    ultima_actualizacion: "2025-06-13T11:05:00Z",
    creado_por: 3,
    proyecto_nombre: "Inventario Central"
  },
  {
    tareas_id: 203,
    descripcion: "Crear mockups para la sección de reportes.",
    estado: "Completada",
    fecha_creacion: "2025-06-03T14:00:00Z",
    fecha_fin_estimada: "2025-06-10",
    fecha_fin_real: "2025-06-09",
    fecha_inicio_estimada: "2025-06-05",
    fecha_inicio_real: "2025-06-05",
    nombre: "Mockups reportes",
    peso: 2,
    prioridad: "Baja",
    ultima_actualizacion: "2025-06-10T15:30:00Z",
    creado_por: 5,
    proyecto_nombre: "Reportes Analytics"
  }
];

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);

  // Fetch assigned tasks for current user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.usuarioId) {
          const response = await api.get(
            `/miembro-tareas/usuario/${user.usuarioId}`
          );
          setTasks(response.data);
        }
      } catch (error) {
        console.error("Error fetching assigned tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Tarea seleccionada
  const selectedTask = tasks.find(t => t.id === selectedId);

  // Actualizar el estado de una tarea (cuando vuelve del modal)
  const handleUpdateTaskStatus = (newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === selectedId
          ? { 
              ...task, 
              // update nested estado and ultima_actualizacion in tarea DTO
              tarea: { ...task.tarea, estado: newStatus, ultimaActualizacion: new Date().toISOString() }
            }
          : task
      )
    );
    setShowUpdateStatus(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Assigned Tasks">
        <TopControls
          module="custom_assignedtasks"
          onUpdate={selectedTask ? () => setShowUpdateStatus(true) : undefined}
        />
      </Topbar>
      <div className="admin-content">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4 min-w-[950px]">
            <thead>
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Task
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Priority
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Due Date
                </th>
                <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedId(task.id)}
                  className={`
                    cursor-pointer transition 
                    ${
                      selectedId === task.id
                        ? "bg-purple-100 ring-2 ring-purple-200"
                        : idx % 2
                        ? "bg-gray-50"
                        : ""
                    }
                    hover:bg-purple-50
                  `}
                >
                  <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {task.tarea.nombre}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{task.proyecto.nombreProyecto}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`
                        px-4 py-1 rounded-full font-bold text-sm
                        ${
                          task.tarea.estado === "COMPLETADA" || task.tarea.estado === "Completada"
                            ? "bg-green-100 text-green-700"
                            : task.tarea.estado === "EN_PROGRESO" || task.tarea.estado === "En progreso"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.tarea.estado === "PENDIENTE" || task.tarea.estado === "Pendiente"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {task.tarea.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{task.tarea.prioridad}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {task.tarea.fechaFinEstimada}
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    {task.tarea.descripcion}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No assigned tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateStatusModal
        isOpen={showUpdateStatus}
        onClose={() => setShowUpdateStatus(false)}
        onUpdate={handleUpdateTaskStatus}
        task={selectedTask}
      />
    </div>
  );
}

export default AssignedTasks;