import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function TrackingProject() {
  return (
    <div className="admin-page">
      <Topbar title="Tracking Project" showSearch={false} />
      <div className="admin-content">
        <p>Project tracking dashboard under development.</p>
      </div>
    </div>
  );
}

export default TrackingProject;
