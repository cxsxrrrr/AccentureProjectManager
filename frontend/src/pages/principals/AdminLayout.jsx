import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar"; 
import adminMenu from "../../config/sidebars/AdminMenu";
import accentureLogo from "../../assets/accenture-logo.svg";
function AdminLayout() {
  const location = useLocation();
  const path = location.pathname;

  const currentMenuItem = adminMenu.find(item => path.startsWith(item.path));

  const vista = currentMenuItem?.path || "/admin/dashboard";
  const Component = currentMenuItem?.component || adminMenu[0].component;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        vista={vista}
        menuItems={adminMenu}
        logo={accentureLogo}
        title="Accenture"
      />
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Component />
      </div>
    </div>
  );
}

export default AdminLayout;
