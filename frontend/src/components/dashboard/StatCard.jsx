// src/components/admin/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ label, value, diff, trend, subtitle }) => (
  <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
    <span className="text-xs font-semibold text-gray-500">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold">{value}</span>
      <span className={`text-sm px-2 py-1 rounded-xl font-semibold ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
        {diff}
      </span>
    </div>
    <span className="text-xs text-gray-400">{subtitle}</span>
  </div>
);

export default StatCard;
