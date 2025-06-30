import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import StatCard from "../../components/dashboard/StatCard";
import EmployeeStatusTable from "../../components/dashboard/EmployeeStatusTable";
import EmployeeDonutChart from "../../components/dashboard/EmployeeDonutChart";
import ProjectStatusTable from "../../components/dashboard/ProjectStatusTable";
import "../../stylesheets/page.css";
import api from "../../services/axios"; // Ajusta el path si difiere

function Dashboard() {
  // Estados
  const [stats, setStats] = useState([
    { label: "Total Employees", value: 0, subtitle: "Employee" },
    { label: "Resigned Employees", value: 0, subtitle: "Employee" },
  ]);
  const [employees, setEmployees] = useState([]);
  const [employeeComposition, setEmployeeComposition] = useState({ men: 0, women: 0, total: 0 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuarios
    api.get("/usuario")
      .then(res => {
        // Adaptar si res.data es un array de usuarios
        const users = Array.isArray(res.data) ? res.data : [];
        setEmployees(
          users.map(u => ({
            name: u.nombre + (u.apellido ? ` ${u.apellido}` : ""),
            category: u.categoria?.nombre || "-",
            age: calcularEdad(u.fechaNacimiento),
            status: estadoLegible(u.estado),
          }))
        );

        // StatCard
        setStats([
          { label: "Total Employees", value: users.length, subtitle: "Employee" },
          { label: "Resigned Employees", value: users.filter(u => (u.estado || "").toLowerCase() !== "activo").length, subtitle: "Employee" },
        ]);

        // Composición hombres/mujeres
        const men = users.filter(u => (u.genero || "").toLowerCase() === "m").length;
        const women = users.filter(u => (u.genero || "").toLowerCase() === "f").length;
        setEmployeeComposition({ men, women, total: users.length });

        setLoading(false);
      })
      .catch(() => {
        setEmployees([]);
        setStats([
          { label: "Total Employees", value: 0, subtitle: "Employee" },
          { label: "Resigned Employees", value: 0, subtitle: "Employee" },
        ]);
        setEmployeeComposition({ men: 0, women: 0, total: 0 });
        setLoading(false);
      });

    // Cargar proyectos
    api.get("/proyectos")
      .then(res => {
        // Adaptar si res.data es un array de proyectos
        const projs = Array.isArray(res.data) ? res.data : [];
        setProjects(
          projs.map(p => ({
            task: p.nombreProyecto,
            category: p.categoria?.nombre || "-",
            status: estadoLegible(p.estado),
          }))
        );
      })
      .catch(() => setProjects([]));
  }, []);

  /** Funciones auxiliares **/
  // Edad desde fecha de nacimiento (formato ISO)
  function calcularEdad(fechaIso) {
    if (!fechaIso) return "-";
    const nacimiento = new Date(fechaIso);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  // Traducción del estado si hace falta
  function estadoLegible(e) {
    if (!e) return "-";
    const s = e.toLowerCase();
    if (["activo", "active"].includes(s)) return "Active";
    if (["inactivo", "inactive", "baja", "resigned"].includes(s)) return "Inactive";
    return e;
  }

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
            <EmployeeStatusTable data={employees} loading={loading} />
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-6">
            <StatCard {...stats[1]} />
            <EmployeeDonutChart data={employeeComposition} loading={loading} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ProjectStatusTable data={projects} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;