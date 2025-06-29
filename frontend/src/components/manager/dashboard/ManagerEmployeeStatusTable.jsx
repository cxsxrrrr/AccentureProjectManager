import React from "react";

const ManagerEmployeeStatusTable = ({ employees }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full overflow-x-auto">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Employee Status</h3>
    <table className="min-w-[400px] w-full text-sm">
      <thead>
        <tr>
          <th className="text-left px-2 pb-2">Employee Name</th>
          <th className="text-left px-2 pb-2">Category</th>
          <th className="text-center px-2 pb-2">Age</th>
          <th className="text-center px-2 pb-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, i) => (
          <tr key={i} className="border-t">
            <td className="px-2 py-2 flex items-center gap-2">
              <span className="font-medium">{emp.nombre} {emp.apellido}</span>
            </td>
            <td className="px-2 py-2">{emp.department}</td>
            <td className="px-2 py-2 text-center">{emp.age}</td>
            <td className="px-2 py-2 text-center">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${emp.status === "Permanent" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {emp.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ManagerEmployeeStatusTable;
