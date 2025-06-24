import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function AllocateResources() {
  return (
    <div className="admin-page">
      <Topbar title="Allocate Resources">
        <TopControls module="allocate" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Project</th><th>Category</th><th>Resource</th></tr></thead>
          <tbody><tr><td>Alpha</td><td>A</td><td>Juan</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default AllocateResources;
