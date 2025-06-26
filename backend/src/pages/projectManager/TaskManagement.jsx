import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function TaskManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Task Management">
        <TopControls module="task" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Task</th><th>Status</th><th>Assigned To</th></tr></thead>
          <tbody><tr><td>Design UI</td><td>In Progress</td><td>Jane</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskManagement;
