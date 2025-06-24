import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function TeamManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Team Management">
        <TopControls module="employees" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
          <tbody><tr><td>John Doe</td><td>Developer</td><td>Active</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamManagement;
