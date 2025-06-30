import React from "react";
import "../../stylesheets/topbar.css";
import notificationIcon from "../../assets/icons/notification.svg";

function Topbar({ title, showSearch = false, children }) {
  return (
    <div className="topbar-container">
      <div className="topbar-header">
        {showSearch && <input className="topbar-search" type="text" placeholder="Search..." />}
        <h2 className="topbar-title">{title}</h2>
        {/*<img src={notificationIcon} alt="Notifications" className="topbar-icon" />*/}
      </div>
      <div className="topbar-controls">{children}</div>
    </div>
  );
}

export default Topbar;