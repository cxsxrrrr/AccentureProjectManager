import React, { useRef } from "react";

function UploadDocument({ isOpen, onClose, onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">Upload a file</h2>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-gray-600">Click to select a file</p>
          <p className="text-sm text-gray-400 mt-2">Accepted: PDF, DOCX, JPG...</p>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocument;
