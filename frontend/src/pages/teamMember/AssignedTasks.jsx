import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function AssignedTasks() {
  return (
    <div className="admin-page">
      <Topbar title="Assigned Tasks" showSearch={false} />
      <div className="admin-content">
        <table>
          <thead>
            <tr><th>Task</th><th>Status</th><th>Due Date</th></tr>
          </thead>
          <tbody>
            <tr><td>Design UI</td><td>In Progress</td><td>2025-06-15</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedTasks;
