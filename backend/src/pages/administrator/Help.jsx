import React, { useState } from "react";
import "../../stylesheets/page.css";
import "../../stylesheets/help.css";
import helpIcon from "../../assets/icons/help.svg";
import About from "./About";
import UserManual from "./UserManual";

function Help() {
  const [view, setView] = useState("main"); // 'main', 'about', 'manual'

  if (view === "about") return <About onBack={() => setView("main")} />;
  if (view === "manual") return <UserManual onBack={() => setView("main")} />;

  return (
    <div className="admin-page">
      <div className="topbar-container">
        <h2 className="topbar-title">Help</h2>
      </div>
      <div className="admin-content help-content flex gap-8">
        <button className="help-button" onClick={() => setView("about")}>
          <img src={helpIcon} alt="About" />
          About
          <span className="button-description">Information about the application</span>
        </button>
        <button className="help-button" onClick={() => setView("manual")}>
          <img src={helpIcon} alt="User Manual" />
          User Manual
          <span className="button-description">Guide for using the application</span>
        </button>
      </div>
    </div>
  );
}

export default Help;
