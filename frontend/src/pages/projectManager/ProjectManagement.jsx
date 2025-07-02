import React, { useEffect, useState } from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import NewProjectModal from "../../components/manager/modals/Projects/NewProjectModal";
import UpdateProjectModal from "../../components/manager/modals/Projects/UpdateProjectModal";
import api from "../../services/axios"; // Ajusta este import según tu ruta

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalNew, setModalNew] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Clientes y categorías obtenidos del backend
  const [clients, setClients] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Filtros y búsqueda
  const [search, setSearch] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");

  // Cargar categorías reales desde backend
  const fetchCategorias = async () => {
    try {
      const res = await api.get("/category");
      setCategorias(res.data || []);
    } catch {
      setCategorias([]);
    }
  };

  // Cargar proyectos reales desde backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/proyectos");
      const proyectos = res.data;

      // Para cada proyecto, busca su categoría asociada
      const proyectosConCategoria = await Promise.all(
        proyectos.map(async (p) => {
          let categoriaNombre = "";
          let categoriaId = "";
          try {
            const catRes = await api.get(
              `/proyectos-categorias/por-proyecto/${p.proyectoId}`
            );
            if (Array.isArray(catRes.data) && catRes.data.length > 0) {
              categoriaNombre = catRes.data[0].categoria?.nombre || "";
              categoriaId = catRes.data[0].categoria?.categoriaId || "";
            }
          } catch {
            categoriaNombre = "";
            categoriaId = "";
          }
          return {
            id: p.id || p.proyectoId,
            title: p.nombreProyecto,
            description: p.descripcionProyecto,
            category: categoriaNombre,
            categoryId: categoriaId,
            client:
              clients.find((c) => c.id === p.cliente?.usuarioId)?.name ||
              p.cliente?.nombre ||
              "",
            startDate: p.fechaInicio,
            endDate: p.fechaFin,
            status: p.estado || "Active",
          };
        })
      );
      setProjects(proyectosConCategoria);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes y categorías al montar
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/usuario");
        const users = Array.isArray(res.data) ? res.data : [res.data];
        const clientUsers = users.filter(
          (u) => u.rol?.nombre?.toLowerCase() === "client"
        );
        setClients(
          clientUsers.map((u) => ({
            id: u.usuarioId || u.id,
            name: u.nombre + (u.apellido ? " " + u.apellido : ""),
            email: u.email,
          }))
        );
      } catch {
        setClients([]);
      }
    };
    fetchClients();
    fetchCategorias();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, [categorias, clients]);

  // Crear nuevo proyecto
  const handleSaveNew = () => {
    fetchCategorias();
    fetchProjects();
    setModalNew(false);
  };

  const handleSaveUpdate = () => {
    fetchProjects();
    setModalUpdate(false);
    setSelected(null);
  };

  const handleCreate = () => setModalNew(true);
  const handleUpdate = () => setModalUpdate(true);
  const handleRowSelect = (proj) => setSelected(proj);

  // Filtrado y búsqueda
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesCategoria =
      !filterCategoria || String(proj.categoryId) === String(filterCategoria);
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="admin-page">
      <Topbar title="Project Management">
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
          <TopControls
            module="project"
            onCreate={handleCreate}
            onUpdate={selected ? handleUpdate : null}
          />
          {/* Search y filtro de categoría */}
          <div className="flex gap-2 items-center ml-auto">
            <input
              type="text"
              placeholder="Search by project name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 transition w-[200px]"
            />
            <select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 transition w-[180px]"
            >
              <option value="">All categories</option>
              {categorias.map((cat) => (
                <option key={cat.categoriaId} value={cat.categoriaId}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Topbar>
      <div className="admin-content">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4 min-w-[1100px]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">NAME</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">DESCRIPTION</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">CATEGORY</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">CLIENT</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">START DATE</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">END DATE</th>
                <th className="px-6 py-3 text-gray-500 font-bold uppercase tracking-wider w-1/5">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj, idx) => (
                  <tr
                    key={proj.id}
                    onClick={() => handleRowSelect(proj)}
                    className={`
                      cursor-pointer transition
                      ${
                        selected && selected.id === proj.id
                          ? "bg-purple-100 ring-2 ring-purple-300"
                          : idx % 2 === 1
                          ? "bg-gray-50"
                          : ""
                      }
                      hover:bg-purple-50
                    `}
                  >
                    <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                      <span className="inline-block rounded-full bg-purple-50 p-2 mr-2 align-middle" />
                      {proj.title}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {proj.description}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{proj.category}</td>
                    <td className="py-4 px-6 text-gray-700">{proj.client}</td>
                    <td className="py-4 px-6 text-gray-700">
                      {proj.startDate}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{proj.endDate}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`
                          px-4 py-1 rounded-full font-bold text-xs
                          ${
                            proj.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : proj.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : proj.status === "On Hold"
                              ? "bg-yellow-100 text-yellow-700"
                              : proj.status === "Cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* MODALES */}
        <NewProjectModal
          isOpen={modalNew}
          onClose={() => setModalNew(false)}
          onSave={handleSaveNew}
          clients={clients}
        />
        <UpdateProjectModal
          isOpen={modalUpdate}
          onClose={() => setModalUpdate(false)}
          onSave={handleSaveUpdate}
          initialData={selected}
          clients={clients}
        />
      </div>
    </div>
  );
}

export default ProjectManagement;