import React from "react";
import Topbar from "../../components/admin/layout/Topbar";
import TopControls from "../../components/admin/layout/TopControls";
import "../../stylesheets/page.css";

function Dashboard() {
  return (
    <div className="admin-page"> 
      <Topbar title="Dashboard">
        <TopControls module="dashboard" />
      </Topbar>
      <div className="admin-content dashboard-content">
        <p>Welcome to the Dashboard</p>
      </div>
    </div>
  );
}

export default Dashboard;
