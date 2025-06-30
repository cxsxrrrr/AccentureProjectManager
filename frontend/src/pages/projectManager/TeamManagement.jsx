import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";
import UnassignProjectModal from "../../components/manager/modals/Teams/UnassignProjectModal";
import AssignProjectModal from "../../components/manager/modals/Teams/AssignProjectModal";
import api from "../../services/axios";

const getUserCategory = async (userId) => {
  try {
    const res = await api.get(`/category/user/${userId}`);
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0].nombre || "No category";
    } else if (res.data && (res.data.nombre || res.data.name)) {
      return res.data.nombre || res.data.name;
    }
    return "No category";
  } catch {
    return "No category";
  }
};

const getUserSkills = async (userId) => {
  try {
    const res = await api.get(`/skills/usuario/${userId}`);
    if (Array.isArray(res.data)) {
      return res.data
        .map((skill) =>
          skill.nombre || skill.name || skill.skillName || skill.habilidad || skill
        )
        .filter(Boolean);
    }
    return [];
  } catch {
    return [];
  }
};

const getMemberKey = (member) => String(member.id ?? member.usuarioId);

function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [showUnassign, setShowUnassign] = useState(false);
  const [categoriaFilter, setCategoriaFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar usuarios
        const resUsers = await api.get("/usuario");
        const users = Array.isArray(resUsers.data) ? resUsers.data : [];

        // Filtrar solo rolId 3 (Team members)
        const filteredUsers = users.filter((u) => u.rol?.rolId === 3);

        // Cargar categorías y skills por usuario en paralelo
        const usersWithDetails = await Promise.all(
          filteredUsers.map(async (user) => {
            const id = user.usuarioId || user.id;
            const category = await getUserCategory(id);
            const skills = await getUserSkills(id);

            return {
              ...user,
              categoria: category,
              habilidades: skills,
              estado: user.estado || "Inactivo",
            };
          })
        );

        setTeam(usersWithDetails);
      } catch {
        setTeam([]);
      }

      try {
        const resCategories = await api.get("/category");
        setCategorias(resCategories.data || []);
      } catch {
        setCategorias([]);
      }

      try {
        const resProjects = await api.get("/proyectos");
        setProyectos(resProjects.data || []);
      } catch {
        setProyectos([]);
      }

      try {
        const resSkills = await api.get("/skills");
        const allSkillNames = (resSkills.data || []).map((s) => s.nombre);
        setAllSkills(allSkillNames);
      } catch {
        setAllSkills([]);
      }
    };

    loadData();
  }, []);

  const filteredTeam = team.filter((member) => {
    const matchSearch =
      !search || (member.cedula && String(member.cedula).includes(search));
    const matchCategoria = !categoriaFilter || member.categoria === categoriaFilter;
    const matchSkill = !skillFilter || member.habilidades.includes(skillFilter);
    const matchProject =
      !projectFilter || (member.proyecto && member.proyecto.nombreProyecto === projectFilter);

    return matchSearch && matchCategoria && matchSkill && matchProject;
  });

  const selectedUser = team.find((u) => getMemberKey(u) === selectedId);

  const handleAssign = () => {
    if (selectedUser) setShowAssign(true);
  };
  const handleUnassign = () => {
    if (selectedUser && selectedUser.proyecto) {
      setShowUnassign(true);
    }
  };

  const reloadTeam = async () => {
    try {
      const resUsers = await api.get("/usuario");
      const users = Array.isArray(resUsers.data) ? resUsers.data : [];
      const filteredUsers = users.filter((u) => u.rol?.rolId === 3);

      const usersWithDetails = await Promise.all(
        filteredUsers.map(async (user) => {
          const id = user.usuarioId || user.id;
          const category = await getUserCategory(id);
          const skills = await getUserSkills(id);

          return {
            ...user,
            categoria: category,
            habilidades: skills,
            estado: user.estado || "Inactivo",
          };
        })
      );

      setTeam(usersWithDetails);
    } catch {
      setTeam([]);
    }
  };

  const handleAssignProject = async () => {
    await reloadTeam();
    setShowAssign(false);
  };
  const handleUnassignProject = async () => {
    await reloadTeam();
    setShowUnassign(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Team Management">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex gap-2 md:gap-3">
            <TopControls
              module="team"
              onAssign={selectedUser ? handleAssign : undefined}
              onUnassign={selectedUser && selectedUser.proyecto ? handleUnassign : undefined}
            />
          </div>
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

      <div className="admin-content flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-1 overflow-y-auto overflow-x-auto">
          <table className="min-w-full w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  ID DOCUMENT
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  ROLE
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  SKILLS
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  PROJECT
                </th>
                <th className="px-6 py-4 text-left text-gray-500 font-bold uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map((member) => (
                <tr
                  key={getMemberKey(member)}
                  onClick={() => setSelectedId(getMemberKey(member))}
                  className={`cursor-pointer transition ${
                    selectedId === getMemberKey(member)
                      ? "bg-purple-100 ring-2 ring-purple-200"
                      : ""
                  } hover:bg-purple-50`}
                >
                  <td className="py-5 px-6 font-semibold text-gray-800 whitespace-nowrap">
                    {member.nombre} {member.apellido}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {member.cedula}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {member.email}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {member.rol?.nombre}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {member.categoria || "No category"}
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {member.habilidades && member.habilidades.length > 0 ? (
                        member.habilidades.map((skill, idx) => (
                          <span
                            key={`${getMemberKey(member)}-${skill}-${idx}`}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No skills</span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-gray-700 whitespace-nowrap">
                    {member.proyecto?.nombreProyecto || "Unassigned"}
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-xs ${
                        member.estado === "Activo"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {member.estado === "Activo" ? "Active" : "Inactive"}
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
