// src/components/admin/dashboard/ProjectStatusTable.jsx
import React from "react";

const ProjectStatusTable = ({ data }) => (
  <div className="bg-white rounded-2xl shadow p-6 mt-0">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-lg">Project Status</h3>
      <button className="text-xs text-purple-700 font-semibold flex items-center gap-1">
        <span className="material-icons text-base">filter_alt</span>
        Filter & Short
      </button>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left">Task Name</th>
          <th className="text-left">Department</th>
          <th className="text-left">Discipline</th>
          <th className="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => (
          <tr key={i} className="border-t">
            <td>{e.task}</td>
            <td>{e.dept}</td>
            <td className={e.discipline.startsWith('-') ? "text-red-500" : "text-green-600"}>{e.discipline}</td>
            <td>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${e.status === "Permanent" ? "bg-green-100 text-green-700" :
                  e.status === "Contract" ? "bg-gray-200 text-gray-800" :
                    "bg-yellow-100 text-yellow-600"}`}>
                {e.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectStatusTable;
