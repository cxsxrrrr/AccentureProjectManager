import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";
import "../../stylesheets/topcontrols.css";
import reportIcon from "../../assets/icons/report.svg";

function GenerateReport() {
  return (
    <div className="admin-page">
      <Topbar title="Generate Report">
        <div className="top-controls">
          <button className="control-button">
            <img src={reportIcon} alt="" className="button-icon" />
            Generate Custom Report
          </button>
        </div>
      </Topbar>
      <div className="admin-content">
        <p>Reports table will appear here.</p>
      </div>
    </div>
  );
}

export default GenerateReport;
