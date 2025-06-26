import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function Dashboard() {
  return (
    <div className="admin-page">
      <Topbar title="Dashboard" />
      <div className="admin-content">
        <p>Welcome to your dashboard!</p>
      </div>
    </div>
  );
}

export default Dashboard;
