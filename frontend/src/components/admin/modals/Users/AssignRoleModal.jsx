import React, { useState, useMemo } from "react";

const ROLES = [
  { name: "Admin", desc: "Full access to the system", color: "text-purple-600", border: "border-purple-400", shadow: "shadow-purple-200" },
  { name: "Manager", desc: "Team and project management", color: "text-purple-500", border: "border-purple-400", bg: "bg-purple-50" },
  { name: "Team Member", desc: "Development and maintenance", color: "text-green-600", border: "border-green-400", bg: "bg-green-50" },
  { name: "Customer", desc: "Limited client access", color: "text-red-500", border: "border-red-400", bg: "bg-red-50" },
];

export default function AssignRoleModal({ isOpen, toggle, user, onAssign }) {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  // Filtrar roles por búsqueda
  const filteredRoles = useMemo(() =>
    ROLES.filter(role =>
      role.name.toLowerCase().includes(search.toLowerCase())
    ), [search]
  );

  const handleAssign = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onAssign(selectedRole);
      setSelectedRole(null);
      toggle();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="text-3xl text-purple-500">🛡️</span>
          <div>
            <h2 className="text-xl font-bold text-gray-700">Assign Role</h2>
            <p className="text-sm text-gray-400">Select a user and assign a new role</p>
          </div>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          className="w-full mb-6 px-4 py-2 rounded border focus:ring-2 focus:ring-purple-300 text-sm"
          placeholder="🔍  Search Role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Roles List */}
        <div className="mb-6 space-y-3 max-h-60 overflow-y-auto">
          {filteredRoles.map(role => (
            <button
              type="button"
              key={role.name}
              onClick={() => setSelectedRole(role)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition
                ${selectedRole?.name === role.name
                  ? `bg-purple-50 border-purple-500 ring-2 ring-purple-300`
                  : "bg-white hover:bg-gray-50 border-gray-200"}
              `}
            >
              <span className={`block font-semibold text-base ${role.color}`}>{role.name}</span>
              <span className="block text-sm text-gray-500">{role.desc}</span>
            </button>
          ))}
        </div>

        {/* Summary */}
        {user && selectedRole && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-sm">
            <div><span className="font-semibold">Summary of the change:</span></div>
            <div>
              {user.firstName} {user.lastName} (<span className="text-gray-500">{user.email}</span>)
            </div>
            <div>
              Current role: <span className="font-bold">{user.role}</span>
              <span className="mx-2">⟶</span>
              New role: <span className="font-bold text-purple-600">{selectedRole.name}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={toggle}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition"
            disabled={!selectedRole}
            onClick={handleAssign}
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
}
