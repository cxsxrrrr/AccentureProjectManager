import React, { useState } from "react";

const DisableCategoryModal = ({ isOpen, categories, onClose, onDisable }) => {
  const [selectedId, setSelectedId] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold mb-2">Disable Category</h2>
        <p className="mb-4 text-sm text-gray-500">Select Category to Disable</p>
        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`p-3 rounded border cursor-pointer flex items-center
                ${selectedId === cat.id ? "bg-red-200 border-red-400" : "hover:bg-gray-50"}`}
              onClick={() => setSelectedId(cat.id)}
            >
              <span className="font-semibold">{cat.name}</span>
              <span className="ml-2 text-xs text-gray-500">{cat.description}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-100" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            disabled={!selectedId}
            onClick={() => {
              if (selectedId) onDisable(selectedId);
            }}
          >
            Disable Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisableCategoryModal;
