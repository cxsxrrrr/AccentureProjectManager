import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function TrackingProject({ project, onBack }) {
  if (!project) {
    return (
      <div className="admin-page">
        <Topbar title="Tracking Project" showSearch={false} />
        <div className="admin-content text-center py-12">
          <div className="text-gray-400">No hay proyecto seleccionado</div>
        </div>
      </div>
    );
  }

  const { milestones, phases } = project;
  
  const percentProgress = Math.round(
    (milestones.filter(m => m.estado === "Completado").length / milestones.length) * 100
  );

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
      <Topbar title={`Tracking: ${project.nombre}`} showSearch={false} />
      <div
        className="admin-content"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "block"
        }}
      >
        {/* Botón de regreso y información del proyecto */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-4"
          >
            ← Volver al Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{project.nombre}</h3>
                <p className="text-gray-600 text-sm">{project.descripcion}</p>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Manager:</span>
                  <span className="text-gray-600 ml-2">{project.manager}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Recursos:</span>
                  <span className="text-gray-600 ml-2">{project.recursos} personas</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Estado:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    project.estado === "Completado" ? "bg-green-100 text-green-800" :
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
                  <span className="text-gray-600 ml-2">{formatDate(project.fechaInicioEstimada)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Fin estimado:</span>
                  <span className="text-gray-600 ml-2">{formatDate(project.fechaFinEstimada)}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Tareas:</span>
                  <span className="text-gray-600 ml-2">{project.tareasCompletadas}/{project.tareasTotales}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline de Hitos */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          style={{ display: "block", width: "100%" }}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-8">Timeline de Hitos</h2>
          <div className="overflow-x-auto pb-4" style={{ width: "100%" }}>
            <div style={{ display: "flex", gap: "48px", minWidth: "max-content" }}>
              {milestones.map((m, idx) => (
                <div
                  key={m.id}
                  style={{
                    width: "120px",
                    minWidth: "120px",
                    display: "block",
                    position: "relative"
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Conector */}
                  {idx > 0 && (
                    <div
                      className={`absolute h-1 bg-gray-300 ${
                        milestones[idx - 1].estado === "Completado" && m.estado === "Completado" 
                          ? "bg-green-400" 
                          : milestones[idx - 1].estado === "Completado" 
                          ? "bg-yellow-400" 
                          : "bg-gray-300"
                      }`}
                      style={{
                        width: "48px",
                        left: "-48px",
                        top: "16px",
                        zIndex: 0
                      }}
                    />
                  )}

                  <div
                    className={`
                      w-8 h-8 flex items-center justify-center mb-2 rounded-full border-4 relative z-10
                      ${
                        m.estado === "Completado"
                          ? "bg-green-400 border-green-600 text-white"
                          : m.estado === "En progreso"
                          ? "bg-yellow-200 border-yellow-400 text-yellow-700"
                          : "bg-gray-200 border-gray-300 text-gray-400"
                      }
                    `}
                  >
                    {m.estado === "Completado" ? "✔" : m.estado === "En progreso" ? "⏳" : "●"}
                  </div>
                  <div className="text-sm font-medium text-gray-800">{m.nombre}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Planeado: {formatDate(m.fecha_planeada)}
                  </div>
                  {m.fecha_real && (
                    <div className="text-xs text-gray-400">
                      Real: {formatDate(m.fecha_real)}
                    </div>
                  )}
                  <span
                    className={`
                      mt-2 px-3 py-0.5 rounded-full font-bold text-xs
                      ${
                        m.estado === "Completado"
                          ? "bg-green-100 text-green-700"
                          : m.estado === "En progreso"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {m.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avance por Etapa */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          style={{ display: "block", width: "100%" }}
        >
          <h2 className="text-xl font-bold mb-8 text-gray-700">Avance por Etapa</h2>
          <div style={{ width: "100%" }}>
            {phases.map(phase => (
              <div key={phase.nombre} style={{ width: "100%", marginBottom: 24 }}>
                <div className="mb-1 flex justify-between">
                  <span className="font-semibold">{phase.nombre}</span>
                  <span className="text-sm text-gray-600">{phase.porcentaje}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      phase.porcentaje === 100
                        ? "bg-green-600"
                        : phase.porcentaje > 0
                        ? "bg-purple-600"
                        : "bg-gray-400"
                    } transition-all duration-700`}
                    style={{ width: `${phase.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso global */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
          style={{ display: "block", width: "100%" }}
        >
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