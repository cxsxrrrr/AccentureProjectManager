import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function AssignedProject() {
  return (
    <div className="admin-page">
      <Topbar title="Assigned Project" showSearch={false} />
      <div className="admin-content">
        <table>
          <thead>
            <tr><th>Project</th><th>Manager</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Website Revamp</td><td>John Doe</td><td>Ongoing</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedProject;
