import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/help.css";
import "../../stylesheets/topcontrols.css";
import helpIcon from "../../assets/icons/help.svg";

function Help() {
  return (
    <div className="admin-page">
          <div className="topbar-container">
            <h2 className="topbar-title">Help</h2>
          </div>
          <div className="admin-content help-content">
            <button className="help-button">
              <img src={helpIcon} alt="About" />
              About
              <span className="button-description">Information about the application</span>
            </button>
            <button className="help-button">
              <img src={helpIcon} alt="User Manual" />
              User Manual
              <span className="button-description">Guide for using the application</span>
            </button>
            <button className="help-button">
              <img src={helpIcon} alt="User Manual" />
              Terms and Conditions
              <span className="button-description">Usage rules and legal</span>
            </button>
          </div>
        </div>
  );
}

export default Help;
