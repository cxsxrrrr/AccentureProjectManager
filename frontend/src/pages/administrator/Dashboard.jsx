import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import StatCard from "../../components/dashboard/StatCard";
import EmployeeStatusTable from "../../components/dashboard/EmployeeStatusTable";
import EmployeeDonutChart from "../../components/dashboard/EmployeeDonutChart";
import "../../stylesheets/page.css";

function Dashboard() {
  // Mocks
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

  const employeeComposition = { men: 65, women: 35, total: 856 };

  return (
    <div className="admin-page">
      <Topbar title="Dashboard">
        <TopControls module="dashboard" />
      </Topbar>
      <div className="admin-content dashboard-content p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Fila 1 */}
          <div className="flex flex-col gap-6">
            <StatCard
              label="Total Employees"
              value={856}
              diff="+10.0%"
              trend="up"
              subtitle="Employee"
              // ...otros props
            />
            <EmployeeStatusTable data={employees} />
          </div>
          <div className="flex flex-col gap-6">
            <StatCard
              label="Resigned Employees"
              value={17}
              diff="-7.0%"
              trend="down"
              subtitle="Employee"
              // ...otros props
            />
            <EmployeeDonutChart data={employeeComposition} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
