import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function ResourcesManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Resources Management">
        <TopControls module="resource" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Resource</th><th>Type</th><th>Status</th></tr></thead>
          <tbody><tr><td>Laptop</td><td>Hardware</td><td>Available</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default ResourcesManagement;
