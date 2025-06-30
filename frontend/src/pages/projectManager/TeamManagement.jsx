import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import UnassignProjectModal from "../../components/manager/modals/Teams/UnassignProjectModal";
import AssignProjectModal from "../../components/manager/modals/Teams/AssignProjectModal";
import api from "../../services/axios";

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
    // Cargar miembros del equipo y normalizar category/skills igual que Employees.jsx
    const fetchTeam = async () => {
      try {
        const res = await api.get("/usuario");
        const allowedRoles = [
          "member", "team member", "team", "miembro de equipo", "miembro"
        ];
        const usersRaw = Array.isArray(res.data) ? res.data : [res.data];
        const users = await Promise.all(
          usersRaw
            .filter(u => u.rol && allowedRoles.includes((u.rol.nombre || "").toLowerCase()))
            .map(async (u) => {
              // Obtener categoría (como string)
              let category = "";
              try {
                const catRes = await api.get(`/category/user/${u.usuarioId || u.id}`);

                if (Array.isArray(catRes.data)) {
                  category = catRes.data[0]?.nombre || "";
                } else if (catRes.data && catRes.data.nombre) {
                  category = catRes.data.nombre;
                }
              } catch {}
              // Obtener skills (array de strings)
              let skills = [];
              try {
                const skillsRes = await api.get(`/skills/usuario/${u.usuarioId || u.id}`);
                if (Array.isArray(skillsRes.data)) {
                  skills = skillsRes.data.map(s => s.nombre);
                }
              } catch {}
              // Obtener todos los proyectos asignados
              let proyectosAsignados = [];
              try {
                const projRes = await api.get(`/miembros-proyectos/usuario/${u.usuarioId || u.id}`);
                if (Array.isArray(projRes.data) && projRes.data.length > 0) {
                  proyectosAsignados = projRes.data.map(mp => mp.proyecto).filter(Boolean);
                } else if (projRes.data && projRes.data.proyecto) {
                  proyectosAsignados = [projRes.data.proyecto];
                }
              } catch {}
              return {
                ...u,
                categoria: { nombre: category },
                habilidades: skills,
                proyectosAsignados
              };
            })
        );
        setTeam(users);
      } catch {
        setTeam([]);
      }
    };
    fetchTeam();
    // Cargar categorías
    api.get("/category")
      .then(res => setCategorias(res.data))
      .catch(() => setCategorias([]));
    // Cargar proyectos
    api.get("/proyectos")
      .then(res => setProyectos(res.data))
      .catch(() => setProyectos([]));
    // Cargar todas las skills únicas del sistema
    api.get("/skills")
      .then(res => setAllSkills(res.data.map(h => h.nombre)))
      .catch(() => setAllSkills([]));
  }, []);

  // Filtros y normalización de datos
  const allowedRoles = [
    "member",
    "team member",
    "team",
    "miembro de equipo",
    "miembro"
  ];

  // Normaliza y filtra el equipo para mostrar solo los roles permitidos
  const filteredTeam = team
    .filter((member) => {
      // Normaliza el nombre del rol
      const roleName = (member.rol?.nombre || "").toLowerCase().trim();
      return allowedRoles.includes(roleName);
    })
    .map((member) => ({
      ...member,
      categoria: member.categoria || null,
      habilidades: Array.isArray(member.habilidades)
        ? member.habilidades
        : [],
      proyectosAsignados: Array.isArray(member.proyectosAsignados)
        ? member.proyectosAsignados
        : member.proyecto
        ? [member.proyecto].filter(Boolean)
        : []
    }))
    .filter((member) => {
      // Filtros conectados
      const matchSearch =
        !search ||
        (member.cedula && String(member.cedula).includes(search));
      const matchCategoria =
        !categoriaFilter ||
        (member.categoria && member.categoria.nombre === categoriaFilter);
      const matchSkill =
        !skillFilter ||
        (member.habilidades && member.habilidades.includes(skillFilter));
      // Permitir filtrar por cualquier proyecto asignado
      const matchProject =
        !projectFilter ||
        (Array.isArray(member.proyectosAsignados)
          ? member.proyectosAsignados.some(p => p && p.nombreProyecto === projectFilter)
          : false);
      return matchSearch && matchCategoria && matchSkill && matchProject;
    });

  // Permitir seleccionar tanto por id como por usuarioId
  const selectedUser = team.find((u) => u.id === selectedId || u.usuarioId === selectedId);

  // Asignación y desasignación
  const handleAssign = () => {
    // Solo permitir asignar si el usuario no tiene ningún proyecto asignado
    if (!selectedUser) return;
    if (!Array.isArray(selectedUser.proyectosAsignados) || selectedUser.proyectosAsignados.length === 0) {
      setShowAssign(true);
    } else {
      alert('Este usuario ya tiene un proyecto asignado. Debe desasignarlo antes de asignar uno nuevo.');
    }
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

  // Refrescar lista de usuarios (conectado igual que Employees.jsx)
  const reloadTeam = async () => {
    try {
      const res = await api.get("/usuario");
      const allowedRoles = [
        "member", "team member", "team", "miembro de equipo", "miembro"
      ];
      const usersRaw = Array.isArray(res.data) ? res.data : [res.data];
      const users = await Promise.all(
        usersRaw
          .filter(u => u.rol && allowedRoles.includes((u.rol.nombre || "").toLowerCase()))
          .map(async (u) => {
            let category = "";
            try {
              const catRes = await api.get(`/category/user/${u.usuarioId || u.id}`);
              if (Array.isArray(catRes.data)) {
                category = catRes.data[0]?.nombre || "";
              } else if (catRes.data && catRes.data.nombre) {
                category = catRes.data.nombre;
              }
            } catch {}
            let skills = [];
            try {
              const skillsRes = await api.get(`/skills/usuario/${u.usuarioId || u.id}`);
              if (Array.isArray(skillsRes.data)) {
                skills = skillsRes.data.map(s => s.nombre);
              }
            } catch {}
            // Obtener todos los proyectos asignados
            let proyectosAsignados = [];
            try {
              const projRes = await api.get(`/miembros-proyectos/usuario/${u.usuarioId || u.id}`);
              if (Array.isArray(projRes.data) && projRes.data.length > 0) {
                proyectosAsignados = projRes.data.map(mp => mp.proyecto).filter(Boolean);
              } else if (projRes.data && projRes.data.proyecto) {
                proyectosAsignados = [projRes.data.proyecto];
              }
            } catch {}
            return {
              ...u,
              categoria: { nombre: category },
              habilidades: skills,
              proyectosAsignados
            };
          })
      );
      setTeam(users);
    } catch {
      setTeam([]);
    }
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
              onAssign={
                selectedUser && (!Array.isArray(selectedUser?.proyectosAsignados) || selectedUser.proyectosAsignados.length === 0)
                  ? handleAssign
                  : undefined
              }
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
                {/* <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">ROLE</th> */}
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
                  onClick={() => setSelectedId(member.id || member.usuarioId)}
                  className={`cursor-pointer transition ${
                    selectedId === (member.id || member.usuarioId)
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : ""
                  } hover:bg-purple-50`}
                >
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {member.nombre} {member.apellido}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.cedula}</td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.email}</td>
                  {/* <td className="py-5 px-6 text-gray-700 whitespace-nowrap">{member.rol?.nombre}</td> */}
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
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {Array.isArray(member.proyectosAsignados) && member.proyectosAsignados.length > 0
                      ? member.proyectosAsignados.slice(0, 3).map((p, idx) => (
                          <span key={p.proyectoId || idx} className="inline-block bg-purple-50 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold mr-1 mb-1">
                            {p.nombreProyecto}
                          </span>
                        ))
                      : "Unassigned"}
                  </td>
                  <td className="py-5 px-6">
                    <span className={`
                      px-3 py-1 rounded-full font-bold text-xs
                      ${Array.isArray(member.proyectosAsignados) && member.proyectosAsignados.length > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                      }
                    `}>
                      {Array.isArray(member.proyectosAsignados) && member.proyectosAsignados.length > 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTeam.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
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
        projects={proyectos || []}
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