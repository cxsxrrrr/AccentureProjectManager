import React, { useState } from "react";

const AssignResourceModal = ({
  isOpen,
  onClose,
  onAssign,
  projects = [],
  resources = [],
}) => {
  const [resourceName, setResourceName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Reinicia estado cuando se abre/cierra
  React.useEffect(() => {
    if (!isOpen) {
      setResourceName("");
      setSelectedProjectId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold mb-6">Assign Resource</h2>

        <label className="block mb-3 font-semibold text-lg">
          Resource Name *
          <input
            type="text"
            className="block mt-1 w-full border rounded-lg px-4 py-2 focus:outline-purple-500"
            placeholder="Enter Resource name"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
          />
        </label>

        <div className="mb-2 font-semibold text-lg">Select Project *</div>
        <div className="mb-3">
          <input
            className="w-full border rounded-lg px-4 py-2 mb-2"
            placeholder="Search project..."
            // Bonus: Agrega lógica de búsqueda si tienes muchos proyectos
            disabled
          />
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto mb-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={`px-4 py-3 rounded border cursor-pointer text-base font-bold flex items-center ${
                selectedProjectId === proj.id
                  ? "bg-purple-100 border-purple-400"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedProjectId(proj.id)}
            >
              {proj.name}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-100" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 text-white"
            disabled={!resourceName || !selectedProjectId}
            onClick={() => {
              onAssign({
                resourceName,
                projectId: selectedProjectId,
              });
            }}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignResourceModal;
