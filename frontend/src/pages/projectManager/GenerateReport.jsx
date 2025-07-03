import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import api from "../../services/axios";

// Mock de datos de backend
const mockProyectos = [
  {
    proyectoId: 2,
    nombreProyecto: "PJUTJ",
    descripcionProyecto: "Claudio2",
    fechaInicio: "2025-05-01",
    fechaFin: "2025-06-15",
    fechaFinReal: "2025-07-15",
    estado: "En progreso",
    fechaCreacion: "2025-05-03T10:30:00",
    cliente: { usuarioId: 1, nombre: "Plus Energía" },
    gerenteProyecto: { usuarioId: 1, nombre: "Samuel Rodríguez" },
    creadoPor: { usuarioId: 1 },
    categoria: "backend",
  },
];
const mockTareas = [
  {
    proyectoId: 2,
    nombre: "Implementar login",
    descripcion: "Endpoint y UI de autenticación",
    estado: "NO_INICIADA",
    prioridad: "ALTA",
    fechaInicioEstimada: "2025-07-05",
    fechaFinEstimada: "2025-07-10",
    peso: 6.5,
    creadoPorId: 5,
    categoria: "frontend",
  },
  {
    nombre: "Completar el backend",
    descripcion: "El backend debe ser completado en 1 mes",
    fechaInicio: "2025-05-01",
    fechaPlaneada: "2025-06-15",
    fechaReal: "2025-07-15",
    estado: "Completada",
    proyecto: { proyectoId: 2 },
    creadoPorId: 1,
    categoria: "backend",
  },
];
// Miembros mock (normalmente viene del backend)
const mockMiembros = [
  { id: "samuel", nombre: "Samuel Rodríguez" },
  { id: "valentina", nombre: "Valentina Morán" },
  { id: "enmanuel", nombre: "Enmanuel Fuenmayor" },
];

