import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import teamMemberMenu from "../../config/sidebars/TeamMembersMenu";
import accentureLogo from "../../assets/accenture-logo.svg";

function TeamMembersLayout() {
  const { pathname } = useLocation();
  const current = teamMemberMenu.find(item => pathname.startsWith(item.path)) || {};
  const vista = current.path || teamMemberMenu[0].path;
  const Component = current.component || teamMemberMenu[0].component;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        vista={vista}
        menuItems={teamMemberMenu}
        logo={accentureLogo}
      />
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Component />
      </div>
    </div>
  );
}

export default TeamMembersLayout;
