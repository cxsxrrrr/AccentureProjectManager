import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import managerMenu from "../../config/sidebars/managerMenu";
import accentureLogo from "../../assets/accenture-logo.svg";

function ManagerLayout() {
  const location = useLocation();
  const path = location.pathname;

  const currentMenuItem = managerMenu.find(item => path.startsWith(item.path));
  const vista = currentMenuItem?.path || "/manager/dashboard";
  const Component = currentMenuItem?.component || managerMenu[0].component;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        vista={vista}
        menuItems={managerMenu}
        logo={accentureLogo}
        title="Accenture"
      />
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Component />
      </div>
    </div>
  );
}

export default ManagerLayout;
