import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#7B2FF2", "#17EAD9", "#FFB830", "#EA4C89", "#B266FF", "#17EAD9", "#FFE156"];

const CategoryDonutChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full min-h-[370px] flex flex-col items-center justify-between">
    <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Categories</h3>
    <div className="flex flex-col items-center w-full" style={{flex: 1}}>
      <ResponsiveContainer width="100%" height={200}>
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
        </PieChart>
      </ResponsiveContainer>
      <div className="w-full flex justify-center mt-4">
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          wrapperStyle={{
            fontSize: 14,
            maxHeight: 160,
            overflowY: "auto",
            marginLeft: 16
          }}
        />
      </div>
    </div>
    <div className="text-xs text-gray-400 mt-4 text-center">
      {data.reduce((acc, cur) => acc + cur.value, 0)} total categories
    </div>
  </div>
);

export default CategoryDonutChart;
