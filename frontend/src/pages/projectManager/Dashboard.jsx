import React from "react";
import ManagerStatCard from "../../components/manager/dashboard/ManagerStatCard";
import ManagerBarChart from "../../components/manager/dashboard/ManagerBarChart";
import ManagerDonutChart from "../../components/manager/dashboard/ManagerDonutChart";
import ManagerEmployeeStatusTable from "../../components/manager/dashboard/ManagerEmployeeStatusTable";

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
  { name: "Activo", value: 2 },
  { name: "Inactivo", value: 1 }
];

const employees = [
  {
    nombre: "Samuel",
    apellido: "Rodríguez",
    numeroTelefono: "0414-1234567",
    cedula: 29412345,
    genero: "M",
    fechaNacimiento: "2004-01-21T00:00:00",
    email: "samuel@acc.com",
    password: "noimporta",
    estado: "Activo",
    fechaCreacion: "2024-04-20T09:00:00",
    ultimoAcceso: "2025-06-26T10:00:00",
    rol: { rolId: 1, nombre: "Gerente" },
    department: "TI",
    age: 20,
    discipline: "Frontend",
    avatar: "/avatars/samuel.png"
  },
  {
    nombre: "Valentina",
    apellido: "Morán",
    numeroTelefono: "0412-9876543",
    cedula: 30765432,
    genero: "F",
    fechaNacimiento: "2002-06-12T00:00:00",
    email: "valen@acc.com",
    password: "noimporta",
    estado: "Activo",
    fechaCreacion: "2024-03-15T11:00:00",
    ultimoAcceso: "2025-06-25T18:10:00",
    rol: { rolId: 2, nombre: "Desarrollador" },
    department: "Diseño",
    age: 22,
    discipline: "UI/UX",
    avatar: "/avatars/valentina.png"
  },
  {
    nombre: "Luis",
    apellido: "Solarte",
    numeroTelefono: "0416-5555555",
    cedula: 30888888,
    genero: "M",
    fechaNacimiento: "1999-10-11T00:00:00",
    email: "luis@acc.com",
    password: "noimporta",
    estado: "Inactivo",
    fechaCreacion: "2024-02-01T13:00:00",
    ultimoAcceso: "2025-04-10T17:00:00",
    rol: { rolId: 3, nombre: "QA" },
    department: "QA",
    age: 23,
    discipline: "Testing",
    avatar: "/avatars/luis.png"
  }
];

function Dashboard() {
  return (
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
            <ManagerEmployeeStatusTable employees={employees} />
          </div>
          <div>
            <ManagerDonutChart data={donutData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
