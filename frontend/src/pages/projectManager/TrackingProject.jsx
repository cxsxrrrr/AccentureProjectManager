import React, { useState, useEffect } from "react";
import Topbar from "../../components/common/Topbar";
import api from "../../services/axios";
import "../../stylesheets/page.css";

// Color maps para estados y prioridades
const STATUS_STYLE = {
  NO_INICIADA: "bg-gray-200 text-gray-700",
  EN_PROGRESO: "bg-yellow-100 text-yellow-700",
  COMPLETADA: "bg-green-100 text-green-700",
  BLOQUEADA: "bg-red-100 text-red-600",
};

const PRIORITY_STYLE = {
  ALTA: "bg-red-200 text-red-700",
  MEDIA: "bg-yellow-200 text-yellow-700",
  BAJA: "bg-green-200 text-green-700",
};

const PROJECT_STATUS_STYLE = {
  "En progreso": "bg-yellow-100 text-yellow-700",
  "Active": "bg-yellow-100 text-yellow-700",
  "Activo": "bg-yellow-100 text-yellow-700",
  "Completada": "bg-green-100 text-green-700",
  "Completed": "bg-green-100 text-green-700",
  "Finalizado": "bg-green-100 text-green-700",
  "No iniciada": "bg-gray-200 text-gray-700",
  "On Hold": "bg-orange-100 text-orange-700",
  "En espera": "bg-orange-100 text-orange-700",
  "Bloqueada": "bg-red-100 text-red-600",
  "Cancelled": "bg-red-100 text-red-600",
  "Cancelado": "bg-red-100 text-red-600",
};

