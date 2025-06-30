import React from "react";

const ManagerProjectStatusTable = ({ projects }) => (
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
            <th className="text-center px-2 pb-2">Priority</th>
            <th className="text-center px-2 pb-2">Estimated Start</th>
            <th className="text-center px-2 pb-2">Estimated End</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, i) => (
            <tr key={i} className="border-t">
              <td className="px-2 py-2 font-medium">{proj.nombre}</td>
              <td className="px-2 py-2">{proj.descripcion}</td>
              <td className="px-2 py-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold
                    ${
                      proj.estado === "Completed"
                        ? "bg-green-100 text-green-700"
                        : proj.estado === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : proj.estado === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {proj.estado}
                </span>
              </td>
              <td className="px-2 py-2 text-center">
                <span
                  className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${
                    proj.prioridad === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : proj.prioridad === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : proj.prioridad === "LOW"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
                >
                  {proj.prioridad}
                </span>
              </td>
              <td className="px-2 py-2 text-center">
                {proj.fechaInicioEstimada}
              </td>
              <td className="px-2 py-2 text-center">{proj.fechaFinEstimada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ManagerProjectStatusTable;