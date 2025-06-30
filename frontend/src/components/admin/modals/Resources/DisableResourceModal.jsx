import React, { useState } from "react";
import { FaCheck } from "react-icons/fa"; // para el check del seleccionado (instala react-icons si no tienes)

const DisableResourceModal = ({
  isOpen,
  resources,
  onClose,
  onDisable,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  // Filtrar recursos por nombre o descripción (case-insensitive)
  const filteredResources = resources.filter((r) =>
    r.nombreRecurso.toLowerCase().includes(search.toLowerCase()) ||
    (r.descripcionRecurso && r.descripcionRecurso.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-[520px] max-w-[95vw] shadow-2xl">
        {/* Título */}
        <h2 className="text-3xl font-bold mb-2">Delete Resource</h2>
        {/* Advertencia */}
        <div className="bg-gray-100 border-l-4 border-yellow-400 px-4 py-3 mb-6 rounded text-gray-700 flex items-center text-sm">
          <span className="material-icons text-yellow-400 mr-2">⚠️</span>
          Deleting a Resource will remove it permanently from the system.
        </div>
        {/* Instrucción */}
        <div className="font-bold text-xl mb-2 mt-2">Select a Resource to Disable</div>
        <div className="text-gray-500 text-sm mb-4">
          Only active resource are shown below.
        </div>
        {/* Search input */}
        <input
          type="text"
          className="w-full mb-4 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-400 text-base"
          placeholder="Search Resource by name or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {/* Lista de recursos */}
        <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.recursoId}
              className={`flex items-center justify-between p-3 rounded border cursor-pointer font-semibold
                ${selectedId === resource.recursoId
                  ? "bg-red-600 text-white border-red-400"
                  : "hover:bg-gray-100 bg-white border-gray-200 text-black"
                }`}
              onClick={() => setSelectedId(resource.recursoId)}
            >
              <span>{resource.nombreRecurso}</span>
              {selectedId === resource.id && (
                <FaCheck className="text-2xl text-white ml-2" />
              )}
            </div>
          ))}
        </div>
        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold shadow"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow flex items-center gap-2 disabled:opacity-50"
            disabled={!selectedId}
            onClick={() => selectedId && onDisable(selectedId)}
          >
            Disable Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisableResourceModal;
