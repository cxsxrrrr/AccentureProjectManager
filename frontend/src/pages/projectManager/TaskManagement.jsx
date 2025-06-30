import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewTaskModal from "../../components/manager/modals/Tasks/NewTaskModal";
import UpdateTaskModal from "../../components/manager/modals/Tasks/UpdateTaskModal";
import DisableTaskModal from "../../components/manager/modals/Tasks/DisableTaskModal";
import { getTasks, createTask, updateTask, disableTask } from "../../services/taskService";
import "../../stylesheets/page.css";
import api from "../../services/axios";

// Mock de usuarios igual que el backend (usa usuarioId)
const users = [
  { usuarioId: 1, name: "Jane Smith" },
  { usuarioId: 2, name: "John Doe" },
  { usuarioId: 3, name: "Carlos Reyes" }
];

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar usuario autenticado desde localStorage (ajusta si usas contexto)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  // Cargar proyectos al montar
  useEffect(() => {
    api.get("/proyectos").then(res => setProyectos(res.data)).catch(() => setProyectos([]));
  }, []);

  // Modals
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  // Cargar tareas al montar
  useEffect(() => {
    fetchTasks();
  }, []);

  // Obtener todas las tareas desde el backend
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tareas');
      setTasks(res.data);
    } catch (err) {
      alert("Error loading tasks");
    }
  };

  // Tarea seleccionada
  const selectedTask = tasks.find((t) => t.tareasId === selectedId);

  // Selección múltiple
  const handleSelect = (id, checked) => {
    setSelectedTasks((prev) =>
      checked ? [...prev, id] : prev.filter((tid) => tid !== id)
    );
  };
  const handleSelectAll = (checked) => {
    setSelectedTasks(checked ? tasks.map((t) => t.tareasId) : []);
  };

  // Handlers para modals
  const handleCreate = () => setShowNew(true);
  const handleUpdate = () => selectedTask && setShowUpdate(true);
  const handleDisable = () => selectedTask && setShowDisable(true);
  const handleAssign = () => {
    if (selectedTasks.length > 0) setShowAssign(true);
  };

  // Guardar nueva tarea
  const handleSaveNew = async (data) => {
    try {
      // Elimina objetos anidados y deja solo los IDs planos
      const { proyecto, creadoPor, ...flatData } = data;
      // Si el modal aún manda los objetos, extrae los IDs
      if (proyecto && proyecto.proyectoId) flatData.proyectoId = proyecto.proyectoId;
      if (creadoPor && creadoPor.usuarioId) flatData.creadoPorId = creadoPor.usuarioId;
      const res = await createTask(flatData);
      setTasks((prev) => [...prev, res.data]);
      setShowNew(false);
    } catch (err) {
      alert("Error creating task");
    }
  };

  // Guardar actualización
  const handleSaveUpdate = async (updated) => {
    try {
      const res = await updateTask(selectedTask.tareasId, updated);
      setTasks(tasks.map((t) => (t.tareasId === selectedTask.tareasId ? res.data : t)));
      setShowUpdate(false);
    } catch (err) {
      alert("Error updating task");
    }
  };

  // Guardar deshabilitado
  const handleSaveDisable = async (taskToDisable) => {
    try {
      await disableTask(taskToDisable.tareasId);
      setTasks(tasks.map((t) =>
        t.tareasId === taskToDisable.tareasId ? { ...t, estado: "BLOQUEADA" } : t
      ));
      setShowDisable(false);
    } catch (err) {
      alert("Error disabling task");
    }
  };

  // Asignar a múltiples tareas seleccionadas (mock, debes implementar API si quieres persistencia)
  const handleAssignTask = (userNames) => {
    setTasks((prev) =>
      prev.map((t) =>
        selectedTasks.includes(t.tareasId)
          ? { ...t, assignedTo: userNames.join(", ") }
          : t
      )
    );
    setShowAssign(false);
    setSelectedTasks([]);
  };

  // Mostrar nombre asignado
  function getAssignedUser(tarea) {
    if (tarea.assignedTo) return tarea.assignedTo;
    const user = users.find(u => u.usuarioId === tarea.creadoPor?.usuarioId);
    return user ? user.name : "-";
  }

  // Etiquetas traducidas
  function getStatusLabel(status) {
    switch (status) {
      case "NO_INICIADA": return "Not Started";
      case "EN_PROGRESO": return "In Progress";
      case "COMPLETADA": return "Completed";
      case "BLOQUEADA": return "Blocked";
      default: return status;
    }
  }
  function getPriorityLabel(priority) {
    switch (priority) {
      case "ALTA": return "High";
      case "MEDIA": return "Medium";
      case "BAJA": return "Low";
      default: return priority;
    }
  }
  function getStatusClass(status) {
    switch (status) {
      case "COMPLETADA": return "bg-green-100 text-green-700";
      case "EN_PROGRESO": return "bg-blue-100 text-blue-700";
      case "NO_INICIADA": return "bg-yellow-100 text-yellow-700";
      case "BLOQUEADA": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-700";
    }
  }
  function getPriorityClass(priority) {
    switch (priority) {
      case "ALTA": return "bg-red-100 text-red-700";
      case "MEDIA": return "bg-yellow-100 text-yellow-700";
      case "BAJA": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
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
          onAssign={selectedTasks.length > 0 ? handleAssign : undefined}
          assignDisabled={selectedTasks.length === 0}
        />
      </Topbar>
      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-4 py-4 w-1">
                  <input
                    type="checkbox"
                    checked={
                      selectedTasks.length === tasks.length && tasks.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Task Name</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Project</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Estimated Start</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Estimated End</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">Assigned User</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr
                  key={task.tareasId}
                  onClick={() => setSelectedId(task.tareasId)}
                  className={`
                    cursor-pointer transition
                    ${selectedId === task.tareasId
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : idx % 2
                        ? "bg-gray-50"
                        : ""}
                    hover:bg-purple-50
                  `}
                >
                  <td className="px-4 py-5 w-1" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.tareasId)}
                      onChange={(e) => handleSelect(task.tareasId, e.target.checked)}
                      onClick={e => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">{task.nombre}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{task.proyecto?.nombreProyecto || "-"}</td>
                  <td className="py-5 px-6">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${getStatusClass(task.estado)}`}>
                      {getStatusLabel(task.estado)}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs ${getPriorityClass(task.prioridad)}`}>
                      {getPriorityLabel(task.prioridad)}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{task.fechaInicioEstimada || "-"}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{task.fechaFinEstimada || "-"}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{getAssignedUser(task)}</td>
                </tr>
              ))}
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
      />
      <DisableTaskModal
        isOpen={showDisable}
        onClose={() => setShowDisable(false)}
        onDisable={handleSaveDisable}
        task={selectedTask}
      />
      <AssignTaskModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={handleAssignTask}
        users={users}
        tasksToAssign={tasks.filter((t) => selectedTasks.includes(t.tareasId))}
      />
    </div>
  );
}

