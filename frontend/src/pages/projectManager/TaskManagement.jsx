import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewTaskModal from "../../components/manager/modals/Tasks/NewTaskModal";
import UpdateTaskModal from "../../components/manager/modals/Tasks/UpdateTaskModal";
import DisableTaskModal from "../../components/manager/modals/Tasks/DisableTaskModal";
import "../../stylesheets/page.css";

// Mock de usuarios (para el dropdown)
const users = [
  { id: 1, name: "Jane Smith" },
  { id: 2, name: "John Doe" },
  { id: 3, name: "Carlos Reyes" },
];

// Mock de tareas
const initialTasks = [
  { id: 1, task: "Design UI", assignedTo: "", status: "To Do" },
  { id: 2, task: "Backend API", assignedTo: "", status: "To Do" },
  { id: 3, task: "Documentation", assignedTo: "", status: "To Do" },
];

function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Estado para modales
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  // Tarea seleccionada individual
  const selectedTask = tasks.find((t) => t.id === selectedId);

  // Handlers para checkboxes
  const handleSelect = (id, checked) => {
    setSelectedTasks((prev) =>
      checked ? [...prev, id] : prev.filter((tid) => tid !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedTasks(checked ? tasks.map((t) => t.id) : []);
  };

  // Handlers de modales
  const handleCreate = () => setShowNew(true);
  const handleUpdate = () => selectedTask && setShowUpdate(true);
  const handleDisable = () => selectedTask && setShowDisable(true);
  const handleAssign = () => {
    if (selectedTasks.length > 0) setShowAssign(true);
  };

  // Guardar nueva tarea
  const handleSaveNew = (data) => {
    setTasks([...tasks, { ...data, id: Date.now(), assignedTo: "" }]);
    setShowNew(false);
  };

  // Guardar actualización
  const handleSaveUpdate = (updated) => {
    setTasks(
      tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...updated } : t))
    );
    setShowUpdate(false);
  };

  // Guardar deshabilitado
  const handleSaveDisable = (taskToDisable) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskToDisable.id ? { ...t, status: "Disabled" } : t
      )
    );
    setShowDisable(false);
  };

  // Asignar a múltiples tareas seleccionadas
  const handleAssignTask = (userNames) => {
    setTasks((prev) =>
      prev.map((t) =>
        selectedTasks.includes(t.id)
          ? { ...t, assignedTo: userNames.join(", ") }
          : t
      )
    );
    setShowAssign(false);
    setSelectedTasks([]);
  };

  return (
    <div className="admin-page">
      <Topbar title="Task Management">
        <TopControls
          module="task"
          onCreate={handleCreate}
          onUpdate={selectedTask ? handleUpdate : undefined}
          onDisable={selectedTask ? handleDisable : undefined}
          // Botón "Assign Task" sólo habilitado si hay selección múltiple
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
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/3">
                  TASK
                </th>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/4">
                  STATUS
                </th>
                <th className="px-8 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-2/5">
                  ASSIGNED TO
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
                  <td
                    className="px-4 py-5 w-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={(e) => handleSelect(task.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-5 px-8 font-semibold text-gray-800 whitespace-nowrap w-1/3">
                    {task.task}
                  </td>
                  <td className="py-5 px-8 w-1/4">
                    <span
                      className={`
                        px-4 py-1 rounded-full font-bold text-base
                        ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : task.status === "To Do"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.status === "Disabled"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-gray-700 w-2/5">
                    {task.assignedTo || "-"}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
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
        tasksToAssign={tasks.filter((t) => selectedTasks.includes(t.id))}
      />
    </div>
  );
}

// MODAL para asignación masiva
function AssignTaskModal({
  isOpen,
  onClose,
  onAssign,
  users = [],
  tasksToAssign,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  React.useEffect(() => {
    if (isOpen) setSelectedUsers([]);
  }, [isOpen, tasksToAssign]);

  if (!isOpen || !tasksToAssign || tasksToAssign.length === 0) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length) {
      onAssign(selectedUsers);
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
            <p>
              X
              </p>
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
                  key={t.id}
                  className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-semibold gap-1 border border-purple-200"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="8" />
                  </svg>
                  {t.task}
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
                  key={u.id}
                  className={`flex items-center gap-2 cursor-pointer transition
                rounded-lg px-3 py-2 border
                ${
                  selectedUsers.includes(u.name)
                    ? "bg-purple-50 border-purple-400 text-purple-700 font-bold"
                    : "bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50/50"
                }
              `}
                >
                  <input
                    type="checkbox"
                    className="accent-purple-600 w-4 h-4"
                    checked={selectedUsers.includes(u.name)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedUsers((s) =>
                        checked
                          ? [...s, u.name]
                          : s.filter((name) => name !== u.name)
                      );
                    }}
                  />
                  <span>   {u.name}</span>
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
