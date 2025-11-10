"use client";

import { useState } from "react";

export default function FillSymptomsDetails() {
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold text-center mb-4">Symptoms Details</h2>

      {/* File Upload */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Medical Report</label>
        <label className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <span className="text-gray-500">{file ? file.name : "Select File"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Textarea for Symptoms Details */}
      <div className="mb-4">
        <label className="block font-medium mb-2">More details about symptoms</label>
        <textarea
          className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Fill details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

     
    </div>
     {/* Continue Button */}
     <button className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Continue
      </button>
    </div>

  );
}
