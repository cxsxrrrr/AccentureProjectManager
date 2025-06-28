import React from "react";

const ProjectStatusTable = ({ data = [] }) => (
  <div className="bg-white rounded-2xl shadow p-6 mt-0">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-xl">Project Status</h3>
    </div>
    <table className="w-full text-lg">
      <thead>
        <tr>
          <th className="text-left px-6 py-3 font-semibold">Task Name</th>
          <th className="text-left px-6 py-3 font-semibold">Category</th>
          <th className="text-left px-6 py-3 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((e, i) => (
            <tr key={i} className="border-t">
              <td className="px-6 py-4">{e.task}</td>
              <td className="px-6 py-4">{e.category}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-4 py-2 rounded-full text-base font-bold
                    ${
                      e.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : e.status === "Inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {e.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              No project data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProjectStatusTable;
