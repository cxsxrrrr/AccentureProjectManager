import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import UnassignProjectModal from "../../components/manager/modals/Teams/UnassignProjectModal";
import AssignProjectModal from "../../components/manager/modals/Teams/AssignProjectModal";

const mockCategorias = [
  { nombre: "Desarrollo Web", descripcion: "Proyectos de desarrollo en la web" },
  { nombre: "Infraestructura", descripcion: "Administración de servidores" }
];
const mockProyectos = [
  { proyectoId: 1, nombreProyecto: "PJUTJ", estado: "En progreso" },
  { proyectoId: 2, nombreProyecto: "Inventario 2025", estado: "Planificado" }
];
const allSkills = ["React", "Node.js", "JavaScript", "Linux", "Networking", "Figma", "Photoshop"];
const mockTeam = [
  {
    id: 1,
    nombre: "John",
    apellido: "Doe",
    email: "john@demo.com",
    rol: { rolId: 1, nombre: "Administrador" },
    cedula: 22345678,
    status: "Activo",
    categoria: { nombre: "Desarrollo Web" },
    habilidades: ["React", "Node.js", "JavaScript"],
    proyecto: { proyectoId: 1, nombreProyecto: "PJUTJ" }
  },
  {
    id: 2,
    nombre: "Jane",
    apellido: "Smith",
    email: "jane@demo.com",
    rol: { rolId: 2, nombre: "Analista" },
    cedula: 23345722,
    status: "Activo",
    categoria: { nombre: "Infraestructura" },
    habilidades: ["Linux", "Networking"],
    proyecto: { proyectoId: 2, nombreProyecto: "Inventario 2025" }
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Reyes",
    email: "carlos@demo.com",
    rol: { rolId: 3, nombre: "Diseñador" },
    cedula: 24448888,
    status: "Inactivo",
    categoria: { nombre: "Desarrollo Web" },
    habilidades: ["Figma", "Photoshop"],
    proyecto: null
  },
];

function TeamManagement() {
  const [showAssign, setShowAssign] = useState(false);
  const [showUnassign, setShowUnassign] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState(mockTeam);

  const filteredTeam = team.filter((member) => {
    const matchSearch =
      !search ||
      (member.cedula && String(member.cedula).includes(search));
    const matchCategoria =
      !categoriaFilter ||
      (member.categoria && member.categoria.nombre === categoriaFilter);
    const matchSkill =
      !skillFilter ||
      (member.habilidades && member.habilidades.includes(skillFilter));
    const matchProject =
      !projectFilter ||
      (member.proyecto && member.proyecto.nombreProyecto === projectFilter);

    return matchSearch && matchCategoria && matchSkill && matchProject;
  });

  const selectedUser = team.find((u) => u.id === selectedId);

  const handleAssign = () => {
    if (selectedUser) setShowAssign(true);
  };
  const handleUnassign = () => {
    if (selectedUser && selectedUser.proyecto) {
      setShowUnassign(true);
    }
  };
  const handleAssignProject = (projectName) => {
    setTeam((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              proyecto: mockProyectos.find((p) => p.nombreProyecto === projectName)
            }
          : t
      )
    );
    setShowAssign(false);
  };
  const handleUnassignProject = (user) => {
    setTeam((prev) =>
      prev.map((t) =>
        t.id === user.id ? { ...t, proyecto: null } : t
      )
    );
    setShowUnassign(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Team Management">
        {/* Controls & Filters Row */}
        <div className="w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {/* Purple Buttons */}
          <div className="flex gap-2 md:gap-3">
            <TopControls
              module="team"
              onAssign={selectedUser ? handleAssign : undefined}
              onUnassign={selectedUser && selectedUser.proyecto ? handleUnassign : undefined}
            />
          </div>
          {/* Filters and Search aligned to the right */}
          <div className="flex flex-wrap gap-2 md:gap-3 items-center md:ml-auto">
            <input
              type="text"
              placeholder="Search by ID Document"
              className="border rounded-lg px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value.replace(/\D/, ""))}
              maxLength={12}
            />
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
            >
              <option value="">All categories</option>
              {mockCategorias.map((c) => (
                <option key={c.nombre} value={c.nombre}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              <option value="">All skills</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              className="border rounded-lg px-3 py-2 text-sm"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              <option value="">All projects</option>
              {mockProyectos.map((p) => (
                <option key={p.proyectoId} value={p.nombreProyecto}>
                  {p.nombreProyecto}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Topbar>
      {/* Main Table */}
      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">NAME</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">ID DOCUMENT</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">EMAIL</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">ROLE</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">CATEGORY</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">SKILLS</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">PROJECT</th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map((member, idx) => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedId(member.id)}
                  className={`cursor-pointer transition ${
                    selectedId === member.id
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : idx % 2
                      ? "bg-gray-50"
                      : ""
                  } hover:bg-purple-50`}
                >
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {member.nombre} {member.apellido}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.cedula}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.email}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.rol.nombre}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.categoria?.nombre || "-"}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {member.habilidades?.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.proyecto?.nombreProyecto || "Unassigned"}</td>
                  <td className="py-5 px-6">
                    <span className={`
                      px-3 py-1 rounded-full font-bold text-xs
                      ${member.status === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                      }
                    `}>
                      {member.status === "Activo" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTeam.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AssignProjectModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={handleAssignProject}
        user={selectedUser}
        projects={mockProyectos.map(p => p.nombreProyecto)}
      />
      <UnassignProjectModal
        isOpen={showUnassign}
        onClose={() => setShowUnassign(false)}
        onUnassign={handleUnassignProject}
        user={selectedUser}
      />
    </div>
  );
}

export default TeamManagement;
