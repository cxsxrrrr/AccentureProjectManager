import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

// Mocks de empleados (con estructura del body en español)
const mockEmployees = [
  {
    id: 1,
    nombre: "Cesar",
    apellido: "Moran",
    genero: "M",
    fechaNacimiento: "2025-05-19T12:00:00",
    email: "cesar.moran@email.com",
    numeroTelefono: "1234567890",
    cedula: 12345678,
    password: "********",
    estado: "Active",
    fechaCreacion: "2025-05-03T12:00:00",
    ultimoAcceso: "2025-05-03T12:00:00",
    rol: { rolId: 1, nombre: "Admin" },
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
  },
  {
    id: 2,
    nombre: "Claudio",
    apellido: "Martins",
    genero: "M",
    fechaNacimiento: "2025-05-19T12:00:00",
    email: "claudio.martins@email.com",
    numeroTelefono: "1234567899",
    cedula: 87654321,
    password: "********",
    estado: "Active",
    fechaCreacion: "2025-05-04T12:00:00",
    ultimoAcceso: "2025-06-25T12:00:00",
    rol: { rolId: 2, nombre: "Manager" },
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
  },
  {
    id: 3,
    nombre: "Valentina",
    apellido: "Moran",
    genero: "F",
    fechaNacimiento: "2025-02-12T12:00:00",
    email: "valen.moran@email.com",
    numeroTelefono: "0987654321",
    cedula: 54321678,
    password: "********",
    estado: "Inactive",
    fechaCreacion: "2025-04-29T12:00:00",
    ultimoAcceso: "2025-06-10T12:00:00",
    rol: { rolId: 3, nombre: "Customer" },
    category: "Developer",
    skills: ["Java Script", "React"],
  },
  // ...más empleados
];

// Opciones de filtro
const roles = ["All", "Admin", "Manager", "Customer"];
const statuses = ["All", "Active", "Inactive"];
const genders = ["All", "M", "F"];
const categories = ["All", "Developer", "Designer", "Analyst"];

function Employees() {
  const [employees] = useState(mockEmployees);
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [gender, setGender] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Filtrado según los select y el search
  const filtered = employees.filter((emp) => {
    // Para buscar por nombre y apellido (body adaptado)
    const fullName = `${emp.nombre} ${emp.apellido}`.toLowerCase();
    return (
      (role === "All" || (emp.rol && emp.rol.nombre === role)) &&
      (status === "All" || emp.estado === status) &&
      (gender === "All" || emp.genero === gender) &&
      (category === "All" || emp.category === category) &&
      (
        fullName.includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  // Formatea la fecha al estilo YYYY-MM-DD (solo para visual)
  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("en-GB") : "-";

  // Traduce género para UI
  const genderDisplay = (g) =>
    g === "M" ? "Male" : g === "F" ? "Female" : "Other";

  return (
    <div className="admin-page">
      <Topbar title="Employees">
        <TopControls
          module="employees"
          search={search}
          setSearch={setSearch}
          role={role}
          setRole={setRole}
          roles={roles}
          status={status}
          setStatus={setStatus}
          statuses={statuses}
          gender={gender}
          setGender={setGender}
          genders={genders}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </Topbar>
      <div className="admin-content">
        <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">USER</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">CONTACT</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">ID NUMBER</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">GENDER</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">BIRTHDATE</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">CATEGORY & SKILL</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">ROLE</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr key={emp.id} className={`transition ${i % 2 ? "bg-gray-50" : ""}`}>
                {/* USER NAME */}
                <td className="py-5 px-6 font-bold flex flex-col gap-2 text-base">
                  <span className="flex items-center gap-3 text-lg">
                    {emp.nombre} {emp.apellido}
                  </span>
                </td>
                {/* CONTACT */}
                <td className="py-5 px-6 text-base">
                  <span className="flex items-center gap-2 text-base">{emp.email}</span>
                  <span className="flex items-center gap-2 text-base">{emp.numeroTelefono}</span>
                </td>
                {/* ID NUMBER */}
                <td className="py-5 px-6 text-base">{emp.cedula}</td>
                {/* GENDER */}
                <td className="py-5 px-6 text-base">{genderDisplay(emp.genero)}</td>
                {/* BIRTHDATE */}
                <td className="py-5 px-6 text-base">{formatDate(emp.fechaNacimiento)}</td>
                {/* CATEGORY & SKILL */}
                <td className="py-5 px-6 text-base">
                  <div className="font-semibold">{emp.category}</div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {emp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                {/* ROLE */}
                <td className="py-5 px-6">
                  <span
                    className={`px-4 py-2 rounded-full font-bold text-base ${
                      emp.rol?.nombre === "Admin"
                        ? "bg-purple-100 text-purple-600"
                        : emp.rol?.nombre === "Manager"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-50 text-purple-400"
                    }`}
                  >
                    {emp.rol?.nombre}
                  </span>
                </td>
                {/* STATUS */}
                <td className="py-5 px-6">
                  <span
                    className={`px-4 py-2 rounded-full font-bold text-base ${
                      emp.estado === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.estado}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400 text-lg">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
