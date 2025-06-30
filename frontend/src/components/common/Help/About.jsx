import React from "react";
function About({ onBack }) {
  return (
    <div className="admin-page">
      <div className="topbar-container">
        <h2 className="topbar-title">About</h2>
      </div>
      <div className="admin-content help-content">
        <div className="about-card">
          <h2 className="text-2xl font-bold mb-4">Information about the application</h2>
          <div className="text-lg mb-3">
            This application was developed by Accenture, a developers team which
            offers services company.
          </div>
          <div className="mb-2">Version. 1.0.0</div>
          <div className="mb-8">
            Copyright © 2025 Accenture. All rights reserved.
          </div>
          <button onClick={onBack} type="button"
            className="px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 flex items-center gap-2 transition">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default About;