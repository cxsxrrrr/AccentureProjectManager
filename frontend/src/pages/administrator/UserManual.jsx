// UserManual.jsx
import React from "react";

function UserManual({ onBack }) {
  return (
    <div className="admin-page">
      <div className="topbar-container text-2xl">
        <h2 className="topbar-title">User manual</h2>
      </div>
      <div className="admin-content help-content">
        <div className="about-card">
          <h2 className="text-2xl font-bold mb-4">
            Guide for using the application.
          </h2>
          <div className="grid grid-cols-2 gap-8 mt-6 text-left text-lg">
            <div>
              <b>Dashboard</b>
              <br />
              View a summary of project activity, performance indicators, and
              quick access to critical project metrics.
            </div>
            <div>
              <b>Employees</b>
              <br />
              Browse and manage the list of employees. Filter by category,
              workload, or availability.
            </div>
            <div>
              <b>User Management</b>
              <br />
              Create, update, or delete user accounts. Assign roles and manage
              access credentials.
            </div>
            <div>
              <b>Role Management</b>
              <br />
              Define roles and assign specific permissions to each one according
              to responsibilities.
            </div>
            <div>
              <b>Permission Management</b>
              <br />
              Configure the system's security by controlling what each role can
              access or modify.
            </div>
            <div>
              <b>Allocate Resources</b>
              <br />
              Register, categorize, and assign human and material resources to
              ongoing projects.
            </div>
            <div>
              <b>Help</b>
              <br />
              Access general support topics including system usage,
              troubleshooting, and platform updates.
            </div>
          </div>
          <button
            onClick={onBack}
            type="submit"
            className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 flex items-center gap-2 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserManual;
