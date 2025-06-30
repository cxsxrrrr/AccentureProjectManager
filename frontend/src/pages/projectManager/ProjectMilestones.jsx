import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewMilestoneModal from "../../components/manager/modals/milestones/NewMilestoneModal";
import UpdateMilestoneModal from "../../components/manager/modals/milestones/UpdateMilestoneModal";
import DisableMilestoneModal from "../../components/manager/modals/milestones/DisableMilestoneModal";
import "../../stylesheets/page.css";

// Datos simulados más completos
const initialMilestones = [
  {
    id: 1,
    nombre: "Completar el backend",
    descripcion: "El backend debe ser completado en 1 mes",
    fechaInicio: "2025-05-01",
    fechaPlaneada: "2025-06-15",
    fechaReal: "2025-07-15",
    estado: "Completada",
    assignedTo: "Carlos",
  },
  {
    id: 2,
    nombre: "Desarrollo frontend",
    descripcion: "Implementar UI con React",
    fechaInicio: "2025-06-01",
    fechaPlaneada: "2025-07-01",
    fechaReal: "",
    estado: "En Progreso",
    assignedTo: "Ana",
  },
  {
    id: 3,
    nombre: "Pruebas y QA",
    descripcion: "Testear toda la app",
    fechaInicio: "2025-07-05",
    fechaPlaneada: "2025-07-20",
    fechaReal: "",
    estado: "Planificada",
    assignedTo: "",
  },
];

function ProjectMilestones() {
  const [milestones, setMilestones] = useState(initialMilestones);
  const [selectedId, setSelectedId] = useState(null);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);

  const selectedMilestone = milestones.find((m) => m.id === selectedId);

  const handleCreate = (newMilestone) => {
    const newItem = { ...newMilestone, id: Date.now() };
    setMilestones([...milestones, newItem]);
    setIsNewModalOpen(false);
  };

  const handleUpdate = (updated) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    setIsEditModalOpen(false);
  };

  const handleDisable = (disabled) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === disabled.id ? disabled : m))
    );
    setIsDisableModalOpen(false);
  };

  // Mapear estado para colores y etiquetas en español
  const estadoEstilos = {
    Completada: "bg-green-100 text-green-700",
    "En Progreso": "bg-blue-100 text-blue-700",
    Planificada: "bg-yellow-100 text-yellow-700",
    Deshabilitada: "bg-red-100 text-red-600",
  };

  return (
    <div className="admin-page">
      <Topbar title="Project Milestones">
        <TopControls
          module="milestone"
          onCreate={() => setIsNewModalOpen(true)}
          onUpdate={selectedMilestone ? () => setIsEditModalOpen(true) : undefined}
          onDisable={selectedMilestone ? () => setIsDisableModalOpen(true) : undefined}
          onAssign={selectedMilestone ? () => {} : undefined}
        />
      </Topbar>

      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/5">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/3">
                  Descripción
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  Fecha Inicio
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  Fecha Planeada
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  Fecha Real
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider w-1/6">
                  Asignado a
                </th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m, idx) => (
                <tr
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`
                    cursor-pointer transition
                    ${
                      selectedId === m.id
                        ? "bg-purple-100 ring-2 ring-purple-200"
                        : idx % 2
                        ? "bg-gray-50"
                        : ""
                    }
                    hover:bg-purple-50
                  `}
                >
                  <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap w-1/5">
                    {m.nombre}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/3 truncate max-w-xs" title={m.descripcion}>
                    {m.descripcion}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    {m.fechaInicio || "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    {m.fechaPlaneada || "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    {m.fechaReal || "-"}
                  </td>
                  <td className="py-4 px-6 w-1/6 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 rounded-full font-bold text-base ${
                        estadoEstilos[m.estado] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {m.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    {m.assignedTo || "-"}
                  </td>
                </tr>
              ))}
              {milestones.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No milestones found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      <NewMilestoneModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSave={handleCreate}
      />

      <UpdateMilestoneModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
        milestone={selectedMilestone}
      />

      <DisableMilestoneModal
        isOpen={isDisableModalOpen}
        onClose={() => setIsDisableModalOpen(false)}
        onConfirm={handleDisable}
        milestone={selectedMilestone}
      />
    </div>
  );
}

export default ProjectMilestones;
