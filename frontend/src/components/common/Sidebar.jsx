import React from "react";
import Boton from "./buttons/SB_boton";
import userIcon from "../../assets/icons/user_rol.svg"; 
import logoutIcon from "../../assets/icons/logout.svg"; 
import "../../stylesheets/sidebar.css";

// MOCKS TEMPORALES hasta que se conecte al backend
const mockUser = {
  name: "Luis I.",
  role: "Admin",
};

function Sidebar({ menuItems, vista, logo, title }) {
  return (
    <div className="Contenedor-Principal">
      {/* LOGO + TÍTULO */}
      <div className="Contenedor-Identificador">
        <img src={logo} alt="Logo" />
        <h2>{title || "Accenture"}</h2>
      </div>

      {/* INFORMACIÓN DEL USUARIO */}
      <div className="Sidebar-Usuario">
        <img src={userIcon} alt="User Icon" className="Sidebar-UserIcon" />
        <div className="Sidebar-UserInfo">
          <span className="Sidebar-UserName">{mockUser.name}</span>
          <span className="Sidebar-UserRole">{mockUser.role}</span>
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="Contenedor-Botones">
        {menuItems.map(item => (
          <Boton
            key={item.path}
            texto={item.texto}
            icon={item.icon}
            path={item.path}
            active={vista === item.path}
          />
        ))}
      </div>

      {/* LOGOUT */}
      <div className="Sidebar-Logout">
        <Boton
          texto="Log out"
          icon={logoutIcon}
          path="/logout"
          active={false}
        />
      </div>
    </div>
  );
}

export default Sidebar;
