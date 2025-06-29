import React, { useState } from "react";
import helpIcon from "../../../../assets/icons/help.svg"; // Cambia el path si es necesario

function AssignProjectModal({ isOpen, onClose, onAssign, user, projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!isOpen || !user) return null;

  // Actualiza el proyecto seleccionado
  const handleSelect = (projectName) => setSelectedProject(projectName);

  const handleAssign = () => {
    if (selectedProject) onAssign(selectedProject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center mb-6 gap-3">
          <span className="bg-gray-100 rounded-xl p-2 text-4xl text-purple-500">
            <img src={helpIcon} alt="" className="w-10 h-10" />
          </span>
          <div>
            <h2 className="text-3xl font-bold">Assign to Project</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-purple-600 text-2xl"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>

        {/* User Details */}
        <div className="bg-gray-50 rounded-xl px-6 py-4 mb-7 flex flex-wrap justify-between items-center">
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div><span className="font-semibold">Name:</span> {user.name}</div>
            <div><span className="font-semibold">Email:</span> {user.email}</div>
            <div><span className="font-semibold">Role:</span> {user.role}</div>
          </div>
          <div>
            <div className="text-right text-gray-500 text-sm mb-1">Current Status:</div>
            <span className={`px-3 py-1 rounded-full font-bold text-xs
              ${user.status === "Active"
                ? "bg-green-100 text-green-700"
                : user.status === "Unassigned"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-600"
              }
            `}>{user.status}</span>
          </div>
        </div>

        {/* Project Selection */}
        <div>
          <div className="mb-3 font-semibold text-gray-800">
            Select a project to assign the employee
          </div>
          <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-2">
            {projects.map((project, idx) => (
              <button
                type="button"
                key={idx}
                className={`
                  w-full text-left px-4 py-3 rounded-xl border 
                  transition font-medium text-base flex items-center justify-between
                  ${selectedProject === project
                    ? "bg-purple-100 border-purple-300 ring-2 ring-purple-200"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                  }
                `}
                onClick={() => handleSelect(project)}
              >
                {project}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl border bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedProject}
            onClick={handleAssign}
            className={`px-8 py-2 rounded-xl font-semibold transition
              ${selectedProject
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-purple-200 text-white cursor-not-allowed"
              }`}
          >
            ✓ Assign
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignProjectModal;
