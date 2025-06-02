import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/admin/layout/Sidebar";
import Dashboard from "./admin/Dashboard";
import Employees from "./admin/Employees";
import UserManagement from "./admin/UserManagement";
import RoleManagement from "./admin/RoleManagement";
import PermissionManagement from "./admin/PermissionManagement";
import AllocateResources from "./admin/AllocateResources";
import Help from "./admin/Help";

function AdminLayout() {
  const location = useLocation();

  const getVistaFromPath = (path) => {
    if (path.includes("/admin/dashboard")) return "dashboard";
    if (path.includes("/admin/employees")) return "employees";
    if (path.includes("/admin/usermanagement")) return "user";
    if (path.includes("/admin/rolemanagement")) return "role";
    if (path.includes("/admin/permissionmanagement")) return "permission";
    if (path.includes("/admin/allocateresources")) return "allocate";
    if (path.includes("/admin/help")) return "help";
    return null;
  };

  const vista = getVistaFromPath(location.pathname);

  const renderVista = () => {
    switch (vista) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <Employees />;
      case "user":
        return <UserManagement />;
      case "role":
        return <RoleManagement />;
      case "permission":
        return <PermissionManagement />;
      case "allocate":
        return <AllocateResources />;
      case "help":
        return <Help />;
      default:
        return <div>Selecciona una opción del menú</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar vista={vista} />
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {renderVista()}
      </div>
    </div>
  );
}

export default AdminLayout;
