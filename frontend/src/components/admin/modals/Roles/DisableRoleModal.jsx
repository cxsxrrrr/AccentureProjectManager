import React, { useState, useEffect } from "react";
import { FiSearch, FiCheck } from "react-icons/fi";
import axios from "axios";

export default function DisableRoleModal({ isOpen, toggle, roles = [], onDisable }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrar solo roles activos y por búsqueda
  const filteredRoles = roles
    .filter((r) => r && r.nombre && r.estado?.toLowerCase() === "activo")
    .filter((r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      (r.descripcion?.toLowerCase() || "").includes(search.toLowerCase())
    );

  const handleDisable = async () => {
    if (!selectedId) return;
    setIsSubmitting(true);

    const selectedRole = roles.find(r => r.id === selectedId);
    if (!selectedRole) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/roles/${selectedRole.id}`,
        {
          nombre: selectedRole.nombre,
          descripcion: selectedRole.descripcion,
          estado: "inactivo"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Llama al callback para actualizar la UI
      onDisable(response.data); 
    } catch (err) {
      console.error("Error disabling role:", err);
      alert("Error disabling role");
    } finally {
      setIsSubmitting(false);
      setSelectedId(null);
      toggle();
    }
  };

  // Limpiar al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative">
        <div className="flex items-start mb-8">
          <h2 className="text-3xl font-bold text-gray-700 flex-1">Disable Role</h2>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-red-500 text-2xl"
            type="button"
          >×</button>
        </div>

        <div className="flex items-center bg-gray-100 rounded mb-7 p-3 text-gray-600 text-base gap-2">
          <span className="text-yellow-400 text-xl">⚠️</span>
          Disabling a role will prevent any user with this role from accessing their permitted features.
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Select Role to Disable</h3>
          <p className="text-gray-500 mb-3">Only active roles are shown below.</p>
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-gray-50 shadow-inner">
            <FiSearch className="text-xl text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search roles by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none bg-transparent text-lg"
            />
          </div>

          <div className="max-h-56 overflow-y-auto flex flex-col gap-2">
            {filteredRoles.length === 0 && (
              <div className="text-gray-400 py-4 text-center">No active roles found.</div>
            )}
            {filteredRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedId(role.id)}
                className={`flex flex-col items-start p-4 rounded-xl border w-full transition text-left shadow-sm ${
                  selectedId === role.id
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center w-full">
                  <span className="font-bold text-lg flex-1">{role.nombre}</span>
                  {selectedId === role.id && <FiCheck className="text-2xl ml-2 font-bold" />}
                </div>
                <span className={`text-xs mt-1 ${selectedId === role.id ? "text-red-100" : "text-gray-500"}`}>
                  {role.descripcion || "No description"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-8">
          <button
            type="button"
            onClick={toggle}
            className="px-8 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium text-lg"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDisable}
            className="px-8 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition text-lg shadow flex items-center gap-2 disabled:opacity-60"
            disabled={!selectedId || isSubmitting}
          >
            <span className="text-xl">🗑️</span> {isSubmitting ? "Disabling..." : "Disable Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
