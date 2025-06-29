import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import StatCard from "../../components/dashboard/StatCard";
import EmployeeStatusTable from "../../components/dashboard/EmployeeStatusTable";
import EmployeeDonutChart from "../../components/dashboard/EmployeeDonutChart";
import ProjectStatusTable from "../../components/dashboard/ProjectStatusTable";
import "../../stylesheets/page.css";

function Dashboard() {
  // Cards de estadísticas
  const [stats] = useState([
    {
      label: "Total Employees",
      value: 856,
      subtitle: "Employee",
    },
    {
      label: "Resigned Employees",
      value: 17,
      subtitle: "Employee",
    },
  ]);

  // Mock de empleados
  const employees = [
    {
      name: "Justin Lipshutz",
      category: "Marketing",
      age: 22,
      status: "Active",
    },
    {
      name: "Marcus Culhane",
      category: "Finance",
      age: 24,
      status: "Inactive",
    },
    {
      name: "Leo Stanton",
      category: "R&D",
      age: 28,
      status: "Active",
    },
  ];

  // Composición empleados
  const employeeComposition = { men: 3, women: 1, total: 4 };

  // Mock de proyectos para la tabla de abajo
  const projects = [
    { task: "Data Analysis", category: "IT", status: "Active" },
    { task: "DBB Scheming", category: "IT", status: "Inactive" },
    { task: "Code Testing", category: "R&D", status: "Active" },
  ];

  return (
    <div className="admin-page">
      <Topbar title="Dashboard">
        <TopControls module="dashboard" />
      </Topbar>
      <div className="admin-content dashboard-content p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            <StatCard {...stats[0]} />
            <EmployeeStatusTable data={employees} />
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-6">
            <StatCard {...stats[1]} />
            <EmployeeDonutChart data={employeeComposition} />
          </div>
        </div>
        {/* Tabla de proyectos */}
      </div>
        <div className="mt-8">
          <ProjectStatusTable data={projects} />
        </div>
    </div>
  );
}

export default Dashboard;
