import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import clientMenu from "../../config/sidebars/ClientMenu";
import accentureLogo from "../../assets/accenture-logo.svg";

function ClientLayout() {
  const { pathname } = useLocation();
  const current = clientMenu.find((item) => pathname.startsWith(item.path)) || {};
  const vista = current.path || clientMenu[0].path;
  const Component = current.component || clientMenu[0].component;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        vista={vista}
        menuItems={clientMenu}
        logo={accentureLogo}
      />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Component />
      </div>
    </div>
  );
}

export default ClientLayout;
