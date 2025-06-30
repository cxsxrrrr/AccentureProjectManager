import React, { useState } from "react";
import api from "../../../../services/axios";

export default function DisableUserModal({ isOpen, toggle, user, onDisable }) {
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason || !user) return;

    setIsLoading(true);
    try {
      console.log('Disabling user:', user);
      console.log('Reason:', reason);

      // Preparar el payload para actualizar el usuario
      const updatePayload = {
        ...user,
        estado: "Inactivo", // Cambiar estado a Inactivo
        motivo: reason      // Agregar el motivo (si tu API lo soporta)
      };

      console.log('Update payload:', updatePayload);

      // Hacer la llamada a la API para actualizar el usuario
      const response = await api.put(`/usuario/${user.id}`, updatePayload);
      
      console.log('API response:', response.data);

      // Llamar al callback del componente padre
      if (onDisable) {
        onDisable();
      }

      // Limpiar el formulario y cerrar modal
      setReason("");
      toggle();

    } catch (error) {
      console.error("Error disabling user:", error);
      console.error("Error response:", error.response?.data);
      
      // Aquí podrías mostrar un mensaje de error al usuario
      // Por ahora solo logeamos el error
      alert(`Error disabling user: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Helper para roles y campos en español -> inglés en UI
  const getUserFullName = (u) =>
    u ? `${u.nombre || u.firstName || ""} ${u.apellido || u.lastName || ""}` : "";

  const getUserRole = (u) => {
    if (!u?.rol) return "No Role";
    return u.rol.nombre || u.rol.name || u.role || "";
  };

  const getUserEmail = (u) =>
    u?.email || "";

  const getUserEstado = (u) => {
    const estado = u?.estado;
    return estado === "Activo"
      ? <span className="font-semibold text-green-600 bg-green-100 px-3 py-0.5 rounded-full text-xs">Active</span>
      : <span className="font-semibold text-red-600 bg-red-100 px-3 py-0.5 rounded-full text-xs">Inactive</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="text-3xl text-red-400">⚠️</span>
          <div>
            <h2 className="text-xl font-bold text-red-500">Disable User</h2>
            <p className="text-sm text-gray-500">This action will deactivate the user account</p>
          </div>
          <button
            onClick={toggle}
            className="ml-auto text-gray-400 hover:text-red-500 text-2xl"
            aria-label="Close modal"
            type="button"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {/* User details */}
        <div className="bg-gray-50 rounded-xl p-5 mb-7 flex flex-col gap-2 text-sm">
          <div className="flex">
            <span className="flex-1 text-gray-500">Name:</span>
            <span className="font-medium">{getUserFullName(user)}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Email:</span>
            <span className="font-medium">{getUserEmail(user)}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Role:</span>
            <span className="font-medium">{getUserRole(user)}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Current Status:</span>
            {getUserEstado(user)}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Reason */}
          <div className="mb-7">
            <label className="block text-sm font-medium mb-1">
              Reason for disabling <span className="text-red-500">*</span>
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              disabled={isLoading}
              className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select a reason</option>
              <option value="Security Issue">Security Issue</option>
              <option value="Voluntary Leave">Voluntary Leave</option>
              <option value="Policy Violation">Policy Violation</option>
              <option value="Performance Issues">Performance Issues</option>
              <option value="Contract Ended">Contract Ended</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Warning box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm mb-8 flex items-start gap-2">
            <span className="mt-1 text-lg">⚠️</span>
            <div>
              <span className="font-semibold">Important:</span>
              <ul className="list-disc ml-5 mt-1">
                <li>The user will lose access to the system immediately</li>
                <li>All active sessions will be terminated</li>
                <li>The user can be reactivated later if needed</li>
                <li>User data will be preserved</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={toggle}
              disabled={isLoading}
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !reason}
              className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span className="text-lg">🗑️</span> Disable User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}