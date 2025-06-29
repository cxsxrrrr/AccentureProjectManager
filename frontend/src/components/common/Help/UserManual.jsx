import React from "react";

const MANUALS = {
  admin: [
    { title: "Dashboard", desc: "View a summary of project activity, performance indicators, and quick access to critical project metrics." },
    { title: "Employees", desc: "Browse and manage the list of employees. Filter by category, workload, or availability." },
    { title: "User Management", desc: "Create, update, or delete user accounts. Assign roles and manage access credentials." },
    { title: "Role Management", desc: "Define roles and assign specific permissions to each one according to responsibilities." },
    { title: "Permission Management", desc: "Configure the system's security by controlling available accesses/modifications." },
    { title: "Allocate Resources", desc: "Register, categorize, and assign human and material resources to ongoing projects." },
    { title: "Help", desc: "Access general support topics including system usage, troubleshooting, and updates." },
  ],
  manager: [
    { title: "Dashboard", desc: "Monitor project status, summaries, and deadlines relevant to your management scope." },
    { title: "Team Management", desc: "Assign, view or remove team members from projects. Supervise member activity." },
    { title: "Project Management", desc: "Oversee all obligations and deliverables of your assigned projects." },
    { title: "Task Management", desc: "Create, assign, and track task progress for your teams." },
    { title: "Resources Management", desc: "Manage and allocate resources for each of your projects." },
    { title: "Generate Report", desc: "Access and generate reports for project performance and progress." },
    { title: "Project Milestones", desc: "Track key milestones for critical project phases." },
    { title: "Documents Management", desc: "Share, upload, and control project documents and files." },
    { title: "Help", desc: "Find support and documentation relevant to project managers." },
  ],
  team: [
    { title: "Dashboard", desc: "Check assigned tasks and project updates at a glance." },
    { title: "Assigned Tasks", desc: "View and update your allocated tasks, deadlines and progress." },
    { title: "Assigned Projects", desc: "See which projects you are currently a member of." },
    { title: "Documents Management", desc: "Access or share documents related to your work." },
    { title: "Help", desc: "Access support topics, troubleshooting tips, and guides for employees." },
  ],
  client: [
    { title: "Dashboard", desc: "Review your ongoing projects and receive instant updates from managers." },
    { title: "Tracking Project", desc: "Track the latest progress, milestones, and status of your projects as a client." },
    { title: "Help", desc: "Find information for clients, contact channels, and platform usage." },
  ],
};

function UserManual({ role = "admin", onBack }) {
  const sections = MANUALS[role] || [];
  return (
    <div className="admin-page">
      <div className="topbar-container text-2xl">
        <h2 className="topbar-title">User Manual</h2>
      </div>
      <div className="admin-content help-content">
        <div className="about-card">
          <h2 className="text-2xl font-bold mb-4">Guide for using the application.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 text-left text-lg">
            {sections.map(({ title, desc }) =>
              <div key={title}>
                <b>{title}</b><br />{desc}
              </div>
            )}
          </div>
          <button onClick={onBack} type="button"
            className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 flex items-center gap-2 transition">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserManual;