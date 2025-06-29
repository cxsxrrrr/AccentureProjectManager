import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ManagerBarChart = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-full h-[270px]">
    <h3 className="text-base font-semibold text-gray-800 mb-3">Accenture Project</h3>
    <ResponsiveContainer width="100%" height="75%">
      <BarChart data={data}>
        <XAxis dataKey="month" fontSize={13}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="JobView" fill="#7B2FF2" radius={[6, 6, 0, 0]} />
        <Bar dataKey="JobApplied" fill="#E9D6FF" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default ManagerBarChart;
