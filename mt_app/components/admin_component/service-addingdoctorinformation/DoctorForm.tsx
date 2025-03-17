import React from "react";

const DoctorInformation = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Add Doctor
        </button>
      </div>

      {/* Image Upload & Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Image Box */}
        <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center rounded-lg">
          <span className="text-gray-400 text-lg">⬆️</span>
          <p className="text-gray-600 mt-2">Upload Image</p>
        </div>

        {/* Text Fields */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input type="text" className="w-full border rounded-lg p-2" placeholder="Doctor's Name" />
          </div>
          <div>
            <label className="block text-gray-600">Specialization</label>
            <input type="text" className="w-full border rounded-lg p-2" placeholder="Specialty" />
          </div>
          <div>
            <label className="block text-gray-600">Hospital</label>
            <input type="text" className="w-full border rounded-lg p-2" placeholder="Hospital Name" />
          </div>
          <div>
            <label className="block text-gray-600">Spoken Language</label>
            <select className="w-full border rounded-lg p-2">
              <option>Select Language</option>
              <option>English</option>
              <option>Thai</option>
              <option>Chinese</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600">Description</label>
            <textarea className="w-full border rounded-lg p-2" placeholder="Describe about specialty"></textarea>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Education</h3>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" className="border p-2 rounded-lg" placeholder="Year" />
          <input type="text" className="border p-2 rounded-lg" placeholder="Institution" />
          <input type="text" className="border p-2 rounded-lg" placeholder="Field of Study" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
          + Add Info
        </button>

        {/* Example of Added Info */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between">
          <p><strong>2016</strong> - Master of Business Administration</p>
          <span className="text-gray-500">Chulalongkorn University, Thailand</span>
        </div>
      </div>

      {/* Certificate Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Certificate</h3>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" className="border p-2 rounded-lg" placeholder="Year" />
          <input type="text" className="border p-2 rounded-lg" placeholder="Institution" />
          <input type="text" className="border p-2 rounded-lg" placeholder="Field of Study" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
          + Add Info
        </button>

        {/* Example of Added Info */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between">
          <p><strong>2019</strong> - Medical Education Training</p>
          <span className="text-gray-500">Medtronic, Thailand</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorInformation;
