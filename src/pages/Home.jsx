import React, { useState } from "react";
import axios from "../axios";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    cover_letter: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("/api/applications", formData);
      setSubmitted(true);
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError("Please fill out all fields correctly.");
        console.error(err.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Job Application</h1>

        {submitted ? (
          <div className="text-green-600 text-center font-medium">
            Your application has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="full_name">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cover_letter">
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                name="cover_letter"
                rows={5}
                value={formData.cover_letter}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