function GenerateReport() {
  // Estados de datos
  const [proyectos, setProyectos] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [miembros, setMiembros] = useState([]);
  // Estados de filtros
  const [selectedReportType, setSelectedReportType] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  // Estado de métricas incluidas
  const [metrics, setMetrics] = useState({
    completedTasks: true,
    milestone: true,
    estimatedVsReal: false,
    resourceUtil: false,
  });
  // KPIs calculados
  const [kpis, setKpis] = useState({
    completedTasks: 0,
    milestonesAchieved: "0%",
    estimatedVsReal: "0 días",
    resourcesUsed: "0%",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Para guardar el proyecto y tareas seleccionados para el reporte
  const [projectData, setProjectData] = useState(null);
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/proyectos");
        if (response.status === 200) {
          setProyectos(response.data);
          setFilteredProjects(response.data);
        } else {
          console.error("Failed to fetch projects. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTerm) {
      setFilteredProjects(
        proyectos.filter((project) =>
          project.nombreProyecto.toLowerCase().includes(searchTerm)
        )
      );
    } else {
      setFilteredProjects(proyectos);
    }
  };

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setFilteredProjects(proyectos);
    }
  }, [proyectos]);

  // Reiniciar KPIs cuando se cambia de proyecto o filtros y no se ha generado reporte
  useEffect(() => {
    setKpis({
      completedTasks: 0,
      milestonesAchieved: "0%",
      estimatedVsReal: "0 días",
      resourcesUsed: "0%",
    });
    setProjectData(null);
    setTasksData([]);
  }, [selectedProject, selectedCategory, selectedMember, dateRange]);

  const handleChangeMetric = (key) =>
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));

  // Esta función devuelve un array de objetos para exportar, usando las tareas/proyectos filtrados
  const getReportData = () => {
    // Simulación simple: combinamos los KPIs seleccionados y los mostramos como filas en la tabla
    const data = [];
    if (metrics.completedTasks) {
      data.push({ Métrica: "Completed Tasks", Valor: kpis.completedTasks });
    }
    if (metrics.milestone) {
      data.push({
        Métrica: "Milestones Achieved",
        Valor: kpis.milestonesAchieved,
      });
    }
    if (metrics.estimatedVsReal) {
      data.push({
        Métrica: "Estimated vs Real time",
        Valor: kpis.estimatedVsReal,
      });
    }
    if (metrics.resourceUtil) {
      data.push({ Métrica: "Resource Utilization", Valor: kpis.resourcesUsed });
    }
    return data;
  };

  // Exportar a Excel con proyecto, tareas y métricas
  const handleExportExcel = () => {
    if (!projectData) {
      alert("Primero genera el reporte para obtener los datos.");
      return;
    }

    // 1. Proyecto
    const projectSheetData = [
      ["Project Information", ""],
      ["Project Name", projectData.nombreProyecto || ""],
      ["Description", projectData.descripcionProyecto || ""],
      ["Category", projectData.categoria || ""],
      ["Status", projectData.estado || ""],
      ["Start Date", projectData.fechaInicio ? String(projectData.fechaInicio).split("T")[0] : ""],
      ["Planned End Date", projectData.fechaFin ? String(projectData.fechaFin).split("T")[0] : ""],
      ["Real End Date", projectData.fechaFinReal ? String(projectData.fechaFinReal).split("T")[0] : ""],
      ["Client", projectData.cliente?.nombre || ""],
      ["Project Manager", projectData.gerenteProyecto?.nombre || ""],
    ];

    // 2. Tareas
    const taskSheetData = [
      [
        "Task Name",
        "Description",
        "Status",
        "Priority",
        "Estimated Start",
        "Estimated End",
        "Weight",
        "Category",
      ],
      ...tasksData.map((t) => [
        t.nombre || "",
        t.descripcion || "",
        t.estado || "",
        t.prioridad || "",
        t.fechaInicioEstimada || t.fechaInicio || "",
        t.fechaFinEstimada || t.fechaPlaneada || t.fechaFin || "",
        t.peso || "",
        t.categoria || "",
      ]),
    ];

    // 3. Métricas
    const metricsData = [
      ["Metrics", "Value"],
      ...getReportData().map((row) => [row.Métrica, row.Valor]),
    ];

    // Crear libro y hojas
    const wb = XLSX.utils.book_new();

    // Proyecto
    const wsProject = XLSX.utils.aoa_to_sheet(projectSheetData);
    wsProject["!cols"] = [{ wch: 22 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, wsProject, "Project");

    // Tareas
    const wsTasks = XLSX.utils.aoa_to_sheet(taskSheetData);
    wsTasks["!cols"] = [
      { wch: 22 },
      { wch: 40 },
      { wch: 14 },
      { wch: 12 },
      { wch: 18 },
      { wch: 18 },
      { wch: 10 },
      { wch: 18 },
    ];
    XLSX.utils.book_append_sheet(wb, wsTasks, "Tasks");

    // Métricas
    const wsMetrics = XLSX.utils.aoa_to_sheet(metricsData);
    wsMetrics["!cols"] = [{ wch: 28 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsMetrics, "Metrics");

    // Descargar
    XLSX.writeFile(wb, "reporte.xlsx");
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Progreso", 14, 16);
    doc.setFontSize(12);
    doc.text(`Fecha generado: ${new Date().toLocaleDateString()}`, 14, 25);

    // Construye datos para la tabla
    const data = getReportData();
    doc.autoTable({
      startY: 35,
      head: [["Métrica", "Valor"]],
      body: data.map((row) => [row.Métrica, String(row.Valor)]),
      theme: "striped",
      styles: { fontSize: 12 },
      headStyles: {
        fillColor: [103, 58, 183], // morado para el header
        textColor: [255, 255, 255], // texto blanco
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { fillColor: [103, 58, 183], textColor: [255, 255, 255], fontStyle: 'bold' }, // primera columna morada, texto blanco
        1: { fillColor: [245, 239, 255], textColor: [80, 0, 170] }, // segunda columna lila claro, texto morado oscuro
      },
      alternateRowStyles: { fillColor: [245, 239, 255] }, // filas alternas lila claro
      tableLineColor: [80, 0, 170],
      tableLineWidth: 0.2,
    });

    doc.save("reporte.pdf");
  };

  const handleGenerateReport = async () => {
    if (!selectedProject) {
      setKpis({
        completedTasks: 0,
        milestonesAchieved: "0%",
        estimatedVsReal: "0 días",
        resourcesUsed: "0%",
      });
      setProjectData(null);
      setTasksData([]);
      alert("Please select a project first.");
      return;
    }
    try {
      // Fetch project
      const projectRes = await api.get(
        `http://localhost:8080/api/proyectos/${selectedProject}`
      );
      // Fetch tasks
      const tasksRes = await api.get(
        `http://localhost:8080/api/tareas/proyecto/${selectedProject}`
      );
      // Fetch resources (ultrasimple)
      const resourcesRes = await api.get(
        `http://localhost:8080/api/recursos-proyecto/proyecto/${selectedProject}/ultrasimple`
      );

      const project = projectRes.data;
      const tasks = tasksRes.data;
      setProjectData(project);
      setTasksData(tasks);

      // resourcesRes.data could be an array of arrays, flatten it
      const resources = Array.isArray(resourcesRes.data)
        ? resourcesRes.data.flat()
        : [];

      // Completed vs Pending Tasks
      const completedTasks = tasks.filter(
        (t) =>
          t.estado &&
          (t.estado.toLowerCase() === "completada" ||
            t.estado.toLowerCase().includes("complet"))
      ).length;
      const pendingTasks = tasks.length - completedTasks;

      // Milestone compliance (percentage of completed tasks)
      const milestonesAchieved = tasks.length
        ? `${Math.round((completedTasks / tasks.length) * 100)}%`
        : "0%";

      // Estimated vs Real time (diferencia entre fechaInicio y fechaFinReal del proyecto seleccionado)
      let estimatedVsReal = "0 días";
      if (project && project.fechaInicio && project.fechaFinReal) {
        const start = String(project.fechaInicio).split('T')[0];
        const end = String(project.fechaFinReal).split('T')[0];
        const date1 = new Date(start + 'T00:00:00Z');
        const date2 = new Date(end + 'T00:00:00Z');
        const diff = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
        estimatedVsReal = `${diff} días`;
      }

      // Resource utilization: % of resources with disponibilidad !== "Inactivo"
      let resourcesUsed = "0%";
      if (resources.length > 0) {
        const active = resources.filter(
          (r) =>
            r.recurso &&
            r.recurso.disponibilidad &&
            r.recurso.disponibilidad.toLowerCase() !== "inactivo"
        ).length;
        resourcesUsed = `${Math.round((active / resources.length) * 100)}%`;
      }

      setKpis({
        completedTasks,
        milestonesAchieved,
        estimatedVsReal,
        resourcesUsed,
      });
    } catch (error) {
      setKpis({
        completedTasks: 0,
        milestonesAchieved: "0%",
        estimatedVsReal: "0 días",
        resourcesUsed: "0%",
      });
      setProjectData(null);
      setTasksData([]);
      alert("Error fetching report data. Check your backend.");
      console.error(error);
    }
  };

  const handleGenerateAndSendReport = async () => {
    if (!selectedProject) {
      alert("Please select a project first.");
      return;
    }
    try {
      // Fetch project
      const projectRes = await api.get(
        `/proyectos/${selectedProject}`
      );
      // Fetch tasks
      const tasksRes = await api.get(
        `/tareas/proyecto/${selectedProject}`
      );
      // Fetch resources (ultrasimple)
      const resourcesRes = await api.get(
        `/recursos-proyecto/proyecto/${selectedProject}/ultrasimple`
      );

      const project = projectRes.data;
      const tasks = tasksRes.data;
      const resources = Array.isArray(resourcesRes.data)
        ? resourcesRes.data.flat()
        : [];

      // KPIs
      const completedTasks = tasks.filter(
        (t) =>
          t.estado &&
          (t.estado.toLowerCase() === "completada" ||
            t.estado.toLowerCase().includes("complet"))
      ).length;
      const pendingTasks = tasks.length - completedTasks;
      const milestonesAchieved = tasks.length
        ? Math.round((completedTasks / tasks.length) * 100)
        : 0;
      let estimatedTime = 0;
      let realTime = 0;
      if (project && project.fechaInicio && project.fechaFin) {
        const start = String(project.fechaInicio).split('T')[0];
        const end = String(project.fechaFin).split('T')[0];
        const date1 = new Date(start + 'T00:00:00Z');
        const date2 = new Date(end + 'T00:00:00Z');
        estimatedTime = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
      }
      if (project && project.fechaInicio && project.fechaFinReal) {
        const start = String(project.fechaInicio).split('T')[0];
        const end = String(project.fechaFinReal).split('T')[0];
        const date1 = new Date(start + 'T00:00:00Z');
        const date2 = new Date(end + 'T00:00:00Z');
        realTime = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
      }
      let resourceUtilization = 0;
      if (resources.length > 0) {
        const active = resources.filter(
          (r) =>
            r.recurso &&
            r.recurso.disponibilidad &&
            r.recurso.disponibilidad.toLowerCase() !== "inactivo"
        ).length;
        resourceUtilization = (active / resources.length) * 100;
      }

      // Solo incluir los KPIs seleccionados
      const parametros = {};
      if (metrics.completedTasks) {
        parametros.completedTasks = completedTasks;
        parametros.pendingTasks = pendingTasks;
      }
      if (metrics.milestone) {
        parametros.milestoneCompliance = milestonesAchieved;
      }
      if (metrics.estimatedVsReal) {
        parametros.estimatedTime = estimatedTime;
        parametros.realTime = realTime;
      }
      if (metrics.resourceUtil) {
        parametros.resourceUtilization = Number(resourceUtilization.toFixed(1));
      }

      const body = {
        nombre: `Reporte de Proyecto ${project.nombreProyecto}`,
        tipoReporte: "Resumen Semanal",
        generadoPorId: 1, // Puedes cambiar esto por el usuario logueado
        proyectoId: project.proyectoId,
        parametros: JSON.stringify(parametros),
      };
      // Primero crea el reporte
      const createRes = await api.post("/reportes", body);
      const reporteId = createRes.data && createRes.data.reporteId ? createRes.data.reporteId : createRes.data.id || createRes.data;
      if (!reporteId) {
        alert("No se pudo obtener el ID del reporte generado");
        return;
      }
      // Luego descarga el PDF
      const pdfRes = await api.get(`/reportes/${reporteId}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([pdfRes.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', body.nombre + '.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error generando o descargando el reporte PDF");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Topbar title="Generate Report">
        <div className="top-controls"></div>
      </Topbar>
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Filters & Criteria */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 min-w-[330px] max-w-md">
          <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center gap-2">
            Filters & Criteria
          </h3>
          <div className="space-y-4">
            {/* Search Bar */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Search Projects
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 p-2"
                placeholder="Search by project name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {/* Projects List */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Projects
              </label>
              <ul className="space-y-2 max-h-80 overflow-y-auto">
                {filteredProjects.map((project) => (
                  <li
                    key={project.proyectoId}
                    className={`p-2 border rounded-lg cursor-pointer hover:bg-purple-100 ${
                      selectedProject === project.proyectoId ? "bg-purple-200" : ""
                    }`}
                    onClick={() => setSelectedProject(project.proyectoId)}
                  >
                    {project.nombreProyecto}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Metrics + KPIs */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Metrics to Include */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center gap-2">
              Metrics to Include
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Checkbox
                id="completed-tasks"
                label="Completed vs Pending Tasks"
                checked={metrics.completedTasks}
                onChange={() => handleChangeMetric("completedTasks")}
              />
              <Checkbox
                id="milestone"
                label="Milestone compliance"
                checked={metrics.milestone}
                onChange={() => handleChangeMetric("milestone")}
              />
              <Checkbox
                id="estimated-vs-real"
                label="Estimated vs Real time"
                checked={metrics.estimatedVsReal}
                onChange={() => handleChangeMetric("estimatedVsReal")}
              />
              <Checkbox
                id="resource-util"
                label="Resource utilization"
                checked={metrics.resourceUtil}
                onChange={() => handleChangeMetric("resourceUtil")}
              />
            </div>
          </div>
          {/* KPIs Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {metrics.completedTasks && (
              <KpiCard label="Completed Tasks" value={kpis.completedTasks} />
            )}
            {metrics.milestone && (
              <KpiCard
                label="Milestones achieved"
                value={kpis.milestonesAchieved}
              />
            )}
            {metrics.estimatedVsReal && (
              <KpiCard
                label="Estimated vs Real time"
                value={kpis.estimatedVsReal}
              />
            )}
            {metrics.resourceUtil && (
              <KpiCard
                label="Resource utilization"
                value={kpis.resourcesUsed}
              />
            )}
          </div>
        </div>
      </div>
      {/* Generate & Export (Sticky at the bottom) */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-5 px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_2px_24px_-2px_rgba(80,0,170,0.18)]">
        <div className="flex gap-3">
          <button
            className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
          <button
            className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition"
            onClick={handleGenerateAndSendReport}
          >
            Export PDF
          </button>
          <button
            className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition"
            onClick={handleExportExcel}
          >
            Export Excel
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Checkbox
function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-start gap-4">
      <input
        id={id}
        type="checkbox"
        className="accent-purple-600 w-5 h-5 mt-1.5"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

// Componente KPI Card
function KpiCard({ label, value }) {
  return (
    <div className="relative rounded-2xl bg-white shadow-md flex flex-col justify-center px-6 py-5 min-w-[160px] aspect-square">
      <div className="absolute top-3 left-0 h-[85%] w-1.5 rounded-r-xl bg-gradient-to-b from-purple-600 to-purple-400" />
      <span className="block text-gray-500 text-lg font-semibold mb-1 ml-3">
        {label}
      </span>
      <span className="text-3xl font-extrabold text-gray-800 mb-1 ml-3">
        {value}
      </span>
    </div>
  );
}

export default GenerateReport;