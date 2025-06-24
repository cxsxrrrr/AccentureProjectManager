import React from "react";
import Boton from "./Botones/Boton";
import "../../../stylesheets/sidebar.css";
import dashboardIcon from "../../../assets/icons/dashboard.svg";
import employeesIcon from "../../../assets/icons/employees.svg";
import userIcon from "../../../assets/icons/user.svg";
import roleIcon from "../../../assets/icons/role.svg";
import permissionIcon from "../../../assets/icons/permission.svg";
import allocateIcon from "../../../assets/icons/allocate.svg";
import helpIcon from "../../../assets/icons/help.svg";

function Sidebar({ setVista, vista }) {
  return (
    <div className="Contenedor-Principal">
      <div className="Contenedor-Identificador">
        <img src="/src/assets/accenture-logo.svg" alt="Logo de Accenture" />
        <h2>Accenture</h2>
      </div>

      <div className="Contenedor-Botones">
        <Boton texto="Dashboard" icon={dashboardIcon} path="/admin/dashboard" />
        <Boton texto="Employees" icon={employeesIcon} path="/admin/employees" />
        <Boton texto="User Management" icon={userIcon} path="/admin/usermanagement" />
        <Boton texto="Role Management" icon={roleIcon} path="/admin/rolemanagement" />
        <Boton texto="Categories and Skills" icon={permissionIcon} path="/admin/categoriesandskills" />
        <Boton texto="Allocate Resources" icon={allocateIcon} path="/admin/allocateresources" />
        <Boton texto="Help" icon={helpIcon} path="/admin/help" />
      </div>
    </div>
  );
}

export default Sidebar;
