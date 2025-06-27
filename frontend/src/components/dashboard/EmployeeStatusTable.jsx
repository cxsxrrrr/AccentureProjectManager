// src/components/admin/dashboard/EmployeeStatusTable.jsx
import React from "react";

const EmployeeStatusTable = ({ data }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-lg">Employee Status</h3>
    </div>
    <table className="w-full border-separate border-spacing-y-3">
      <thead>
        <tr>
          <th className="px-6">Employee Name</th>
          <th className="px-6">Department</th>
          <th className="px-6">Age</th>
          <th className="px-6">Discipline</th>
          <th className="px-6">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => (
          <tr key={i}>
            <td className="py-3">{e.name}</td>
            <td className="py-3">{e.dept}</td>
            <td className="py-3">{e.age}</td>
            <td
              className={`py-3 ${
                e.discipline.startsWith("-") ? "text-red-500" : "text-green-600"
              }`}
            >
              {e.discipline}
            </td>
                        <td className="px-6 py-4">
              <span className={`px-4 py-2 rounded-full text-base font-bold
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
