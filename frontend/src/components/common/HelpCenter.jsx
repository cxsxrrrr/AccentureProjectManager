import React, { useState } from "react";
import helpIcon from "../../assets/icons/help.svg";
import About from "./Help/About";
import Terms from "./Help/Terms";
import UserManual from "./Help/UserManual";

// Botones por rol
const buttons = {
  admin: [
    { key: "about", label: "About", desc: "Information about the application" },
    { key: "manual", label: "User Manual", desc: "Guide for using the platform" },
  ],
  manager: [
    { key: "about", label: "About", desc: "Information about the application" },
    { key: "manual", label: "User Manual", desc: "Guide for using the platform" },
    { key: "terms", label: "Terms and Conditions", desc: "Legal and usage terms" },
  ],
  team: [
    { key: "about", label: "About", desc: "Information about the application" },
    { key: "manual", label: "User Manual", desc: "Guide for using the platform" },
    { key: "terms", label: "Terms and Conditions", desc: "Legal and usage terms" },
  ],
  client: [
    { key: "about", label: "About", desc: "Information about the application" },
    { key: "manual", label: "User Manual", desc: "Guide for using the platform" },
    { key: "terms", label: "Terms and Conditions", desc: "Legal and usage terms" },
  ],
};

function HelpCenter({ role = "admin" }) {
  const [view, setView] = useState("main");

  // Renderiza el contenido
  if (view === "about") return <About onBack={() => setView("main")} />;
  if (view === "terms") return <Terms onBack={() => setView("main")} />;
  if (view === "manual") return <UserManual role={role} onBack={() => setView("main")} />;

  return (
    <div className="admin-page">
      <div className="topbar-container">
        <h2 className="topbar-title">Help</h2>
      </div>
      <div className="admin-content help-content flex flex-wrap gap-8">
        {buttons[role].map(b => (
          <button className="help-button" key={b.key} onClick={() => setView(b.key)}>
            <img src={helpIcon} alt={b.label} />
            {b.label}
            <span className="button-description">{b.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;