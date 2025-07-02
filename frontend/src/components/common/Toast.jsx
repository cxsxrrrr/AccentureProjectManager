import React from "react";

function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-4 animate-fade-in">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-lg font-bold">&times;</button>
      </div>
    </div>
  );
}

export default Toast;
