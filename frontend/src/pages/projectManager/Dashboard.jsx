import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function Dashboard() {
  return (
    <div className="admin-page">
      <Topbar title="Manager Dashboard" showSearch={false} />
      <div className="admin-content">
        <p>Welcome to the Project Manager Dashboard.</p>
      </div>
    </div>
  );
}

export default Dashboard;
