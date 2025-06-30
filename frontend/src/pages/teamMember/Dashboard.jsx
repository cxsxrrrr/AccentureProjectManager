import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";
import api from "../../services/axios";

function Dashboard() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);

  const forEnum = (value) => {
    if (!value) return "";
    return value
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  // Función para calcular el porcentaje de avance del proyecto
  const calcularAvanceProyecto = (proyectoId) => {
    const tareasProyecto = pendingTasks.filter(task => task.proyecto?.proyectoId === proyectoId);

    if (tareasProyecto.length === 0) {
      return 0;
    }

    const tareasCompletadas = tareasProyecto.filter(task =>
      task.tarea?.estado === "COMPLETADA"
    ).length;

    return Math.round((tareasCompletadas / tareasProyecto.length) * 100);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.usuarioId) {
          const [tasksResponse, projectsResponse] = await Promise.all([
            api.get(`/miembro-tareas/usuario/${user.usuarioId}`),
            api.get(`/miembros-proyectos/usuario/${user.usuarioId}`)
          ]);
          setPendingTasks(tasksResponse.data);
          setActiveProjects(projectsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-page">
      <Topbar title="Employee Dashboard" />
      <div className="admin-content" style={{ display: "block" }}>

        {/* Tareas asignadas */}
        <div className="w-full mb-20">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Pending Tasks</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-6">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map((task, idx) => (
                  <tr key={task.id} className={`${idx % 2 ? "bg-gray-50" : ""} hover:bg-purple-50 transition`}>
                    <td className="py-2">{task.tarea?.nombre}</td>
                    <td className="py-2">{task.proyecto?.nombreProyecto}</td>
                    <td className="py-2">{forEnum(task.tarea?.prioridad)}</td>
                    <td className="py-2">{task.tarea?.fechaFinEstimada}</td>
                    <td>
                      <span className={
                        task.tarea?.estado === "EN_PROGRESO"
                          ? "px-4 py-1 rounded-full font-bold text-sm bg-yellow-100 text-yellow-700"
                          : task.tarea?.estado === "COMPLETADA"
                            ? "px-4 py-1 rounded-full font-bold text-sm bg-green-100 text-green-700"
                            : "px-4 py-1 rounded-full font-bold text-sm bg-blue-100 text-blue-700"
                      }>
                        {forEnum(task.tarea?.estado)}
                      </span>
                    </td>
                  </tr>
                ))}
                {pendingTasks.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">No pending tasks</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Proyectos activos */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Active Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-6">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Manager</th>
                  <th>Progress</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((proj, idx) => {
                  const avance = calcularAvanceProyecto(proj.proyecto?.proyectoId);
                  return (
                    <tr key={proj.id} className={`${idx % 2 ? "bg-gray-50" : ""} hover:bg-purple-50 transition`}>
                      <td className="py-2" >{proj.proyecto?.nombreProyecto}</td>
                      <td className="py-2">{`${proj.proyecto?.gerenteProyecto?.nombre ?? ""} ${proj.proyecto?.gerenteProyecto?.apellido}`}</td>
                      <td className="py-2">
                        <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{ width: `${avance}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{avance}% complete</div>
                      </td>
                      <td className="py-2">{proj.proyecto?.fechaFin}</td>
                      <td className="py-2">
                        <span className={
                          proj.proyecto?.estado === "EN_PROGRESO"
                            ? "px-4 py-1 rounded-full font-bold text-sm bg-yellow-100 text-yellow-700"
                            : proj.proyecto?.estado === "COMPLETADO"
                              ? "px-4 py-1 rounded-full font-bold text-sm bg-green-100 text-green-700"
                              : "px-4 py-1 rounded-full font-bold text-sm bg-blue-100 text-blue-700"
                        }>
                          {forEnum(proj.proyecto?.estado)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {activeProjects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400">No active projects</td>
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

export default Dashboard;