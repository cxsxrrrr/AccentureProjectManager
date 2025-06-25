import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";


// Mocks de empleados
const mockEmployees = [
  {
    id: 1,
    name: "Cesar Moran",
    gender: "Male",
    birthDate: "5/19/25",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Claudio Martins",
    gender: "Male",
    birthDate: "5/19/25",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    category: "Developer",
    skills: ["Java Script", "React", "Python"],
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Valentina Moran",
    gender: "Female",
    birthDate: "5/19/25",
    email: "JustinLipshutz@gmail.com",
    phone: "+1 (555) 234-5678",
    category: "Developer",
    skills: ["Java Script", "React"],
    role: "Customer",
    status: "Disabled",
  },
  // ...más empleados
];

// Opciones de filtro
const roles = ["All", "Admin", "Manager", "Customer"];
const statuses = ["All", "Active", "Disabled"];
const genders = ["All", "Male", "Female"];
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
    return (
      (role === "All" || emp.role === role) &&
      (status === "All" || emp.status === status) &&
      (gender === "All" || emp.gender === gender) &&
      (category === "All" || emp.category === category) &&
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

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
              <th className="px-6 py-4 text-left text-gray-500 font-bold">CATEGORY & SKILL</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">ROLE</th>
              <th className="px-6 py-4 text-left text-gray-500 font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr
                key={emp.id}
                className={`transition ${i % 2 ? "bg-gray-50" : ""}`}
              >
                <td className="py-5 px-6 font-bold flex flex-col gap-2 text-base">
                  <span className="flex items-center gap-3 text-lg">
                    {emp.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {emp.gender} • {emp.birthDate}
                  </span>
                </td>
                <td className="py-5 px-6 text-base">
                  <span className="flex items-center gap-2 text-base">
                    {emp.email}
                  </span>
                  <span className="flex items-center gap-2 text-base">
                    {emp.phone}
                  </span>
                </td>
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
                <td className="py-5 px-6">
                  <span
                    className={`px-4 py-2 rounded-full font-bold text-base ${
                      emp.role === "Admin"
                        ? "bg-purple-100 text-purple-600"
                        : emp.role === "Manager"
                        ? "bg-purple-100 text-purple-500"
                        : "bg-purple-50 text-purple-400"
                    }`}
                  >
                    {emp.role}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <span
                    className={`px-4 py-2 rounded-full font-bold text-base ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-400 text-lg"
                >
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
