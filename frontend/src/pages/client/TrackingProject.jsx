import React from "react";
import Topbar from "../../components/common/Topbar";

function TrackingProject({ project, onBack }) {
  if (!project || !Array.isArray(project.milestones) || !Array.isArray(project.tareas)) {
    return (
      <div className="admin-page">
        <Topbar title="Tracking Project" showSearch={false} />
        <div className="admin-content text-center py-12">
          <div className="text-gray-400">No hay información del proyecto disponible</div>
          <button
            onClick={onBack}
            className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const milestones = project.milestones || [];
  const tareas = project.tareas || [];

  const completedMilestones = Array.isArray(milestones)
    ? milestones.filter(m => m.estado === "Completado").length
    : 0;

  const totalMilestones = Array.isArray(milestones) ? milestones.length : 0;

  const percentProgress = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="admin-page">
      <Topbar title={`Tracking: ${project.nombreProyecto}`} showSearch={false} />
      <div className="admin-content" style={{ maxWidth: "1200px", margin: "0 auto", display: "block" }}>
        {/* Botón volver + info */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4"
          >
            ← Volver al Dashboard
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{project.nombreProyecto}</h3>
                <p className="text-gray-600 text-sm">{project.descripcionProyecto}</p>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Manager:</span>
                  <span className="text-gray-600 ml-2">{project.gerenteProyecto?.nombre}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Recursos:</span>
                  <span className="text-gray-600 ml-2">{project.recursos} personas</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${project.estado === "Completado" ? "bg-green-100 text-green-800" :
                      project.estado === "En Progreso" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                    }`}>
                    {project.estado}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Inicio:</span>
                  <span className="text-gray-600 ml-2">{formatDate(project.fechaInicio)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Fin estimado:</span>
                  <span className="text-gray-600 ml-2">{formatDate(project.fechaFin)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Tareas:</span>
                  <span className="text-gray-600 ml-2">{project.tareasCompletadas}/{project.tareasTotales}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tareas */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Tareas del Proyecto</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Nombre</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Estado</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Prioridad</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Inicio</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Fin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tareas.map(t => (
                  <tr key={t.tareasId}>
                    <td className="px-4 py-2 text-gray-800">{t.nombre}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.estado === "Completado" ? "bg-green-100 text-green-700" :
                          t.estado === "En Progreso" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-gray-700"
                        }`}>
                        {t.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2">{t.prioridad}</td>
                    <td className="px-4 py-2">{formatDate(t.fechaInicioEstimada)}</td>
                    <td className="px-4 py-2">{formatDate(t.fechaFinEstimada)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Progreso global */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-700">Avance global del proyecto</h2>
          <div className="w-full bg-gray-200 rounded-full h-5">
            <div
              className="bg-purple-600 h-5 rounded-full transition-all duration-700"
              style={{ width: `${percentProgress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1 text-gray-700">
            {percentProgress}% completado ({milestones.filter(m => m.estado === "Completado").length} de {milestones.length} hitos)
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingProject;
