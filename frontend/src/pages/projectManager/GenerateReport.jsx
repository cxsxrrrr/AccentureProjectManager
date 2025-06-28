import React from "react";
import Topbar from "../../components/common/Topbar";
import reportIcon from "../../assets/icons/report.svg";

function GenerateReport() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Topbar */}
      <Topbar title="Generate Report">
        <div className="top-controls">
          <button className="control-button">
            <img src={reportIcon} alt="" className="button-icon" />
            Generate Custom Report
          </button>
        </div>
      </Topbar>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Filters & Criteria */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6 min-w-[330px] max-w-md">
          <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center gap-2">
            <span className="material-symbols-outlined">filter_alt</span>
            Filters & Criteria
          </h3>
          {/* Filters & Criteria */}
          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Report Type
              </label>
              <select className="w-full rounded-lg border-gray-300 p-2">
                <option value="">Select report type</option>
                <option value="tasks">Tasks Report</option>
                <option value="resources">Resources Report</option>
                <option value="milestones">Milestones Report</option>
              </select>
            </div>
            {/* Time Period */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1 font-semibold">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1 font-semibold">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 p-2"
                />
              </div>
            </div>
            {/* Categories */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Categories
              </label>
              <select className="w-full rounded-lg border-gray-300 p-2">
                <option value="">All categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="design">Design</option>
              </select>
            </div>
            {/* Projects */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Projects
              </label>
              <select className="w-full rounded-lg border-gray-300 p-2">
                <option value="">All projects</option>
                <option value="proj1">Project A</option>
                <option value="proj2">Project B</option>
              </select>
            </div>
            {/* Members */}
            <div>
              <label className="block text-sm text-gray-500 mb-1 font-semibold">
                Filter by Members
              </label>
              <select className="w-full rounded-lg border-gray-300 p-2">
                <option value="">All members</option>
                <option value="samuel">Samuel Rodríguez</option>
                <option value="valentina">Valentina Morán</option>
                <option value="enmanuel">Enmanuel Fuenmayor</option>
              </select>
            </div>
          </div>
        </div>
        {/* Metrics + KPIs */}
        <div className="flex-[2] flex flex-col gap-6">
          {/* Metrics to Include */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold mb-3 text-purple-700 flex items-center gap-2">
              <span className="material-symbols-outlined">bar_chart</span>
              Metrics to Include
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4">
                <input
                  id="completed-tasks"
                  type="checkbox"
                  className="accent-purple-600 w-5 h-5 mt-1.5"
                />
                <label
                  htmlFor="completed-tasks"
                  className="text-sm font-medium text-gray-700"
                >
                  Completed vs Pending Tasks
                </label>
              </div>
              <div className="flex items-start gap-4">
                <input
                  id="milestone"
                  type="checkbox"
                  className="accent-purple-600 w-5 h-5 mt-1.5"
                />
                <label
                  htmlFor="milestone"
                  className="text-sm font-medium text-gray-700"
                >
                  Milestone compliance
                </label>
              </div>
              <div className="flex items-start gap-4">
                <input
                  id="estimated-vs-real"
                  type="checkbox"
                  className="accent-purple-600 w-5 h-5 mt-1.5"
                />
                <label
                  htmlFor="estimated-vs-real"
                  className="text-sm font-medium text-gray-700"
                >
                  Estimated vs Real time
                </label>
              </div>
              <div className="flex items-start gap-4">
                <input
                  id="resource-util"
                  type="checkbox"
                  className="accent-purple-600 w-5 h-5 mt-1.5"
                />
                <label
                  htmlFor="resource-util"
                  className="text-sm font-medium text-gray-700"
                >
                  Resource utilization
                </label>
              </div>
            </div>
          </div>
          {/* KPIs Cards (cuadradas y alineadas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {/* Active Projects */}
            <div className="relative rounded-2xl bg-white shadow-md flex flex-col justify-center px-6 py-5 min-w-[160px] min-h-[200px]">
              <div className="absolute top-3 left-0 h-[85%] w-1.5 rounded-r-xl bg-gradient-to-b from-purple-600 to-purple-400" />
              <span className="block text-gray-500 text-lg font-semibold mb-1 ml-3">
                Active Projects
              </span>
              <span className="text-3xl font-extrabold text-gray-800 mb-1 ml-3">
                12
              </span>
              <span className="block text-green-600 text-sm font-medium ml-3">
                +2 This month
              </span>
            </div>
            {/* Milestones achieved */}
            <div className="relative rounded-2xl bg-white shadow-md flex flex-col justify-center px-6 py-5 min-w-[160px] min-h-[200px]">
              <div className="absolute top-3 left-0 h-[85%] w-1.5 rounded-r-xl bg-gradient-to-b from-purple-600 to-purple-400" />
              <span className="block text-gray-500 text-lg font-semibold mb-1 ml-3">
                Milestones achieved
              </span>
              <span className="text-3xl font-extrabold text-gray-800 mb-1 ml-3">
                89%
              </span>
              <span className="block text-green-600 text-sm font-medium ml-3">
                +5% Improvement
              </span>
            </div>
            {/* Completed Tasks */}
            <div className="relative rounded-2xl bg-white shadow-md flex flex-col justify-center px-6 py-5 min-w-[160px] min-h-[200px]">
              <div className="absolute top-3 left-0 h-[85%] w-1.5 rounded-r-xl bg-gradient-to-b from-purple-600 to-purple-400" />
              <span className="block text-gray-500 text-lg font-semibold mb-1 ml-3">
                Completed Tasks
              </span>
              <span className="text-3xl font-extrabold text-gray-800 mb-1 ml-3">
                847
              </span>
              <span className="block text-green-600 text-sm font-medium ml-3">
                +15% vs previous month
              </span>
            </div>
            {/* Resources used */}
            <div className="relative rounded-2xl bg-white shadow-md flex flex-col justify-center px-6 py-5 min-w-[160px] min-h-[200px]">
              <div className="absolute top-3 left-0 h-[85%] w-1.5 rounded-r-xl bg-gradient-to-b from-purple-600 to-purple-400" />
              <span className="block text-gray-500 text-lg font-semibold mb-1 ml-3">
                Resources used
              </span>
              <span className="text-3xl font-extrabold text-gray-800 mb-1 ml-3">
                76%
              </span>
              <span className="block text-green-600 text-sm font-medium ml-3">
                +5% Improvement
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate & Export (Sticky at the bottom) */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-5 px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_2px_24px_-2px_rgba(80,0,170,0.18)]">
        <div className="flex gap-3">
          <button className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition">
            Generate Report
          </button>
          <button className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition">
            Export PDF
          </button>
          <button className="bg-white/80 text-purple-800 font-bold px-6 py-2 rounded-xl shadow hover:bg-white transition">
            Export Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenerateReport;
