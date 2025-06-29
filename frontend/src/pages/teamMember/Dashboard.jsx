import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function Dashboard() {
  // Tareas mock
  const [pendingTasks] = useState([
    {
      id: 1,
      nombre: "Diseño de interfaz de usuario",
      proyecto: "Website Revamp",
      prioridad: "Alta",
      fecha_fin_estimada: "2025-07-15",
      estado: "Pendiente",
    },
    {
      id: 2,
      nombre: "Pruebas de integración",
      proyecto: "Cloud Migration",
      prioridad: "Media",
      fecha_fin_estimada: "2025-07-20",
      estado: "En progreso",
    },
  ]);
  // Proyectos mock
  const [activeProjects] = useState([
    {
      id: 1,
      nombre: "Website Revamp",
      gerente: "John Doe",
      progreso: 65,
      fecha_fin: "2025-08-01",
      estado: "En progreso",
    },
    {
      id: 2,
      nombre: "Cloud Migration",
      gerente: "Ana Torres",
      progreso: 30,
      fecha_fin: "2025-12-15",
      estado: "En progreso",
    },
  ]);

  return (
    <div className="admin-page">
      <Topbar title="Employee Dashboard" />
      <div className="admin-content" style={{ display: "block" }}>
        {/* Tareas */}
        <div className="w-full mb-12">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Pending Tasks</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Task</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Project</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Priority</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Due Date</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingTasks.map((task, idx) => (
                  <tr key={task.id}
                    className={`${idx % 2 ? "bg-gray-50" : ""} hover:bg-purple-50 transition`}>
                    <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">{task.nombre}</td>
                    <td className="py-4 px-6 text-gray-700">{task.proyecto}</td>
                    <td className="py-4 px-6 text-gray-700">{task.prioridad}</td>
                    <td className="py-4 px-6 text-gray-700">{task.fecha_fin_estimada}</td>
                    <td className="py-4 px-6">
                      <span className={
                        task.estado === "En progreso"
                          ? "px-4 py-1 rounded-full font-bold text-sm bg-yellow-100 text-yellow-700"
                          : "px-4 py-1 rounded-full font-bold text-sm bg-blue-100 text-blue-700"
                      }>{task.estado}</span>
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
        {/* Proyectos */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Active Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Project</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Manager</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Progress</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Deadline</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((project, idx) => (
                  <tr key={project.id}
                    className={`${idx % 2 ? "bg-gray-50" : ""} hover:bg-purple-50 transition`}>
                    <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">{project.nombre}</td>
                    <td className="py-4 px-6 text-gray-700">{project.gerente}</td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${project.progreso}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{project.progreso}% complete</div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{project.fecha_fin}</td>
                    <td className="py-4 px-6">
                      <span className={
                        project.estado === "En progreso"
                          ? "px-4 py-1 rounded-full font-bold text-sm bg-yellow-100 text-yellow-700"
                          : "px-4 py-1 rounded-full font-bold text-sm bg-green-100 text-green-700"
                      }>{project.estado}</span>
                    </td>
                  </tr>
                ))}
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

export default Dashboard;