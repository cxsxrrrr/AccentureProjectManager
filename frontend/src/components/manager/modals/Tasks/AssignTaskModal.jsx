import React, { useState, useEffect } from "react";
import assignTaskIcon from "../../../../assets/icons/assign_task.svg"; // Cambia el path si es necesario

function AssignTaskModal({ isOpen, onClose, onAssign, users = [], task }) {
  const [selectedUser, setSelectedUser] = useState("");

  // Si abres el modal, resetea selección
  useEffect(() => {
    if (isOpen) setSelectedUser("");
  }, [isOpen, task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      onAssign(selectedUser);
      setSelectedUser("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-purple-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={assignTaskIcon} alt="" className="w-8 h-8" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Assign Task</h2>
            <p className="text-sm text-gray-500">
              Select a user to assign the task: <span className="font-semibold">{task.task}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        {/* User select */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2 mb-3">
              <span className="text-xl bg-purple-100 p-1 rounded">
                <img src={assignTaskIcon} alt="" className="w-6 h-6" />
              </span>
              User Selection
            </h3>
            <label className="font-semibold text-sm">
              Assigned To *
              <select
                name="assignedTo"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
                required
                className="mt-1 border rounded w-full px-3 py-2"
              >
                <option value="">Select user</option>
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </label>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedUser}
              className={`px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition ${!selectedUser ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignTaskModal;
