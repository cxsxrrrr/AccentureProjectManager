import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#7B2FF2", "#17EAD9", "#FFB830", "#EA4C89", "#B266FF", "#17EAD9", "#FFE156"];

const CategoryDonutChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full h-[320px] flex flex-col items-center justify-center">
    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Most Used Categories</h3>
    <ResponsiveContainer width="99%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={2}
          label={false}
          labelLine={false}
          stroke="white"
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v, name, props) => [`${v}`, props.payload.name]}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{
            marginTop: 20,
            fontSize: 14,
            display: "flex",
            justifyContent: "center"
          }}
        />
      </PieChart>
    </ResponsiveContainer>
    <div className="text-xs text-gray-400 mt-3 text-center">
      {data.reduce((acc, cur) => acc + cur.value, 0)} total categories
    </div>
  </div>
);

export default CategoryDonutChart;
