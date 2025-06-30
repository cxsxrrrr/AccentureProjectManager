import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewTaskModal from "../../components/manager/modals/Tasks/NewTaskModal";
import UpdateTaskModal from "../../components/manager/modals/Tasks/UpdateTaskModal";
import DisableTaskModal from "../../components/manager/modals/Tasks/DisableTaskModal";
import {
  saveTask,
  getTasks,
  createTask,
  updateTask,
  disableTask,
} from "../../services/taskService";
import "../../stylesheets/page.css";
import api from "../../services/axios";

// Mock de usuarios igual que el backend (usa usuarioId)
const users = [
  { usuarioId: 1, name: "Jane Smith" },
  { usuarioId: 2, name: "John Doe" },
  { usuarioId: 3, name: "Carlos Reyes" },
];

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuario autenticado desde localStorage (ajusta si usas contexto)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  // Cargar proyectos al montar
  useEffect(() => {
    api
      .get("/proyectos")
      .then((res) => setProyectos(res.data))
      .catch(() => setProyectos([]));
  }, []);

  // Modals
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);

  // Cargar tareas al montar
  useEffect(() => {
    fetchTasks();
  }, []);

  // Obtener todas las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tareas");
      setTasks(res.data);
    } catch (err) {
      alert("Error loading tasks");
    }
  };

  // Tarea seleccionada
  const selectedTask = tasks.find((t) => t.id === selectedId);

  // Selección individual
  const handleSelect = (id, checked) => {
    setSelectedId(checked ? id : null);
  };

  // Handlers para modals
  const handleCreate = () => setShowNew(true);
  const handleUpdate = () => selectedTask && setShowUpdate(true);
  const handleDisable = () => selectedTask && setShowDisable(true);

  // Guardar nueva tarea
  const handleSaveNew = async (data) => {
    try {
      // Elimina objetos anidados y deja solo los IDs planos
      const { proyecto, creadoPor, ...flatData } = data;
      if (proyecto && proyecto.proyectoId)
        flatData.proyectoId = proyecto.proyectoId;
      if (creadoPor && creadoPor.usuarioId)
        flatData.creadoPorId = creadoPor.usuarioId;
      const res = await createTask(flatData);
      setTasks((prev) => [...prev, res.data]);
      setShowNew(false);
    } catch (err) {
      alert("Error creating task");
    }
  };

  // Guardar actualización
  const handleSaveUpdate = async (tareaEditada) => {
    try {
      const res = await saveTask(tareaEditada); // <-- este método ahora hace PUT a /api/tareas
      setTasks(
        tasks.map((t) => (t.id === tareaEditada.tareasId ? res.data : t))
      );
      setShowUpdate(false);
    } catch (err) {
      alert("Error updating task");
    }
  };

  // Guardar deshabilitado
const handleSaveDisable = async (taskToDisable) => {
  try {
    // Genera el objeto actualizado SOLO con los campos que tu backend espera en el DTO:
    const tareaActualizada = {
      id: taskToDisable.id, // asegúrate que sea el campo correcto, a veces es tareasId
      proyectoId: taskToDisable.proyecto?.proyectoId || taskToDisable.proyectoId,
      nombre: taskToDisable.nombre,
      descripcion: taskToDisable.descripcion,
      estado: "BLOQUEADA",  // <---- Cambia el estado aquí
      prioridad: taskToDisable.prioridad,
      fechaInicioEstimada: taskToDisable.fechaInicioEstimada,
      fechaFinEstimada: taskToDisable.fechaFinEstimada,
      fechaInicioReal: taskToDisable.fechaInicioReal,
      fechaFinReal: taskToDisable.fechaFinReal,
      creadoPorId: taskToDisable.creadoPor?.usuarioId || taskToDisable.creadoPorId,
      fechaCreacion: taskToDisable.fechaCreacion,
      ultimaActualizacion: new Date().toISOString(),
    };

    const res = await saveTask(tareaActualizada); // usa el mismo PUT /api/tareas
    setTasks(
      tasks.map((t) => (t.id === taskToDisable.id ? res.data : t))
    );
    setShowDisable(false);
  } catch (err) {
    alert("Error disabling task");
  }
};


  // Mostrar nombre asignado
  function getAssignedUser(tarea) {
    if (tarea.assignedTo) return tarea.assignedTo;
    const user = users.find((u) => u.usuarioId === tarea.creadoPor?.usuarioId);
    return user ? user.name : "-";
  }

  // Etiquetas traducidas
  function getStatusLabel(status) {
    switch (status) {
      case "NO_INICIADA":
        return "Not Started";
      case "EN_PROGRESO":
        return "In Progress";
      case "COMPLETADA":
        return "Completed";
      case "BLOQUEADA":
        return "Blocked";
      default:
        return status;
    }
  }

  function getPriorityLabel(priority) {
    switch (priority) {
      case "ALTA":
        return "High";
      case "MEDIA":
        return "Medium";
      case "BAJA":
        return "Low";
      default:
        return priority;
    }
  }
  function getStatusClass(status) {
    switch (status) {
      case "COMPLETADA":
        return "bg-green-100 text-green-700";
      case "EN_PROGRESO":
        return "bg-blue-100 text-blue-700";
      case "NO_INICIADA":
        return "bg-yellow-100 text-yellow-700";
      case "BLOQUEADA":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  function getPriorityClass(priority) {
    switch (priority) {
      case "ALTA":
        return "bg-red-100 text-red-700";
      case "MEDIA":
        return "bg-yellow-100 text-yellow-700";
      case "BAJA":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="admin-page">
      <Topbar title="Task Management">
        <TopControls
          module="task"
          onCreate={handleCreate}
          onUpdate={selectedTask ? handleUpdate : undefined}
          onDisable={selectedTask ? handleDisable : undefined}
        />
      </Topbar>
      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-4 py-4 w-1"></th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Estimated Start
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Estimated End
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  Assigned User
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => {
                return (
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
                    <td
                      className="px-4 py-5 w-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedId === task.id}
                        onChange={(e) =>
                          handleSelect(task.id, e.target.checked)
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                      {task.nombre}
                    </td>
                    <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                      {task.proyecto?.nombreProyecto || "-"}
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-xs ${getStatusClass(
                          task.estado
                        )}`}
                      >
                        {getStatusLabel(task.estado)}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-xs ${getPriorityClass(
                          task.prioridad
                        )}`}
                      >
                        {getPriorityLabel(task.prioridad)}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                      {task.fechaInicioEstimada || "-"}
                    </td>
                    <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                      {task.fechaFinEstimada || "-"}
                    </td>
                    <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                      {getAssignedUser(task)}
                    </td>
                  </tr>
                );
              })}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      <NewTaskModal
        isOpen={showNew}
        onClose={() => setShowNew(false)}
        onSave={handleSaveNew}
        currentUser={currentUser}
        proyectos={proyectos}
      />
      <UpdateTaskModal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        onSave={handleSaveUpdate}
        initialData={selectedTask}
        currentUser={currentUser}
        proyectos={proyectos}
        users={users}
      />
      <DisableTaskModal
        isOpen={showDisable}
        onClose={() => setShowDisable(false)}
        onDisable={handleSaveDisable}
        task={selectedTask}
      />
    </div>
  );
}

export default TaskManagement;
