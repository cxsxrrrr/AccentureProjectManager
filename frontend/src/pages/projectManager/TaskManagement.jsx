import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewTaskModal from "../../components/manager/modals/Tasks/NewTaskModal";
import UpdateTaskModal from "../../components/manager/modals/Tasks/UpdateTaskModal";
import "../../stylesheets/page.css";
import DisableTaskModal from "../../components/manager/modals/Tasks/DisableTaskModal";

// Mock de usuarios (para el dropdown)
const users = [
  { id: 1, name: "Jane Smith" },
  { id: 2, name: "John Doe" },
  { id: 3, name: "Carlos Reyes" },
];

// Mock de tareas
const initialTasks = [
  { id: 1, task: "Design UI", assignedTo: "Jane Smith", status: "In Progress" },
  { id: 2, task: "Backend API", assignedTo: "John Doe", status: "To Do" },
  {
    id: 3,
    task: "Documentation",
    assignedTo: "Carlos Reyes",
    status: "Completed",
  },
];

function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(null);

  // Estado para modales
  const [showNew, setShowNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDisable, setShowDisable] = useState(false);

  // Tarea seleccionada
  const selectedTask = tasks.find((t) => t.id === selectedId);

  // Handlers
  const handleCreate = () => setShowNew(true);
  const handleUpdate = () => selectedTask && setShowUpdate(true);
  const handleDisable = () => selectedTask && setShowDisable(true);

  // Guardar nueva tarea
  const handleSaveNew = (data) => {
    setTasks([
      ...tasks,
      { ...data, id: Date.now() }, // id temporal
    ]);
    setShowNew(false);
  };

  // Guardar actualización
  const handleSaveUpdate = (updated) => {
    setTasks(
      tasks.map((t) => (t.id === selectedTask.id ? { ...t, ...updated } : t))
    );
    setShowUpdate(false);
  };

  const handleSaveDisable = (taskToDisable) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskToDisable.id ? { ...t, status: "Disabled" } : t
      )
    );
    setShowDisable(false);
  };

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
                            : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-gray-700 w-2/5">
                    {task.assignedTo}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-400">
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
        users={users}
      />
      <UpdateTaskModal
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        onSave={handleSaveUpdate}
        initialData={selectedTask}
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
