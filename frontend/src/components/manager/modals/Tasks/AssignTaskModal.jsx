import React, { useState, useEffect } from "react";


// MODAL para asignación masiva
function AssignTaskModal({ isOpen, onClose, onAssign, users = [], tasksToAssign }) {
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold">Assign Tasks</h2>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold text-sm mb-2 block">
              Assign selected tasks to:
              <select
                multiple
                name="assignedTo"
                value={selectedUsers}
                onChange={e =>
                  setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))
                }
                required
                className="mt-1 border rounded w-full px-3 py-2"
                size={Math.min(users.length, 6)}
              >
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <span className="block text-xs text-gray-500 mt-1">Ctrl+Click to select multiple users</span>
            </label>
          </div>
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
              disabled={!selectedUsers.length}
              className={`px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition ${!selectedUsers.length ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Assign
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          Tasks to assign: <span className="font-semibold">{tasksToAssign.map(t => t.task).join(", ")}</span>
        </div>
      </div>
    </div>
  );
}


export default AssignTaskModal;
