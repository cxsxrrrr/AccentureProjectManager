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
      diff: "+10.0%",
      trend: "up",
      subtitle: "Employee",
    },
    {
      label: "Resigned Employees",
      value: 17,
      diff: "-7.0%",
      trend: "down",
      subtitle: "Employee",
      
    },
  ]);

  // Mock de empleados
  const employees = [
    {
      name: "Justin Lipshutz",
      dept: "Marketing",
      age: 22,
      discipline: "100%",
      status: "Permanent",
    },
    {
      name: "Marcus Culhane",
      dept: "Finance",
      age: 24,
      discipline: "95%",
      status: "Contract",
    },
    {
      name: "Leo Stanton",
      dept: "R&D",
      age: 28,
      discipline: "89%",
      status: "Permanent",
    },
  ];

  // Composición empleados
  const employeeComposition = { men: 65, women: 35, total: 856 };

  // Mock de proyectos para la tabla de abajo
  const projects = [
    { task: "Data Analysis", dept: "IT", discipline: "100%", status: "Permanent" },
    { task: "DBB Scheming", dept: "IT", discipline: "-14%", status: "Contract" },
    { task: "Code Testing", dept: "R&D", discipline: "5%", status: "Permanent" },
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
