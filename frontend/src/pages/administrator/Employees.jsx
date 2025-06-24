import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function Employees() {
  return (
    <div className="admin-page">
      <Topbar title="Employees">
        <TopControls module="employees" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Gender</th><th>Category</th></tr></thead>
          <tbody><tr><td>Juan</td><td>Dev</td><td>Active</td><td>M</td><td>A</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
