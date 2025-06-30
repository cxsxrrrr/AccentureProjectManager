import React from "react";
import ClienteDashboard from "./ClienteDashboard";
import "../../stylesheets/page.css";

function TrackingProject({ project }) {
  if (!project) return null;
  const { milestones, phases, nombre, manager, recursos, tareasCompletadas, tareasTotales, tiempoFinalizacion } = project;
  const percentProgress = Math.round(
    (milestones.filter(m => m.estado === "Completado").length / milestones.length) * 100
  );
  const percentTasks = tareasTotales && tareasTotales > 0 ? Math.round((tareasCompletadas / tareasTotales) * 100) : 0;
  return (
    <div className="admin-content" style={{ maxWidth: "1200px", margin: "0 auto", display: "block" }}>
      {/* Detalles del proyecto */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">{nombre}</h2>
        <div className="flex flex-wrap gap-8 text-gray-700 text-base mb-2">
          <div><span className="font-semibold">Manager:</span> {manager}</div>
          <div><span className="font-semibold">Recursos utilizados:</span> {recursos}</div>
          <div><span className="font-semibold">Tareas completadas:</span> {tareasCompletadas} / {tareasTotales} ({percentTasks}%)</div>
          <div><span className="font-semibold">Fecha estimada de finalización:</span> {tiempoFinalizacion}</div>
        </div>
      </div>

      {/* Timeline de Hitos */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-12" style={{ display: "block", width: "100%" }}>
        <h2 className="text-xl font-bold text-gray-700 mb-8">Timeline de Hitos</h2>
        <div className="overflow-x-auto pb-4" style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: "48px" }}>
            {milestones.map((m, idx) => (
              <div
                key={m.id}
                style={{ width: "120px", minWidth: "104px", display: "block" }}
                className="flex flex-col items-center text-center"
              >
                {/* Conector */}
                {idx > 0 && (
                  <div
                    className="h-1 w-10 bg-gray-300 absolute"
                    style={{ left: -48, top: 24, position: "relative", zIndex: 0 }}
                  />
                )}
                <div
                  className={`w-8 h-8 flex items-center justify-center mb-2 rounded-full border-4
                    ${m.estado === "Completado"
                      ? "bg-green-400 border-green-600 text-white"
                      : m.estado === "En progreso"
                      ? "bg-yellow-200 border-yellow-400 text-yellow-700"
                      : "bg-gray-200 border-gray-300 text-gray-400"}
                  `}
                >{m.estado === "Completado" ? "✔" : m.estado === "En progreso" ? "⏳" : "●"}</div>
                <div className="text-sm font-medium">{m.nombre}</div>
                <div className="text-xs text-gray-500 mt-1">{m.fecha_planeada}</div>
                <div className="text-xs text-gray-400">{m.fecha_real ? `(Real: ${m.fecha_real})` : ""}</div>
                <span
                  className={`mt-2 px-3 py-0.5 rounded-full font-bold text-xs
                    ${m.estado === "Completado"
                      ? "bg-green-100 text-green-700"
                      : m.estado === "En progreso"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"}`}
                >
                  {m.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avance por Etapa */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-12" style={{ display: "block", width: "100%" }}>
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
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6" style={{ display: "block", width: "100%" }}>
        <h2 className="text-xl font-bold mb-3 text-gray-700">Avance global del proyecto</h2>
        <div className="w-full bg-gray-200 rounded-full h-5">
          <div
            className="bg-purple-600 h-5 rounded-full transition-all duration-700"
            style={{ width: `${percentProgress}%` }}
          ></div>
        </div>
        <div className="text-right text-sm mt-1 text-gray-700">
          {percentProgress}% completado
        </div>
      </div>
    </div>
  );
}

export default TrackingProject;
export { ClienteDashboard };