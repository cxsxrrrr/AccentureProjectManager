import React from "react";
import Topbar from "../../components/common/Topbar";
import "../../stylesheets/page.css";

function DocumentsManagement() {
  return (
    <div className="admin-page">
      <Topbar title="Documents Management" />
      <div className="admin-content">
        <div className="document-upload">
          <input type="file" />
          <button>Upload</button>
        </div>
        <table>
          <thead>
            <tr><th>Document</th><th>Upload Date</th></tr>
          </thead>
          <tbody>
            <tr><td>Requirements.pdf</td><td>2025-06-01</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentsManagement;
