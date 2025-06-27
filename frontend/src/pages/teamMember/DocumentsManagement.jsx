import React, { useState } from "react";
import Topbar from "../../components/common/Topbar";
import UploadDocument from "../../components/teamMember/modals/UploadDocument";
import cloudUploadIcon from "../../assets/icons/cloud-upload.svg";
import documentIcon from "../../assets/icons/documents.svg";
import "../../stylesheets/page.css";

const mockDocuments = [
  { name: "Requirements.pdf", date: "2025-06-01" },
  { name: "Architecture.docx", date: "2025-06-02" },
];

function DocumentsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState(mockDocuments);

  const handleFileSelect = (file) => {
    const newDoc = {
      name: file.name,
      date: new Date().toISOString().split("T")[0],
    };
    setDocuments([...documents, newDoc]);
    setIsModalOpen(false);
  };

  return (
    <div className="admin-page">
      <Topbar title="Documents Management" />

      <div className="space-y-8">
        {/* Upload Box */}
        <div className="rounded-2xl bg-[#F8F8F8] p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-md">
          <img src={cloudUploadIcon} alt="Upload" className="w-16 h-16" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700"
          >
            Upload File
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto shadow rounded-xl bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4"> </th>
                <th className="p-4">File Name</th>
                <th className="p-4">Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-4">
                    <img src={documentIcon} alt="Doc" className="w-5 h-5" />
                  </td>
                  <td className="p-4">{doc.name}</td>
                  <td className="p-4">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UploadDocument
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
}

export default DocumentsManagement;
