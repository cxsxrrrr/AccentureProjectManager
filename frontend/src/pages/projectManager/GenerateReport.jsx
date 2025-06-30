import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

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

  // Simular fetch a backend
  useEffect(() => {
    setTimeout(() => {
      setProyectos(mockProyectos);
      setTareas(mockTareas);
      setMiembros(mockMiembros);
    }, 300);
  }, []);

  // Filtrar y calcular KPIs
  useEffect(() => {
    let filteredProjects = proyectos;
    if (selectedProject) {
      filteredProjects = filteredProjects.filter(
        (p) => String(p.proyectoId) === selectedProject
      );
    }
    if (selectedCategory) {
      filteredProjects = filteredProjects.filter(
        (p) => p.categoria === selectedCategory
      );
    }

    let filteredTareas = tareas;
    if (selectedProject) {
      filteredTareas = filteredTareas.filter(
        (t) =>
          t.proyectoId === Number(selectedProject) ||
          (t.proyecto && t.proyecto.proyectoId === Number(selectedProject))
      );
    }
    if (selectedCategory) {
      filteredTareas = filteredTareas.filter(
        (t) => t.categoria === selectedCategory
      );
    }
    if (selectedMember) {
      filteredTareas = filteredTareas.filter(
        (t) => String(t.creadoPorId) === selectedMember
      );
    }
    if (dateRange.start) {
      filteredTareas = filteredTareas.filter(
        (t) => (t.fechaInicioEstimada || t.fechaInicio) >= dateRange.start
      );
    }
    if (dateRange.end) {
      filteredTareas = filteredTareas.filter(
        (t) =>
          (t.fechaFinEstimada || t.fechaPlaneada || t.fechaReal) <=
          dateRange.end
      );
    }

    // KPIs
    // Completed Tasks
    const completedTasks = filteredTareas.filter(
      (t) =>
        t.estado &&
        (t.estado.toLowerCase() === "completada" ||
          t.estado.toLowerCase().includes("complet"))
    ).length;

    // Milestones achieved (proporción de tareas completadas)
    const milestonesAchieved = filteredTareas.length
      ? `${Math.round((completedTasks / filteredTareas.length) * 100)}%`
      : "0%";

    // Estimated vs Real time (promedio de días de diferencia)
    const estimatedRealDiffs = filteredTareas
      .map((t) => {
        let estimada = t.fechaFinEstimada || t.fechaPlaneada;
        let real = t.fechaReal;
        if (estimada && real) {
          // Asume formato "YYYY-MM-DD"
          const date1 = new Date(estimada);
          const date2 = new Date(real);
          return (date2 - date1) / (1000 * 60 * 60 * 24); // días
        }
        return null;
      })
      .filter((val) => val !== null);

    const estimatedVsReal =
      estimatedRealDiffs.length > 0
        ? `${Math.round(
            estimatedRealDiffs.reduce((a, b) => a + b, 0) /
              estimatedRealDiffs.length
          )} días`
        : "0 días";

    // Resource Utilization (mock estático, aquí debes poner tu lógica real si la tienes)
    const resourcesUsed = "76%";

    setKpis({
      completedTasks,
      milestonesAchieved,
      estimatedVsReal,
      resourcesUsed,
    });
  }, [
    proyectos,
    tareas,
    selectedProject,
    selectedCategory,
    selectedMember,
    dateRange,
  ]);

  // Handlers
  const handleChangeMetric = (key) =>
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));

  // Esta función devuelve un array de objetos para exportar, usando las tareas/proyectos filtrados
  const getReportData = () => {
    // Simulación simple: combinamos los KPIs seleccionados y los mostramos como filas en la tabla
    const data = [];
    if (metrics.completedTasks) {
      data.push({ metric: "Completed Tasks", value: kpis.completedTasks });
    }
    if (metrics.milestone) {
      data.push({
        metric: "Milestones Achieved",
        value: kpis.milestonesAchieved,
      });
    }
    if (metrics.estimatedVsReal) {
      data.push({
        metric: "Estimated vs Real time",
        value: kpis.estimatedVsReal,
      });
    }
    if (metrics.resourceUtil) {
      data.push({ metric: "Resource Utilization", value: kpis.resourcesUsed });
    }
    return data;
  };

  const handleExportExcel = () => {
    const data = getReportData();
    // SheetJS requiere un array de objetos
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
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
      body: data.map((row) => [row.metric, String(row.value)]),
      theme: "striped",
      styles: { fontSize: 12 },
    });

    doc.save("reporte.pdf");
  };

  const handleGenerateReport = () => {
    alert(
      "Reporte generado (simulación). Ahora puedes exportar en PDF o Excel."
    );
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
            {/* Report Type */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Report Type
              </label>
              <select
                className="w-full rounded-lg border-gray-300 p-2"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
              >
                <option value="">Select report type</option>
                <option value="tasks">Tasks Report</option>
                <option value="resources">Resources Report</option>
                <option value="milestones">Milestones Report</option>
              </select>
            </div>
            {/* Time Period */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1 font-semibold">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 p-2"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1 font-semibold">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 p-2"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                />
              </div>
            </div>
            {/* Categories */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Categories
              </label>
              <select
                className="w-full rounded-lg border-gray-300 p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="design">Design</option>
              </select>
            </div>
            {/* Projects */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Projects
              </label>
              <select
                className="w-full rounded-lg border-gray-300 p-2"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">All projects</option>
                {proyectos.map((p) => (
                  <option key={p.proyectoId} value={p.proyectoId}>
                    {p.nombreProyecto}
                  </option>
                ))}
              </select>
            </div>
            {/* Members */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Filter by Members
              </label>
              <select
                className="w-full rounded-lg border-gray-300 p-2"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                <option value="">All members</option>
                {miembros.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
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
            onClick={handleExportPdf}
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
