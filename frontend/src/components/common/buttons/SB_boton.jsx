import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../stylesheets/sidebar.css";

function Boton({ texto, icon, path, onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === path;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <button
      className={`boton-sidebar ${isActive ? "activo" : ""}`}
      onClick={handleClick}
    >
      <img src={icon} alt={`${texto} icon`} className="icono-boton" />
      <span>{texto}</span>
    </button>
  );
}

export default Boton;
