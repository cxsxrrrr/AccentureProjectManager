import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function RoleManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Role Management">
        <TopControls module="role" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Role</th><th>Description</th></tr></thead>
          <tbody><tr><td>Admin</td><td>Full access</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default RoleManagement;
