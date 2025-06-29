import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/layout/Sidebar";

function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        <Outlet /> {/* Aquí se renderizarán las subrutas */}
      </div>
    </div>
  );
}

export default AdminLayout;
