import React, { useState, useEffect } from "react";

// Adaptado para buscar y seleccionar usuario visualmente
function AssignTaskModal({ isOpen, onClose, onAssign, users = [], task }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedUser("");
      setSearch("");
    }
  }, [isOpen, task]);

  if (!isOpen || !task) return null;

  // Filtra los usuarios según lo que escriba el usuario
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      onAssign(selectedUser, task);
      setSelectedUser("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <h2 className="text-3xl font-bold">Assign Task</h2>
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
              Assign selected task to:
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search user by name..."
                className="block mt-1 mb-2 border rounded w-full px-3 py-2"
              />
              <div className="max-h-48 overflow-y-auto border rounded-lg bg-gray-50">
                {filteredUsers.length === 0 && (
                  <div className="p-3 text-gray-400">No users found.</div>
                )}
                {filteredUsers.map(u => (
                  <label
                    key={u.usuarioId}
                    className={`
                      flex items-center gap-2 px-3 py-2 cursor-pointer 
                      transition ${selectedUser === String(u.usuarioId)
                        ? "bg-purple-100 font-semibold"
                        : "hover:bg-purple-50"}
                    `}
                  >
                    <input
                      type="radio"
                      name="assignedUser"
                      value={u.usuarioId}
                      checked={selectedUser === String(u.usuarioId)}
                      onChange={() => setSelectedUser(String(u.usuarioId))}
                      className="accent-purple-600"
                    />
                    
                    {u.name}
                  </label>
                ))}
              </div>
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
              disabled={!selectedUser}
              className={`px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition ${!selectedUser ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Assign
            </button>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          Task to assign: <span className="font-semibold">{task.nombre}</span>
        </div>
      </div>
    </div>
  );
}

export default AssignTaskModal;
