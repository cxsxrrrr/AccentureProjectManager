import React from "react";

function DisableMilestoneModal({ isOpen, onClose, onDisable, milestone }) {
  if (!isOpen || !milestone) return null;

  const handleDisable = () => {
    onDisable(milestone.id);
    onClose();
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
