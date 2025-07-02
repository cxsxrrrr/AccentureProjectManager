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

  // Reinicia selección al abrir la modal
  React.useEffect(() => {
    if (isOpen) setSelectedId(null);
  }, [isOpen]);

  if (!isOpen) return null;

  // Normaliza recursos a la estructura estándar y filtra los que tengan nombre válido y estén activos
  const normalizedResources = resources
    .filter(r => {
      // Solo recursos activos y con nombre válido
      const estado = r.estado || r.availability || r.disponibilidad;
      const nombre = r.nombreRecurso || r.name;
      return (estado === "Disponible" || estado === "Available") && nombre && nombre.trim() !== "";
    })
    .map((r) => ({
      id: r.id || r.recursoId,
      name: r.name || r.nombreRecurso,
      type: r.type || r.tipo,
      availability: r.availability || r.disponibilidad || r.estado,
      cost: r.cost || r.coste,
      unit_measure: r.unit_measure || r.unit || r.cantidad,
      description: r.description || r.descripcionRecurso,
      raw: r
    }));

  // Filtrar recursos por nombre o descripción (case-insensitive)
  const filteredResources = normalizedResources.filter((r) =>
    (r.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
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
              key={resource.id}
              className={`flex items-center justify-between p-3 rounded border cursor-pointer font-semibold
                ${selectedId === resource.id
                  ? "bg-red-600 text-white border-red-400"
                  : "hover:bg-gray-100 bg-white border-gray-200 text-black"
                }`}
              onClick={() => setSelectedId(resource.id)}
            >
              <span>{resource.name}</span>
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
