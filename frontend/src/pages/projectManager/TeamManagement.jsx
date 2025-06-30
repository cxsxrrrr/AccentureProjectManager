import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import UnassignProjectModal from "../../components/manager/modals/Teams/UnassignProjectModal";
import AssignProjectModal from "../../components/manager/modals/Teams/AssignProjectModal";
import api from "../../services/axios"; // Ajusta el path según tu estructura

function TeamManagement() {
  // Estados para datos reales de API
  const [team, setTeam] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  // Estados UI
  const [selectedId, setSelectedId] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [showUnassign, setShowUnassign] = useState(false);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [search, setSearch] = useState("");

  // Cargar datos desde la API al montar
  useEffect(() => {
    // Cargar miembros del equipo
    api.get("/usuario")
      .then(res => {
        if (Array.isArray(res.data)) {
          setTeam(res.data);
        } else {
          setTeam([]);
        }
      })
      .catch(() => setTeam([]));
    // Cargar categorías (o skills si tienes endpoint)
    api.get("/category")
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
    // Cargar proyectos
    api.get("/proyectos")
      .then(res => setProyectos(res.data))
      .catch(() => setProyectos([]));
    // Si tienes endpoint de habilidades, usa GET /habilidades. Si no, extrae desde miembros:
    api.get("/skills")
      .then(res => setAllSkills(res.data.map(h => h.nombre)))
      .catch(() => {
        setAllSkills([]);
      });
  }, []);

  // Filtros
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

  // Asignación y desasignación
  const handleAssign = () => {
    if (selectedUser) setShowAssign(true);
  };
  const handleUnassign = () => {
    if (selectedUser && selectedUser.proyecto) {
      setShowUnassign(true);
    }
  };

  // Al asignar, refresca miembros
  const handleAssignProject = async () => {
    await reloadTeam();
    setShowAssign(false);
  };
  // Al desasignar, refresca miembros
  const handleUnassignProject = async () => {
    await reloadTeam();
    setShowUnassign(false);
  };

  // Refrescar lista de usuarios
  const reloadTeam = async () => {
    try {
      const res = await api.get("/usuario");
      setTeam(res.data);
    } catch { setTeam([]); }
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
          {/* Filters and Search */}
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
              {categorias.map((c) => (
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
              {proyectos.map((p) => (
                <option key={p.proyectoId || p.id} value={p.nombreProyecto}>
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
              {filteredTeam.map((member) => (
                <tr
                  key={member.id || member.usuarioId}
                  onClick={() => setSelectedId(member.id)}
                  className={`cursor-pointer transition ${
                    selectedId === member.id
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : ""
                  } hover:bg-purple-50`}
                >
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {member.nombre} {member.apellido}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.cedula}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.email}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.rol?.nombre}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.categoria?.nombre || "-"}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {member.habilidades?.map((skill) => (
                        <span key={`${member.id || member.usuarioId}-${skill}`} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                          {skill}
                        </span>
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

      {/* Modales de asignar y desasignar */}
      <AssignProjectModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={handleAssignProject}
        user={selectedUser}
        projects={proyectos}
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