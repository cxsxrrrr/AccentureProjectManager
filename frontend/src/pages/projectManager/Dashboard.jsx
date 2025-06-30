import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { getProjects } from "../../services/projectService";
import { getCategories } from "../../services/categoryService";
import ManagerStatCard from "../../components/manager/dashboard/ManagerStatCard";
import ManagerBarChart from "../../components/manager/dashboard/ManagerBarChart";
import ManagerDonutChart from "../../components/manager/dashboard/ManagerDonutChart";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import ManagerProjectStatusTable from "../../components/manager/dashboard/ManagerProjectStatusTable";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getProjects(),
      getCategories()
    ])
      .then(([usersRes, projectsRes, categoriesRes]) => {
        setUsers(usersRes.data || []);
        setProjects(projectsRes.data || []);
        setCategories(categoriesRes.data || []);
      })
      .catch((err) => {
        setUsers([]);
        setProjects([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // KPIs
  const totalEmployees = users.length;
  // Adaptación: filtro robusto para activos/inactivos
  const activeEmployees = users.filter(
    u =>
      (typeof u.estado === "string" && u.estado.trim().toUpperCase() === "ACTIVO") ||
      u.active === true
  ).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  // Bar chart: Example - projects per month (customize as needed)
  
  // Bar chart: Example - projects per month (customize as needed)
  // const barData = (() => {
  //   // Group projects by month (assuming fechaInicioEstimada is ISO string)
  //   const months = [
  //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  //   ];
  //   const data = {};
  //   projects.forEach(proj => {
  //     if (!proj.fechaInicioEstimada) return;
  //     const date = new Date(proj.fechaInicioEstimada);
  //     const month = months[date.getMonth()];
  //     if (!data[month]) data[month] = { month, JobView: 0, JobApplied: 0 };
  //     data[month].JobView += 1;
  //     // Example: count applied jobs if you have that info
  //     // data[month].JobApplied += proj.appliedCount || 0;
  //   });
  //   // For demo, JobApplied is random or same as JobView
  //   Object.values(data).forEach(d => d.JobApplied = Math.floor(d.JobView * 0.7));
  //   return Object.values(data);
  // })();

  // Donut chart: Most used categories (by number of projects)
  const donutData = categories.map(cat => ({
    name: cat.nombre || cat.name,
    value: projects.filter(p => p.categoria?.nombre === cat.nombre || p.categoria?.name === cat.name).length
  })).filter(d => d.value > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-lg text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-lg text-gray-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="">
      <Topbar title="Dashboard">
        <TopControls module="dashboard" />
      </Topbar>
      <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ManagerStatCard label="Total Employees" value={totalEmployees} unit="Employee(s)" />
          <ManagerStatCard label="Active Employees" value={activeEmployees} unit="Active(s)" />
          <ManagerStatCard label="Inactive Employees" value={inactiveEmployees} unit="Inactive(s)" />
        </div>
        {/* Main Cards */}
        <div className="bg-white rounded-3xl shadow-md p-4 md:p-8 flex flex-col gap-8">
          {/* <ManagerBarChart data={barData} /> */}
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