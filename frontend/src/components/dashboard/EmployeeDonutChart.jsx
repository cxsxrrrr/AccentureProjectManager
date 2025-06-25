// src/components/admin/dashboard/EmployeeDonutChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#7C3AED", "#22D3EE"];

export default function EmployeeDonutChart({ data }) {
  const chartData = [
    { name: "Men", value: data.men },
    { name: "Women", value: data.women },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <h3 className="font-semibold text-lg mb-2">Employee Composition</h3>
      <PieChart width={180} height={180}>
        <Pie
          data={chartData}
          innerRadius={50}
          outerRadius={75}
          paddingAngle={2}
          dataKey="value"
        >
          {chartData.map((entry, idx) => (
            <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" />
      </PieChart>
      <div className="text-2xl text-gray-500 text-center">{data.total} employee total</div>
    </div>
  );
}
