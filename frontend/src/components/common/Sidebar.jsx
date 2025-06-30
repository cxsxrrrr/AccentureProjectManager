import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "./buttons/SB_boton";
import userIcon from "../../assets/icons/user_rol.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import "../../stylesheets/sidebar.css";

function Sidebar({ menuItems, vista, logo, title }) {
  const navigate = useNavigate();

  // Lee el usuario REAL desde localStorage/sessionStorage
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
  } catch {
    storedUser = null;
  }

  const getUserName = () => {
    if (!storedUser) return "Usuario";
    // Usa nombre y apellido si hay, o email si no hay nombre
    if (storedUser.nombre && storedUser.apellido) return `${storedUser.nombre} ${storedUser.apellido}`;
    if (storedUser.nombre) return storedUser.nombre;
    if (storedUser.email) return storedUser.email;
    return "Usuario";
  };

  const getUserRole = () => {
    if (storedUser && storedUser.rol && storedUser.rol.nombre) return storedUser.rol.nombre;
    if (storedUser && storedUser.role) return storedUser.role;
    return "User";
  };

  const handleLogout = () => {
    // Limpia storage y redirige
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

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
          <span className="Sidebar-UserName">{getUserName()}</span>
          <span className="Sidebar-UserRole">{getUserRole()}</span>
        </div>
      </div>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="Contenedor-Botones">
        {menuItems.map((item) => (
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
          onClick={handleLogout}
          active={false}
        />
      </div>
    </div>
  );
}

export default Sidebar;