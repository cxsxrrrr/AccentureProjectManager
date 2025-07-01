import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";
import api from "../../services/axios";


const getClientProjects = async (clientId) => {
  try {
    const response = await api.get(`/proyectos/cliente/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client projects:", error);
    throw error;
  }
};

const getMilestonesByProject = async (proyectoId) => {
  try {
    const response = await api.get(`/hitos/${proyectoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return [];
  }
};

// Componente para la vista de tracking
function TrackingProject({ project, onBack }) {
  if (!project) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400">No hay proyecto seleccionado</div>
      </div>
    );
  }

  const { milestones = [] } = project;

  const percentProgress = milestones.length > 0
    ? Math.round(
      (milestones.filter(m => m.estado === "Completado").length / milestones.length) * 100
    )
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
    <div>
      {/* Botón de regreso y información del proyecto */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-4 transition-colors"
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

      {/* Timeline de Hitos */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
        <h2 className="text-xl font-bold text-gray-700 mb-8">Timeline de Hitos</h2>
        <div className="overflow-x-auto pb-4">
          <div style={{ display: "flex", gap: "48px", minWidth: "max-content" }}>
            {Array.isArray(milestones) && milestones.map((m, idx) => (
  <div
    key={m.id ?? `${m.nombre}-${idx}`} // Usa id si existe, si no, combina nombre e índice
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
        className={`absolute h-1 ${milestones[idx - 1].estado === "Completado" && m.estado === "Completado"
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
          ${m.estado === "Completado"
          ? "bg-green-400 border-green-600 text-white"
          : m.estado === "En progreso"
            ? "bg-yellow-200 border-yellow-400 text-yellow-700"
            : "bg-gray-200 border-gray-300 text-gray-400"
        }
        `}
    >
      {m.estado === "Completado" ? "✔" : m.estado === "En Progreso" ? "⏳" : "●"}
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
          ${m.estado === "Completado"
          ? "bg-green-100 text-green-700"
          : m.estado === "En Progreso"
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
  );
}

// Componente principal Dashboard
function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' o 'tracking'

  useEffect(() => {
    const fetchProjects = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.usuarioId) {
        console.error("No se encontró el usuario en localStorage o usuarioId está vacío");
        return;
      }

      try {
        const response = await api.get(`/proyectos/cliente/${user.usuarioId}`);
        setProjects(response.data);
      } catch (err) {
        console.error('Error al obtener proyectos del cliente:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleSelectProject = async (project) => {
    // Cargar hitos antes de mostrar el tracking
    const milestones = await getMilestonesByProject(project.proyectoId);
    setSelectedProject({ ...project, milestones });
    setCurrentView('tracking');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProject(null);
  };

  const getStatusBadge = (estado) => {
    const styles = {
      "En Progreso": "bg-blue-100 text-blue-800 border-blue-200",
      "Completado": "bg-green-100 text-green-800 border-green-200",
      "Pendiente": "bg-gray-100 text-gray-800 border-gray-200",
      "Pausado": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return styles[estado] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Vista de Dashboard
  const renderDashboard = () => (
    <div>
      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
          <div className="text-gray-600 text-sm">Total Proyectos</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="text-2xl font-bold text-green-600">
            {projects.filter(p => p.estado === "Completado").length}
          </div>
          <div className="text-gray-600 text-sm">Completados</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="text-2xl font-bold text-orange-600">
            {projects.filter(p => p.estado === "En Progreso").length}
          </div>
          <div className="text-gray-600 text-sm">En Progreso</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform">
          <div className="text-2xl font-bold text-gray-600">
            {projects.filter(p => p.estado === "Pendiente").length}
          </div>
          <div className="text-gray-600 text-sm">Pendientes</div>
        </div>
      </div>

      {/* Tabla de proyectos */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600">
          <h2 className="text-xl font-bold text-white">Project Status</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estimated Start
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estimated End
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((proyecto) => {
                const progressPercentage = proyecto.tareasTotales > 0
                  ? Math.round((proyecto.tareasCompletadas / proyecto.tareasTotales) * 100)
                  : 0;

                return (
                  <tr key={proyecto.proyectoId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{proyecto.nombreProyecto}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {proyecto.descripcionProyecto}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(proyecto.estado)}`}>
                        {proyecto.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(proyecto.fechaInicio)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(proyecto.fechaFin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {proyecto.gerenteProyecto?.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${progressPercentage === 100 ? 'bg-green-500' :
                              progressPercentage > 0 ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">
                          {progressPercentage}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {proyecto.tareasCompletadas}/{proyecto.tareasTotales} tareas
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSelectProject(proyecto)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
                      >
                        Ver Tracking
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-page">
      <Topbar
        title={currentView === 'dashboard' ? "Dashboard de Proyectos" : `Tracking: ${selectedProject?.nombreProyecto}`}
        showSearch={false}
      />
      <div className="admin-content" style={{ maxWidth: "1400px", margin: "0 auto", display: "block" }}>
        {currentView === 'dashboard' ? (
          renderDashboard()
        ) : (
          <TrackingProject
            project={selectedProject}
            onBack={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;