// MODAL para asignación masiva (sin cambios, sigue siendo mock)
function AssignTaskModal({
  isOpen,
  onClose,
  onAssign,
  users = [],
  tasksToAssign,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (isOpen) setSelectedUsers([]);
  }, [isOpen, tasksToAssign]);

  if (!isOpen || !tasksToAssign || tasksToAssign.length === 0) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length) {
      onAssign(selectedUsers); // IDs numéricos
      setSelectedUsers([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-0 relative animate-fade-in">
        {/* Header Sticky */}
        <div className="sticky top-0 z-10 bg-white rounded-t-2xl px-8 pt-8 pb-4 flex items-center gap-3 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-purple-100 p-2 rounded-xl text-purple-500">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
            Assign Tasks
          </h2>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-3xl leading-none font-bold transition"
            aria-label="Close modal"
            type="button"
          >
            <p>X</p>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-7">
          {/* Tareas seleccionadas */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Selected tasks
            </label>
            <div className="flex flex-wrap gap-2">
              {tasksToAssign.map((t) => (
                <span
                  key={t.tareasId}
                  className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-semibold gap-1 border border-purple-200"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                  {t.nombre}
                </span>
              ))}
            </div>
          </div>
          {/* Usuarios a asignar */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Assign to users
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {users.map((u) => (
                <label
                  key={u.usuarioId}
                  className={`flex items-center gap-2 cursor-pointer transition
                    rounded-lg px-3 py-2 border
                    ${
                      selectedUsers.includes(u.usuarioId)
                        ? "bg-purple-50 border-purple-400 text-purple-700 font-bold"
                        : "bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className="accent-purple-600 w-4 h-4"
                    checked={selectedUsers.includes(u.usuarioId)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedUsers((s) =>
                        checked
                          ? [...s, u.usuarioId]
                          : s.filter((id) => id !== u.usuarioId)
                      );
                    }}
                  />
                  <span>{u.name}</span>
                </label>
              ))}
            </div>
            <span className="block text-xs text-gray-400 mt-1">
              You can select more than one user
            </span>
          </div>
          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedUsers.length}
              className={`px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition ${
                !selectedUsers.length ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskManagement;