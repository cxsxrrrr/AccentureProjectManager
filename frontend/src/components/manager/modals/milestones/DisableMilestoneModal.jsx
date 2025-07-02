import React, { useEffect } from "react";

function DisableMilestoneModal({ isOpen, onClose, onDisable, milestone }) {
  useEffect(() => {
    if (isOpen && !milestone) {
      console.error("Milestone data is missing or invalid.");
    }
  }, [isOpen, milestone]);

  if (!isOpen || !milestone) return null;

  const handleDisable = async () => {
    try {
      if (!milestone || !milestone.hitoId) {
        console.error("Milestone or hitoId is missing.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }

      console.log("Disabling milestone with ID:", milestone.hitoId);
      const baseURL = window.REACT_APP_BASE_URL || "http://localhost:8080";
      console.log("Base URL:", baseURL);
      console.log("Request body:", JSON.stringify({ estado: "Completada" }));

      const response = await fetch(`${baseURL}/api/hitos/${milestone.hitoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          estado: "Desactivado", 
        }),
      });

      console.log("Response status:", response.status);
      if (response.ok) {
        console.log("Milestone disabled successfully.");
        if (typeof onDisable === "function") {
          onDisable(milestone.hitoId);
        } else {
          console.warn("onDisable is not a function or is undefined.");
        }
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Failed to disable milestone:", response.statusText, errorText);
      }
    } catch (error) {
      console.error("Error disabling milestone:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Disable Milestone</h2>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to disable <strong>{milestone.nombre}</strong>?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDisable}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisableMilestoneModal;