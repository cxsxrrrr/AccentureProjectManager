import React from "react";
function Terms({ onBack }) {
  return (
    <div className="admin-page">
      <div className="topbar-container">
        <h2 className="topbar-title">Terms and Conditions</h2>
      </div>
      <div className="admin-content help-content">
        <div className="about-card">
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <div className="text-lg mb-6">
            By using this application, you agree to abide by the legal terms and usage policies specified by Accenture. Consult the full conditions on our official website or with your supervisor.
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
export default Terms;