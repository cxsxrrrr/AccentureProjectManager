import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewMilestoneModal from "../../components/manager/modals/milestones/NewMilestoneModal";
import UpdateMilestoneModal from "../../components/manager/modals/milestones/UpdateMilestoneModal";
import DisableMilestoneModal from "../../components/manager/modals/milestones/DisableMilestoneModal";
import Toast from "../../components/common/Toast";
import api from "../../services/axios";
import "../../stylesheets/page.css";

function ProjectMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [toast, setToast] = useState("");

  const selectedMilestone = milestones.find((m) => m.hitoId === selectedId) || {};

  // Trae hitos y proyectos juntos para recargar la lista correctamente
  const fetchMilestonesAndProjects = async () => {
    try {
      const [hitosRes, projectsRes] = await Promise.all([
        api.get("/hitos"),
        api.get("/proyectos")
      ]);
      setMilestones(hitosRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error("Error fetching milestones or projects:", error);
    }
  };

  useEffect(() => {
    fetchMilestonesAndProjects();
  }, []);

  // Forzar recarga real de la lista tras crear un milestone
  const handleCreate = async (newMilestone) => {
    // Optimistic UI: add fake milestone instantly
    const tempId = `temp-${Date.now()}`;
    const fakeMilestone = {
      ...newMilestone,
      hitoId: tempId,
      estado: "Guardando...",
      fechaReal: newMilestone.fechaInicio,
      proyecto: projects.find(p => p.proyectoId === newMilestone.proyectoId) || {},
    };
    setMilestones((prev) => [fakeMilestone, ...prev]);
    setIsNewModalOpen(false);
    setTimeout(() => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.hitoId === tempId ? { ...m, estado: "Creado (sincronizando...)" } : m
        )
      );
    }, 500);
    try {
      const res = await api.post("/hitos", newMilestone);
      // Replace fake with real
      setMilestones((prev) => [res.data, ...prev.filter((m) => m.hitoId !== tempId)]);
      await fetchMilestonesAndProjects();
      setToast("Milestone creado exitosamente");
    } catch (error) {
      // Remove fake if error
      setMilestones((prev) => prev.filter((m) => m.hitoId !== tempId));
      console.error("Error creating milestone:", error);
    }
  };

  const handleUpdate = async (updatedMilestone) => {
    // Optimistic UI update
    setMilestones((prev) =>
      prev.map((m) =>
        m.hitoId === updatedMilestone.hitoId
          ? { ...m, ...updatedMilestone, estado: "Actualizando..." }
          : m
      )
    );
    setIsEditModalOpen(false);
    setTimeout(() => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.hitoId === updatedMilestone.hitoId ? { ...m, estado: "Actualizado (sincronizando...)" } : m
        )
      );
    }, 500);
    try {
      await api.patch(`/hitos/${updatedMilestone.hitoId}`, {
        ...updatedMilestone,
        proyecto: updatedMilestone.proyectoId
          ? { proyectoId: updatedMilestone.proyectoId }
          : null,
      });
      await fetchMilestonesAndProjects();
      setToast("Milestone actualizado exitosamente");
    } catch (error) {
      console.error("Error updating milestone:", error);
      // Optionally: revert optimistic update here if needed
    }
  };

  const handleDisable = async (disabledMilestone) => {
    // Optimistic UI update
    setMilestones((prev) =>
      prev.map((m) =>
        m.hitoId === disabledMilestone.hitoId
          ? { ...m, estado: "Desactivando..." }
          : m
      )
    );
    setIsDisableModalOpen(false);
    setTimeout(() => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.hitoId === disabledMilestone.hitoId ? { ...m, estado: "Desactivado (sincronizando...)" } : m
        )
      );
    }, 500);
    try {
      await api.patch(`/hitos/${disabledMilestone.hitoId}`, {
        estado: "Desactivado",
      });
      await fetchMilestonesAndProjects();
      setToast("Milestone desactivado exitosamente");
    } catch (error) {
      console.error("Error disabling milestone:", error);
      // Optionally: revert optimistic update here if needed
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
                    {m.fechaReal || "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-700 w-1/6 whitespace-nowrap">
                    <label className="block text-gray-700 font-medium">Fecha Planeada</label>
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
        setToast={setToast}
      />

      <UpdateMilestoneModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
        milestone={selectedMilestone}
        setToast={setToast}
      />

      <DisableMilestoneModal
        isOpen={isDisableModalOpen}
        onClose={() => setIsDisableModalOpen(false)}
        onConfirm={handleDisable}
        milestone={selectedMilestone}
        setToast={setToast}
      />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}

export default ProjectMilestones;