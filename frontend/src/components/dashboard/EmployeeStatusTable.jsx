// src/components/admin/dashboard/EmployeeStatusTable.jsx
import React from "react";

const EmployeeStatusTable = ({ data }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-lg">Employee Status</h3>
    </div>
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="text-left">Employee Name</th>
          <th className="text-left">Department</th>
          <th className="text-left">Age</th>
          <th className="text-left">Discipline</th>
          <th className="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => (
          <tr key={i} className="border-t">
            <td>{e.name}</td>
            <td>{e.dept}</td>
            <td>{e.age}</td>
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

export default EmployeeStatusTable;
