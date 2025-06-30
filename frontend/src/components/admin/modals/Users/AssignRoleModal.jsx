
import React, { useState, useMemo, useEffect } from "react";
import api from "../../../../services/axios";

export default function AssignRoleModal({ isOpen, toggle, user, onAssign }) {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  // Estado para roles del backend
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    api.get("/roles")
      .then(res => setRoles(res.data || []))
      .catch(() => setError("Error loading roles"))
      .finally(() => setLoading(false));
  }, [isOpen]);

  // Filtrar roles por búsqueda y solo activos
  const filteredRoles = useMemo(() =>
    (roles || [])
      .filter(role => (role.estado?.toLowerCase?.() !== "inactivo"))
      .filter(role =>
        (role.nombre || "").toLowerCase().includes(search.toLowerCase())
      ),
    [roles, search]
  );

  // Asignar el rol en formato español
  const handleAssign = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onAssign({
        rol: {
          rolId: selectedRole.rolId || selectedRole.id,
          nombre: selectedRole.nombre,
        }
      });
      setSelectedRole(null);
      toggle();
    }
  };

  if (!isOpen) return null;

  // Muestra el rol actual correctamente (si es objeto o string)
  const getCurrentRole = (user) => {
    if (!user) return "";
    if (user.rol && typeof user.rol === "object") return user.rol.nombre;
    if (user.rol) return user.rol;
    if (user.role) return user.role;
    return "";
  };

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
          {loading ? (
            <div className="text-center text-gray-400 py-4">Loading roles...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">Error loading roles</div>
          ) : filteredRoles.length === 0 ? (
            <div className="text-center text-gray-400 py-4">No roles found</div>
          ) : filteredRoles.map(role => (
            <button
              type="button"
              key={role.id || role.rolId || role.nombre}
              onClick={() => setSelectedRole(role)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition
                ${selectedRole?.id === role.id || selectedRole?.rolId === role.rolId
                  ? `bg-purple-50 border-purple-500 ring-2 ring-purple-300`
                  : "bg-white hover:bg-gray-50 border-gray-200"}
              `}
            >
              <span className={`block font-semibold text-base text-purple-700`}>{role.nombre}</span>
              <span className="block text-sm text-gray-500">{role.descripcion || ""}</span>
            </button>
          ))}
        </div>

        {/* Summary */}
        {user && selectedRole && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-sm">
            <div><span className="font-semibold">Summary of the change:</span></div>
            <div>
              {user.nombre} {user.apellido} (<span className="text-gray-500">{user.email}</span>)
            </div>
            <div>
              Current role: <span className="font-bold">{getCurrentRole(user)}</span>
              <span className="mx-2">⟶</span>
              New role: <span className="font-bold text-purple-600">{selectedRole.nombre}</span>
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
