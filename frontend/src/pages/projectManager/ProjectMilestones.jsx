import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewMilestoneModal from "../../components/manager/modals/milestones/NewMilestoneModal";
import UpdateMilestoneModal from "../../components/manager/modals/milestones/UpdateMilestoneModal";
import DisableMilestoneModal from "../../components/manager/modals/milestones/DisableMilestoneModal";
import "../../stylesheets/page.css";

function ProjectMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);

  const selectedMilestone = milestones.find((m) => m.hitoId === selectedId) || {};

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/hitos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMilestones(data);
        } else {
          console.error("Failed to fetch milestones. Status:", response.status, "Message:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  const handleCreate = async (newMilestone) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/hitos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMilestone),
      });

      if (response.ok) {
        const createdMilestone = await response.json();
        setMilestones((prev) => [...prev, createdMilestone]);
        setIsNewModalOpen(false);
      } else {
        console.error("Failed to create milestone:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating milestone:", error);
    }
  };

  const handleUpdate = async (updatedMilestone) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/hitos/${updatedMilestone.hitoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...updatedMilestone,
          proyecto: updatedMilestone.proyectoId
            ? { proyectoId: updatedMilestone.proyectoId }
            : null,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setMilestones((prev) =>
          prev.map((m) => (m.hitoId === updatedData.hitoId ? updatedData : m))
        );
        setIsEditModalOpen(false);
      } else {
        console.error("Failed to update milestone:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
  };

  const handleDisable = async (disabledMilestone) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/hitos/${disabledMilestone.hitoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          estado: "Desactivado",
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setMilestones((prev) =>
          prev.map((m) => (m.hitoId === updatedData.hitoId ? updatedData : m))
        );
        setIsDisableModalOpen(false);
      } else {
        console.error("Failed to disable milestone:", response.statusText);
      }
    } catch (error) {
      console.error("Error disabling milestone:", error);
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedId(projectId);
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
          onUpdate={selectedId ? () => setIsEditModalOpen(true) : undefined}
          onDisable={selectedId ? () => setIsDisableModalOpen(true) : undefined}
          onAssign={selectedId ? () => {} : undefined}
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
                  key={m.hitoId}
                  onClick={() => handleProjectClick(m.hitoId)}
                  className={`
                    cursor-pointer transition
                    ${
                      selectedId === m.hitoId
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
                    <label className="block text-gray-700 font-medium">Fecha Inicio</label>
                    {m.fechaInicio || "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    <label className="block text-gray-700 font-medium">Fecha Planeada</label>
                    {m.fechaPlaneada || "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    {m.fechaPlaneada || "-"}
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
                    {m.proyecto?.nombreProyecto || "-"}
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
        onCreate={handleCreate}
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