function TrackingProject() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Obtener usuario actual desde localStorage
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        return user;
      } else {
        console.warn('No user data found in localStorage');
        return null;
      }
    } catch (error) {
      console.error('Error getting current user from localStorage:', error);
      return null;
    }
  };

  // Cargar proyectos filtrados por gerente
  const fetchManagerProjects = async (user) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Obtener todos los proyectos
      const projectsRes = await api.get("/proyectos");
      
      if (!projectsRes.data || !Array.isArray(projectsRes.data)) {
        console.warn('No projects data received or invalid format');
        setProjects([]);
        return;
      }

      // Filtrar proyectos donde el gerente sea el usuario actual
      const filteredProjects = projectsRes.data.filter(project => {
        // Múltiples formas de verificar si es el gerente
        return (
          project.gerenteProyecto?.usuarioId === user.usuarioId ||
          project.gerenteProyecto?.id === user.usuarioId ||
          project.managerId === user.usuarioId ||
          project.gerenteId === user.usuarioId ||
          project.gerenteProyecto?.cedula === user.cedula
        );
      });

      // Obtener tareas para cada proyecto
      const projectsWithTasks = await Promise.all(
        filteredProjects.map(async (project) => {
          try {
            const projectId = project.id || project.proyectoId;
            const tasksRes = await api.get(`/tareas/proyecto/${projectId}`);
            return {
              ...project,
              tareas: Array.isArray(tasksRes.data) ? tasksRes.data : []
            };
          } catch (error) {
            console.warn(`Error fetching tasks for project ${project.id || project.proyectoId}:`, error);
            return {
              ...project,
              tareas: []
            };
          }
        })
      );

      setProjects(projectsWithTasks);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      // Aquí podrías agregar una notificación toast
    } finally {
      setLoading(false);
    }
  };

  // Función para formato fecha
  const fmtDate = (date) => {
    if (!date) return "-";
    try {
      if (typeof date === 'string') {
        // Si es un string con formato ISO, extraer solo la fecha
        return date.length > 10 ? date.split("T")[0] : date;
      }
      // Si es un objeto Date
      if (date instanceof Date) {
        return date.toISOString().split("T")[0];
      }
      return date.toString();
    } catch (error) {
      console.warn('Error formatting date:', date, error);
      return "-";
    }
  };

  // Funciones para chips de estado
  const estadoChip = (estado) =>
    STATUS_STYLE[estado] || "bg-gray-100 text-gray-500";

  const prioridadChip = (prioridad) =>
    PRIORITY_STYLE[prioridad] || "bg-gray-100 text-gray-500";

  const getProjectStatusStyle = (status) =>
    PROJECT_STATUS_STYLE[status] || "bg-gray-100 text-gray-500";

  // Función de ordenamiento
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filtrar y ordenar proyectos
  const getFilteredAndSortedProjects = () => {
    let filtered = projects;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = projects.filter(project =>
        project.nombreProyecto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.cliente?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.estado?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Manejo especial para cliente
        if (sortConfig.key === 'cliente') {
          aValue = a.cliente?.nombre || '';
          bValue = b.cliente?.nombre || '';
        }

        // Manejo especial para fechas
        if (sortConfig.key.includes('fecha')) {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  // Calcular estadísticas del proyecto
  const getProjectStats = (project) => {
    if (!project.tareas || project.tareas.length === 0) {
      return { total: 0, completed: 0, inProgress: 0, blocked: 0, percentage: 0 };
    }

    const total = project.tareas.length;
    const completed = project.tareas.filter(t => t.estado === 'COMPLETADA').length;
    const inProgress = project.tareas.filter(t => t.estado === 'EN_PROGRESO').length;
    const blocked = project.tareas.filter(t => t.estado === 'BLOQUEADA').length;
    const percentage = Math.round((completed / total) * 100);

    return { total, completed, inProgress, blocked, percentage };
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      fetchManagerProjects(user);
    }
  }, []);

  const filteredProjects = getFilteredAndSortedProjects();

  return (
    <div className="admin-page h-full min-h-screen flex flex-col">
      <Topbar title="Project Tracking" showSearch={false} />
      <div className="admin-content flex-1 flex flex-col justify-center items-center p-0">
        {/* LISTA DE PROYECTOS */}
        {!selected ? (
          <div className="w-full max-w-7xl mx-auto py-8 flex flex-col gap-6 h-full">
            <div className="px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
                My Projects
              </h2>
              {currentUser && (
                <p className="text-gray-600 text-lg mb-4">
                  Projects managed by: <span className="font-semibold">{currentUser.nombre} {currentUser.apellido}</span>
                </p>
              )}
              
              {/* Barra de búsqueda */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search projects by name, client, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto w-full flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  <div className="ml-4 text-xl text-gray-500">Loading projects...</div>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-center">
                    <div className="text-xl text-gray-500 mb-2">
                      {projects.length === 0 
                        ? (currentUser ? "No projects assigned to you as manager." : "Loading user data...")
                        : "No projects found matching your search."
                      }
                    </div>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-purple-600 hover:text-purple-800 underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <table className="w-full text-lg rounded-2xl bg-white shadow-2xl border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th 
                        className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide cursor-pointer hover:text-purple-600"
                        onClick={() => handleSort('nombreProyecto')}
                      >
                        Name {sortConfig.key === 'nombreProyecto' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide cursor-pointer hover:text-purple-600"
                        onClick={() => handleSort('cliente')}
                      >
                        Client {sortConfig.key === 'cliente' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide cursor-pointer hover:text-purple-600"
                        onClick={() => handleSort('fechaInicio')}
                      >
                        Start Date {sortConfig.key === 'fechaInicio' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide cursor-pointer hover:text-purple-600"
                        onClick={() => handleSort('fechaFin')}
                      >
                        End Date {sortConfig.key === 'fechaFin' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide cursor-pointer hover:text-purple-600"
                        onClick={() => handleSort('estado')}
                      >
                        Status {sortConfig.key === 'estado' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                        Progress
                      </th>
                      <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wide">
                        Tasks
                      </th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((proj, i) => {
                      const stats = getProjectStats(proj);
                      return (
                        <tr
                          key={proj.id || proj.proyectoId}
                          className={`
                            hover:bg-purple-50 hover:scale-[1.01] transition cursor-pointer
                            ${i % 2 ? "bg-gray-50" : "bg-white"}
                          `}
                          style={{ height: "68px" }}
                          onClick={() => setSelected(proj)}
                        >
                          <td className="px-6 py-6 font-semibold text-gray-800 text-lg">
                            {proj.nombreProyecto}
                          </td>
                          <td className="px-6 py-6 text-base">
                            {proj.cliente?.nombre || "No client assigned"}
                          </td>
                          <td className="px-6 py-6 text-base">
                            {fmtDate(proj.fechaInicio)}
                          </td>
                          <td className="px-6 py-6 text-base">
                            {fmtDate(proj.fechaFin)}
                          </td>
                          <td className="px-6 py-6">
                            <span
                              className={`px-4 py-1 rounded-full font-bold text-base ${getProjectStatusStyle(proj.estado)}`}
                            >
                              {proj.estado || "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${stats.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-600">
                                {stats.percentage}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-base">
                            <div className="flex gap-1">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {stats.total} total
                              </span>
                              {stats.completed > 0 && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                  {stats.completed} done
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(proj);
                              }}
                              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold text-base shadow-lg hover:from-purple-600 hover:to-purple-800 transition"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : (
          // DETALLE DEL PROYECTO + TAREAS
          <div className="w-full h-full flex justify-center items-stretch">
            <div className="w-full max-w-6xl mx-auto my-8 bg-white rounded-3xl shadow-2xl p-5 sm:p-10 md:p-16 relative flex flex-col min-h-[75vh] animate-fade-in">
              {/* Botón volver */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-purple-700 transition"
                title="Back"
              >
                <span className="mr-1 text-xl">←</span> Back
              </button>

              {/* Información principal del proyecto */}
              <div className="w-full flex flex-col md:flex-row gap-10 mb-8">
                {/* Izquierda: Nombre y descripción */}
                <div className="flex-1 min-w-[220px] flex flex-col justify-center">
                  <h2 className="text-4xl font-extrabold text-purple-700 mb-3">
                    {selected.nombreProyecto}
                  </h2>
                  {selected.descripcionProyecto && (
                    <div className="text-gray-500 text-xl mb-6">
                      {selected.descripcionProyecto}
                    </div>
                  )}
                  
                  {/* Información general en fila horizontal */}
                  <div className="flex flex-row flex-wrap gap-x-10 gap-y-4 mt-4">
                    <div>
                      <span className="block text-gray-400 text-base">Client</span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.cliente?.nombre || "No client assigned"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">Project Manager</span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.gerenteProyecto?.nombre || currentUser?.nombre || "Not assigned"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">Created By</span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {selected.creadoPor?.nombre || "Unknown"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">Created On</span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {fmtDate(selected.fechaCreacion)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Derecha: Fechas y estado */}
                <div className="flex-1 min-w-[230px] flex flex-col md:justify-end md:items-end">
                  <div className="flex flex-row flex-wrap gap-x-10 gap-y-4 w-full md:w-auto md:justify-end">
                    <div>
                      <span className="block text-gray-400 text-base">Start Date</span>
                      <span className="font-bold text-gray-800 text-lg">
                        {fmtDate(selected.fechaInicio)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-base">Planned End</span>
                      <span className="font-bold text-gray-800 text-lg">
                        {fmtDate(selected.fechaFin)}
                      </span>
                    </div>
                    {selected.fechaFinReal && (
                      <div>
                        <span className="block text-gray-400 text-base">Actual End</span>
                        <span className="font-bold text-gray-800 text-lg">
                          {fmtDate(selected.fechaFinReal)}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="block text-gray-400 text-base">Status</span>
                      <span
                        className={`font-bold px-4 py-1 rounded-full text-base ${getProjectStatusStyle(selected.estado)}`}
                      >
                        {selected.estado || "Unknown"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Estadísticas del proyecto */}
                  {(() => {
                    const stats = getProjectStats(selected);
                    return stats.total > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Project Progress</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${stats.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {stats.percentage}%
                          </span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-green-600">✓ {stats.completed} completed</span>
                          <span className="text-yellow-600">⟳ {stats.inProgress} in progress</span>
                          {stats.blocked > 0 && <span className="text-red-600">⚠ {stats.blocked} blocked</span>}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* SECCIÓN DE TAREAS */}
              <div className="mt-4 w-full min-w-0">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">
                  Tasks ({selected.tareas?.length || 0})
                </h3>
                <div className="w-full min-w-0">
                  <div className="overflow-x-auto w-full min-w-0 bg-transparent">
                    <div className="rounded-2xl shadow-lg bg-white min-w-0 p-0">
                      <table className="min-w-[900px] w-full text-base sm:text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Task
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Description
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Status
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Priority
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Est. Start
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Est. End
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Real Start
                            </th>
                            <th className="px-4 py-3 sm:px-2 text-left text-gray-500 font-bold uppercase whitespace-nowrap">
                              Real End
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(!selected.tareas || selected.tareas.length === 0) ? (
                            <tr>
                              <td
                                colSpan={8}
                                className="text-center py-10 text-gray-400"
                              >
                                No tasks registered for this project.
                              </td>
                            </tr>
                          ) : (
                            selected.tareas.map((task, idx) => (
                              <tr
                                key={task.id || task.tareaId || idx}
                                className={`hover:bg-gray-50 ${idx % 2 === 1 ? "bg-gray-25" : ""}`}
                              >
                                <td className="px-4 py-3 sm:px-2 font-semibold">
                                  <div className="max-w-[150px] truncate" title={task.nombre}>
                                    {task.nombre || "Unnamed Task"}
                                  </div>
                                </td>
                                <td className="px-4 py-3 sm:px-2">
                                  <div className="max-w-[200px] truncate" title={task.descripcion}>
                                    {task.descripcion || "-"}
                                  </div>
                                </td>
                                <td className="px-4 py-3 sm:px-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${estadoChip(task.estado)}`}
                                  >
                                    {task.estado ? task.estado.replace(/_/g, " ") : "Unknown"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 sm:px-2">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${prioridadChip(task.prioridad)}`}
                                  >
                                    {task.prioridad || "Not set"}
                                  </span>
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaInicioEstimada)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaFinEstimada)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaInicioReal)}
                                </td>
                                <td className="px-4 py-3 sm:px-2 whitespace-nowrap">
                                  {fmtDate(task.fechaFinReal)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackingProject;