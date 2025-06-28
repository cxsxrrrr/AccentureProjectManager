import React from "react";

const ManagerStatCard = ({ label, value, unit, trend, trendType }) => (
  <div className="bg-white rounded-xl border px-6 py-5 flex flex-col shadow-md min-w-[160px] min-h-[110px]">
    <span className="text-gray-500 text-base">{label}</span>
    <span className="text-3xl font-bold text-gray-900 mt-1">{value}</span>
    <div className="flex items-center gap-2 mt-1">
      <span className={`text-xs font-semibold ${trendType === "up" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"} rounded-full px-2 py-0.5`}>
        {trendType === "up" ? "▲" : "▼"} {trend}
      </span>
      {unit && <span className="text-xs text-gray-500">{unit}</span>}
    </div>
  </div>
);

export default ManagerStatCard;
