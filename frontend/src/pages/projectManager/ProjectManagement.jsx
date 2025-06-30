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

  // Clientes obtenidos del backend
  const [clients, setClients] = useState([]);
  // const managers = [
  //   { id: 1, name: "Luis Pérez" },
  //   { id: 2, name: "Carla Smith" },
  // ];

  // Cargar proyectos reales desde backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/proyectos");
      // Mapeamos los datos de backend a las columnas de la tabla:
      const mapped = res.data.map((p) => ({
        id: p.id || p.proyectoId, // p.id si tu backend devuelve así, sino ajusta el campo
        title: p.nombreProyecto,
        description: p.descripcionProyecto,
        category: p.categoriaProyecto?.nombre || p.categoria || "",
        client:
          clients.find((c) => c.id === p.cliente?.usuarioId)?.name ||
          p.cliente?.nombre ||
          "",
        // manager: omitido, ya que el manager es el usuario logueado
        startDate: p.fechaInicio,
        endDate: p.fechaFin,
        status: p.estado || "Active",
      }));
      setProjects(mapped);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // Obtener clientes del backend
    const fetchClients = async () => {
      try {
        const res = await api.get("/usuario");
        const users = Array.isArray(res.data) ? res.data : [res.data];
        // Filtrar solo usuarios cuyo rol sea "client" (case-insensitive)
        const clientUsers = users.filter(u => u.rol?.nombre?.toLowerCase() === "client");
        setClients(clientUsers.map(u => ({
          id: u.usuarioId || u.id,
          name: u.nombre + (u.apellido ? (" " + u.apellido) : ""),
          email: u.email
        })));
      } catch {
        setClients([]);
      }
    };
    fetchClients();
    // eslint-disable-next-line
  }, []);

  // Crear nuevo proyecto
  const handleSaveNew = () => {
    fetchProjects();
    setModalNew(false);
  };

  // Guardar cambios en un proyecto existente
  const handleSaveUpdate = () => {
    fetchProjects();
    setModalUpdate(false);
    setSelected(null);
  };

  // Handlers para mostrar modales
  const handleCreate = () => setModalNew(true);
  const handleUpdate = () => setModalUpdate(true);
  const handleRowSelect = (proj) => setSelected(proj);

  return (
    <div className="admin-page">
      <Topbar title="Project Management">
        <TopControls
          module="project"
          onCreate={handleCreate}
          onUpdate={selected ? handleUpdate : null}
        />
      </Topbar>
      <div className="admin-content">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-xl border-separate border-spacing-y-2 mt-4 min-w-[1000px]">
            <thead>
              <tr>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">DESCRIPTION</th>
                {/* <th className="px-6 py-3">CATEGORY</th> */}
                <th className="px-6 py-3">CLIENT</th>
                <th className="px-6 py-3">START DATE</th>
                <th className="px-6 py-3">END DATE</th>
                <th className="px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((proj, idx) => (
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
                    <td className="py-4 px-6 text-gray-700">{proj.description}</td>
                    {/* <td className="py-4 px-6 text-gray-700">{proj.category}</td> */}
                    <td className="py-4 px-6 text-gray-700">{proj.client}</td>
                    <td className="py-4 px-6 text-gray-700">{proj.startDate}</td>
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