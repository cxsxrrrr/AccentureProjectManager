import React, { useState } from "react";

export default function DisableUserModal({ isOpen, toggle, user, onDisable }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason) {
      onDisable({ ...user, reason });
      toggle();
      setReason("");
    }
  };

  if (!isOpen) return null;

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
          >
            ×
          </button>
        </div>

        {/* User details */}
        <div className="bg-gray-50 rounded-xl p-5 mb-7 flex flex-col gap-2 text-sm">
          <div className="flex">
            <span className="flex-1 text-gray-500">Name:</span>
            <span className="font-medium">{user?.firstName} {user?.lastName}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Email:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Role:</span>
            <span className="font-medium">{user?.role}</span>
          </div>
          <div className="flex">
            <span className="flex-1 text-gray-500">Current Status:</span>
            <span className="font-semibold text-green-600 bg-green-100 px-3 py-0.5 rounded-full text-xs">Active</span>
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
              className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select a reason</option>
              <option>Security Issue</option>
              <option>Voluntary Leave</option>
              <option>Policy Violation</option>
              <option>Other</option>
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
              className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 flex items-center gap-2 transition"
            >
              <span className="text-lg">🗑️</span> Disable Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
