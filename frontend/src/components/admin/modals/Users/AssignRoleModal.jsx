import React, { useState, useMemo, useEffect } from "react";
import api from "../../../../services/axios";

export default function AssignRoleModal({ isOpen, toggle, user, onAssign }) {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      setSelectedRole(null); // Reset selected role
      
      api.get("/roles")
        .then(res => {
          console.log('Roles loaded:', res.data); // Debug
          setRoles(res.data);
        })
        .catch(err => {
          console.error('Error loading roles:', err); // Debug
          setError("Error loading roles: " + (err.response?.data?.message || err.message));
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  // Filtrar roles por búsqueda
  const filteredRoles = useMemo(() =>
    roles.filter(role =>
      (role.nombre || role.name || "").toLowerCase().includes(search.toLowerCase())
    ), [search, roles]
  );

  // Asignar el rol
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    try {
      console.log('Assigning role to user:', user); // Debug
      console.log('Selected role:', selectedRole); // Debug
      
      // Verificar que el rol seleccionado es diferente al actual
      const currentRoleId = user.rol?.rolId || user.rol?.id;
      const selectedRoleId = selectedRole.rolId || selectedRole.id;
      
      if (currentRoleId === selectedRoleId) {
        setError("User already has this role assigned");
        return;
      }

      // Construir el payload según lo que espera tu API
      const rolePayload = {
        rol: {
          rolId: selectedRole.rolId || selectedRole.id,
          nombre: selectedRole.nombre || selectedRole.name,
        }
      };

      console.log('Role payload:', rolePayload); // Debug
      
      // Llamar a la función onAssign del componente padre
      await onAssign(rolePayload);
      
      // Limpiar estado y cerrar modal
      setSelectedRole(null);
      setSearch("");
      setError(null);
      
    } catch (error) {
      console.error('Error in handleAssign:', error);
      setError("Error assigning role: " + (error.message || "Unknown error"));
    }
  };

  // Reset cuando se cierra el modal
  const handleClose = () => {
    setSelectedRole(null);
    setSearch("");
    setError(null);
    toggle();
  };

  if (!isOpen) return null;

  // Muestra el rol actual correctamente
  const getCurrentRole = (user) => {
    if (!user) return "";
    if (user.rol && typeof user.rol === "object") return user.rol.nombre || user.rol.name;
    if (user.rol) return user.rol;
    if (user.role) return user.role;
    return "No role assigned";
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
            onClick={handleClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

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
            <div className="text-center text-gray-400">Loading roles...</div>
          ) : error && !roles.length ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredRoles.length === 0 ? (
            <div className="text-center text-gray-400">
              {roles.length === 0 ? "No roles available" : "No roles found"}
            </div>
          ) : (
            filteredRoles.map(role => {
              const roleId = role.rolId || role.id;
              const roleName = role.nombre || role.name;
              const currentUserRoleId = user?.rol?.rolId || user?.rol?.id;
              const isCurrentRole = currentUserRoleId === roleId;
              
              return (
                <button
                  type="button"
                  key={roleId}
                  onClick={() => setSelectedRole(role)}
                  disabled={isCurrentRole}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition
                    ${isCurrentRole 
                      ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                      : selectedRole?.rolId === roleId || selectedRole?.id === roleId
                        ? "bg-purple-50 border-purple-500 ring-2 ring-purple-300"
                        : "bg-white hover:bg-gray-50 border-gray-200"}
                  `}
                >
                  <span className={`block font-semibold text-base ${isCurrentRole ? 'text-gray-500' : 'text-purple-700'}`}>
                    {roleName} {isCurrentRole && "(Current)"}
                  </span>
                  {role.descripcion && (
                    <span className="block text-sm text-gray-500">{role.descripcion}</span>
                  )}
                </button>
              );
            })
          )}
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
              New role: <span className="font-bold text-purple-600">{selectedRole.nombre || selectedRole.name}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:from-purple-600 hover:to-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedRole || loading}
            onClick={handleAssign}
          >
            {loading ? "Assigning..." : "Assign Role"}
          </button>
        </div>
      </div>
    </div>
  );
}