import React from "react";
import Topbar from "../../components/admin/layout/Topbar";
import TopControls from "../../components/admin/layout/TopControls";
import "../../stylesheets/page.css";

function UserManagement() {
  return (
    <div className="admin-page">
      <Topbar title="User Management">
        <TopControls module="user" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Username</th><th>Email</th><th>Role</th></tr></thead>
          <tbody><tr><td>admin</td><td>admin@company.com</td><td>Admin</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
