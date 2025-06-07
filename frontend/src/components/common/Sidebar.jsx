import React from "react";
import Boton from "./buttons/SB_boton";
import "../../stylesheets/sidebar.css";

function Sidebar({ menuItems, vista, logo, title }) {
  return (
    <div className="Contenedor-Principal">
      <div className="Contenedor-Identificador">
        <img src={logo} alt="Logo" />
        <h2>{title}</h2>
      </div>

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
    </div>
  );
}

export default Sidebar;
