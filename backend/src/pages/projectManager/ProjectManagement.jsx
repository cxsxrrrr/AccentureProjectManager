import React from "react";
import Topbar from "../../components/common/Topbar";
import TopControls from "../../components/common/TopControls";
import "../../stylesheets/page.css";

function ProjectManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Project Management">
        <TopControls module="project" />
      </Topbar>
      <div className="admin-content">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Website Redesign</td>
              <td>2024-03-01</td>
              <td>2024-08-15</td>
              <td>In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectManagement;
