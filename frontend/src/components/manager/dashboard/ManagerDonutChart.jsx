import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#7B2FF2", "#17EAD9"];

const ManagerDonutChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full h-[240px] flex flex-col items-center justify-center">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Employee Composition</h3>
    <ResponsiveContainer width="90%" height="90%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={40}
          outerRadius={65}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          stroke="white"
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-xs text-gray-400 mt-1">{data.reduce((acc, cur) => acc + cur.value, 0)} employee total</div>
  </div>
);

export default ManagerDonutChart;
