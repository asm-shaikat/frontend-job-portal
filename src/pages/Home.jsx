import React, { useEffect, useState } from "react";
import axios from "../axios";
import NavBar from "../components/NavBar";

export default function JobApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/applications");
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications", err);
      setError("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`/api/applications/${id}/download`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `application_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Download failed", error);
      setError("Failed to download the file.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Submitted Applications</h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>No applications submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{app.full_name}</p>
                  <p className="text-sm text-gray-600">{app.email}</p>
                </div>
                <button
                  onClick={() => handleDownload(app.id)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
