import React from "react";
import ManagerStatCard from "../../components/manager/dashboard/ManagerStatCard";
import ManagerBarChart from "../../components/manager/dashboard/ManagerBarChart";
import ManagerDonutChart from "../../components/manager/dashboard/ManagerDonutChart";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import ManagerProjectStatusTable from "../../components/manager/dashboard/ManagerProjectStatusTable";

// Mock data basados en tus DTOs reales

const barData = [
  { month: "Ene", JobView: 24, JobApplied: 12 },
  { month: "Feb", JobView: 32, JobApplied: 18 },
  { month: "Mar", JobView: 44, JobApplied: 20 },
  { month: "Abr", JobView: 28, JobApplied: 10 },
  { month: "May", JobView: 36, JobApplied: 14 },
  { month: "Jun", JobView: 29, JobApplied: 8 },
  { month: "Jul", JobView: 40, JobApplied: 16 },
  { month: "Ago", JobView: 77, JobApplied: 33 },
  { month: "Sep", JobView: 55, JobApplied: 29 },
  { month: "Oct", JobView: 61, JobApplied: 30 },
  { month: "Nov", JobView: 49, JobApplied: 18 },
  { month: "Dic", JobView: 59, JobApplied: 26 }
];

const donutData = [
  { name: "Frontend Developer", value: 8 },
  { name: "Backend Developer", value: 5 },
  { name: "Others", value: 2 }
];

// Ahora definimos tus proyectos/tareas mock
const projects = [
  {
    proyectoId: 1,
    nombre: "Implementar login",
    descripcion: "Endpoint y UI de autenticación",
    estado: "Cancelled",
    prioridad: "HIGH",
    fechaInicioEstimada: "2025-07-05",
    fechaFinEstimada: "2025-07-10",
    creadoPorId: 5
  },
  {
    proyectoId: 2,
    nombre: "Diseñar Dashboard",
    descripcion: "Vista principal para KPIs",
    estado: "In Progress",
    prioridad: "MEDIUM",
    fechaInicioEstimada: "2025-07-02",
    fechaFinEstimada: "2025-07-09",
    creadoPorId: 3
  },
  {
    proyectoId: 3,
    nombre: "Integración Backend",
    descripcion: "API con endpoints REST",
    estado: "Completed",
    prioridad: "LOW",
    fechaInicioEstimada: "2025-06-15",
    fechaFinEstimada: "2025-06-30",
    creadoPorId: 2
  }
];

function Dashboard() {
  return (
    <div className="">
      <Topbar title="Dashboard">
        <TopControls module="dashboard" />
      </Topbar>
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ManagerStatCard label="Total Employees" value="3" unit="Employee(s)" trend="0.0%" trendType="up" />
          <ManagerStatCard label="Active Employees" value="2" unit="Active(s)" trend="+1" trendType="up" />
          <ManagerStatCard label="Inactive Employees" value="1" unit="Inactive(s)" trend="0" trendType="down" />
        </div>
        {/* Main Cards */}
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-8 flex flex-col gap-8">
          <ManagerBarChart data={barData} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ManagerProjectStatusTable projects={projects} />
            </div>
            <div>
              <ManagerDonutChart data={donutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
