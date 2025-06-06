import React from "react";
import Topbar from "../../components/admin/layout/Topbar";
import TopControls from "../../components/admin/layout/TopControls";
import "../../stylesheets/page.css";

function PermissionManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Permission Management">
        <TopControls module="permission" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Permission</th><th>Description</th></tr></thead>
          <tbody><tr><td>Edit</td><td>Allows editing</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default PermissionManagement;
