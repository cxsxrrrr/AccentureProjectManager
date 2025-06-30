import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewTaskModal from "../../components/manager/modals/Tasks/NewTaskModal";
import UpdateTaskModal from "../../components/manager/modals/Tasks/UpdateTaskModal";
import DisableTaskModal from "../../components/manager/modals/Tasks/DisableTaskModal";
import AssignTaskModal from "../../components/manager/modals/Tasks/AssignTaskModal";
import { saveTask, createTask } from "../../services/taskService";
import { getUsers } from "../../services/userService";
import "../../stylesheets/page.css";
import api from "../../services/axios";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [miembrosByTask, setMiembrosByTask] = useState({});
  const [search, setSearch] = useState("");

  // Modals
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    api
      .get("/proyectos")
      .then((res) => setProyectos(res.data))
      .catch(() => setProyectos([]));
  }, []);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUsers()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data.content || []);
        setUsers(
          data.map(u => ({
            usuarioId: u.usuarioId,
            name: [u.nombre, u.apellido].filter(Boolean).join(" ") || u.nombre || `User #${u.usuarioId}`,
          }))
        );
      })
      .catch(() => setUsers([]));
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tareas");
      setTasks(res.data);

      const miembroRequests = res.data.map((task) =>
        api.get(`/miembro-tareas/tarea/${task.id}`)
          .then(resp => ({ taskId: task.id, miembros: resp.data }))
          .catch(() => ({ taskId: task.id, miembros: [] }))
      );
      const miembroResults = await Promise.all(miembroRequests);
      const miembrosMap = {};
      miembroResults.forEach(({ taskId, miembros }) => {
        miembrosMap[taskId] = miembros;
      });
      setMiembrosByTask(miembrosMap);

    } catch (err) {
      alert("Error loading tasks");
    }
  };

  const selectedTask = tasks.find((t) => t.id === selectedId);

  // Handlers
  const handleSelect = (id, checked) => {
    setSelectedId(checked ? id : null);
  };

  const handleCreate = () => setShowNew(true);
  const handleUpdate = () => selectedTask && setShowUpdate(true);
  const handleDisable = () => selectedTask && setShowDisable(true);
  const handleAssign = () => {
    if (!selectedTask) {
      alert("Please select a task to assign.");
      return;
    }
    setShowAssign(true);
  };

  const handleSaveNew = async (data) => {
    try {
      const { proyecto, creadoPor, ...flatData } = data;
      if (proyecto && proyecto.proyectoId)
        flatData.proyectoId = proyecto.proyectoId;
      if (creadoPor && creadoPor.usuarioId)
        flatData.creadoPorId = creadoPor.usuarioId;
      const res = await createTask(flatData);
      setTasks((prev) => [...prev, res.data]);
      setShowNew(false);
      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  const handleSaveUpdate = async (tareaEditada) => {
    try {
      const res = await saveTask(tareaEditada);
      setTasks(
        tasks.map((t) => (t.id === tareaEditada.tareasId ? res.data : t))
      );
      setShowUpdate(false);
      fetchTasks();
    } catch (err) {
      alert("Error updating task");
    }
  };

  const handleSaveDisable = async (taskToDisable) => {
    try {
      const tareaActualizada = {
        id: taskToDisable.id,
        proyectoId: taskToDisable.proyecto?.proyectoId || taskToDisable.proyectoId,
        nombre: taskToDisable.nombre,
        descripcion: taskToDisable.descripcion,
        estado: "BLOQUEADA",
        prioridad: taskToDisable.prioridad,
        fechaInicioEstimada: taskToDisable.fechaInicioEstimada,
        fechaFinEstimada: taskToDisable.fechaFinEstimada,
        fechaInicioReal: taskToDisable.fechaInicioReal,
        fechaFinReal: taskToDisable.fechaFinReal,
        creadoPorId: taskToDisable.creadoPor?.usuarioId || taskToDisable.creadoPorId,
        fechaCreacion: taskToDisable.fechaCreacion,
        ultimaActualizacion: new Date().toISOString(),
      };
      const res = await saveTask(tareaActualizada);
      setTasks(
        tasks.map((t) => (t.id === taskToDisable.id ? res.data : t))
      );
      setShowDisable(false);
      fetchTasks();
    } catch (err) {
      alert("Error disabling task");
    }
  };

  const handleAssignTask = async (userId, task) => {
    try {
      await api.post("/miembro-tareas", {
        usuarioId: userId,
        tareaId: task.id,
        proyectoId: task.proyecto?.proyectoId || task.proyectoId,
        asignadoPorId: currentUser?.usuarioId,
      });
      alert(`Task "${task.nombre}" assigned!`);
      setShowAssign(false);
      fetchTasks();
    } catch (err) {
      alert("Error assigning task");
    }
  };

  function getAssignedUsers(task) {
    const miembros = miembrosByTask[task.id] || [];
    if (miembros.length === 0) return "-";
    return miembros
      .map((m) => {
        if (m.usuario && (m.usuario.nombre || m.usuario.apellido)) {
          return [m.usuario.nombre, m.usuario.apellido].filter(Boolean).join(" ");
        }
        const user = users.find((u) => u.usuarioId === (m.usuarioId ?? m.usuario?.usuarioId));
        if (user) return user.name;
        return `User #${m.usuarioId}`;
      })
      .join(", ");
  }

  function getProjectName(task) {
    return (
      task.proyecto?.nombreProyecto ||
      proyectos.find(
        (p) =>
          p.proyectoId === (task.proyectoId || task.proyecto?.proyectoId)
      )?.nombreProyecto ||
      "-"
    );
  }

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

  // FILTRADO POR NOMBRE
  const filteredTasks = search
    ? tasks.filter((t) =>
        t.nombre?.toLowerCase().includes(search.trim().toLowerCase())
      )
    : tasks;

  return (
    <div className="admin-page">
      <Topbar title="Task Management">
        {/* Contenedor para controles y búsqueda */}
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <TopControls
            module="task"
            onCreate={handleCreate}
            onUpdate={selectedTask ? handleUpdate : undefined}
            onDisable={selectedTask ? handleDisable : undefined}
            onAssign={handleAssign}
          />
          {/* Búsqueda a la derecha */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by task name..."
              className="border px-4 py-2 mt-4 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
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
              {filteredTasks.map((task, idx) => (
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
                      onChange={(e) => handleSelect(task.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {task.nombre}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {getProjectName(task)}
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
                    {getAssignedUsers(task)}
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && (
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
      <AssignTaskModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={(userId) => handleAssignTask(userId, selectedTask)}
        users={users}
        task={selectedTask}
      />
    </div>
  );
}

export default TaskManagement;
