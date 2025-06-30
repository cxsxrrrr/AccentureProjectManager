import React, { useEffect, useState } from "react";
import { getProjects } from "../../../services/projectService";

// Utilidad para traducir y colorear el estado
function getStatusLabelAndClass(estado) {
  const normalized = (estado || "").toLowerCase();
  switch (normalized) {
    case "activo":
    case "active":
      return { label: "Active", className: "bg-green-100 text-green-700" };
    case "inactivo":
    case "inactive":
      return { label: "Inactive", className: "bg-red-100 text-red-600" };
    case "en progreso":
    case "in progress":
      return { label: "In Progress", className: "bg-yellow-100 text-yellow-700" };
    case "completado":
    case "completed":
      return { label: "Completed", className: "bg-blue-100 text-blue-700" };
    case "cancelado":
    case "cancelled":
      return { label: "Cancelled", className: "bg-gray-200 text-gray-700" };
    default:
      return { label: estado, className: "bg-gray-100 text-gray-700" };
  }
}

const ManagerProjectStatusTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects()
      .then(res => {
        setProjects(res.data || []);
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full overflow-x-auto max-h-[400px]">
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Project Status
      </h3>
      <div className="w-full overflow-x-auto">
        <table className="min-w-[400px] w-full text-sm">
          <thead>
            <tr>
              <th className="text-left px-2 pb-2">Project Name</th>
              <th className="text-left px-2 pb-2">Description</th>
              <th className="text-center px-2 pb-2">Status</th>
              <th className="text-center px-2 pb-2">Estimated Start</th>
              <th className="text-center px-2 pb-2">Estimated End</th>
              <th className="text-center px-2 pb-2">Real End</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No project data available
                </td>
              </tr>
            ) : (
              projects.map((proj, i) => {
                const { label: statusLabel, className: statusClass } = getStatusLabelAndClass(proj.estado);
                return (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-2 font-medium">
                      {proj.nombreProyecto || "-"}
                    </td>
                    <td className="px-2 py-2">
                      {proj.descripcionProyecto || "-"}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {proj.fechaInicio || "-"}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {proj.fechaFin || "-"}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {proj.fechaFinReal || "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerProjectStatusTable;