import React from "react";
import { FaPlus, FaGlobe, FaCalendarAlt, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const InterpreterAddForm: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Interpreter</h2>

      {/* Upload Image */}
      <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-5 mb-6">
        <button className="text-gray-600 font-semibold">Upload Image</button>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Name:</label>
          <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Interpreter's Name" />
        </div>
        <div>
          <label className="font-semibold">Email:</label>
          <input type="email" className="w-full border rounded-lg p-2 mt-1" placeholder="Email" />
        </div>
        <div>
          <label className="font-semibold">Nationality:</label>
          <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Country" />
        </div>
        <div>
          <label className="font-semibold">Language:</label>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Select Language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>

      {/* Phone & Date of Birth */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className="font-semibold flex items-center gap-1">
            <FaPhone /> Phone:
          </label>
          <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Phone Number" />
        </div>
        <div>
          <label className="font-semibold flex items-center gap-1">
            <FaCalendarAlt /> Date of Birth:
          </label>
          <div className="flex gap-2">
            <input type="text" className="w-1/3 border rounded-lg p-2 mt-1" placeholder="Day" />
            <input type="text" className="w-1/3 border rounded-lg p-2 mt-1" placeholder="Month" />
            <input type="text" className="w-1/3 border rounded-lg p-2 mt-1" placeholder="Year" />
          </div>
        </div>
      </div>

      {/* Address & Career Start */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className="font-semibold flex items-center gap-1">
            <FaMapMarkerAlt /> Address:
          </label>
          <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Address" />
        </div>
        <div>
          <label className="font-semibold flex items-center gap-1">
            <FaCalendarAlt /> Career Start:
          </label>
          <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Year" />
        </div>
      </div>

      {/* Other Languages */}
      <div className="mt-6">
        <label className="font-semibold">Other Languages:</label>
        <div className="grid grid-cols-3 gap-4">
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Select Language</option>
            <option>Chinese</option>
            <option>German</option>
          </select>
          <select className="w-full border rounded-lg p-2 mt-1">
            <option>Level</option>
            <option>Native</option>
            <option>Basic</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mt-1">
            <FaPlus className="mr-2" /> Add
          </button>
        </div>

        {/* Display Added Languages */}
        <div className="border p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Languages Added:</h3>
          <ul className="list-disc pl-6">
            <li>English - Native</li>
            <li>Spanish - Basic</li>
          </ul>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="mt-6">
        <label className="font-semibold">Profile Summary:</label>
        <textarea className="w-full border rounded-lg p-2 mt-1" placeholder="Profile summary" rows={3} />
      </div>

      {/* Education */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Education</h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <select className="w-full border rounded-lg p-2">
            <option>Degree</option>
            <option>Bachelor's</option>
            <option>Master's</option>
          </select>
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Institution" />
          <input type="text" className="w-full border rounded-lg p-2" placeholder="Field of Study" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mt-2">
          <FaPlus className="mr-2" /> Add Info
        </button>
      </div>

      {/* Education History */}
      <div className="border p-4 rounded-lg mt-4">
        <h3 className="font-semibold mb-2">Education History:</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Year</th>
              <th className="py-2 px-4">Field of Study</th>
              <th className="py-2 px-4">Institution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">2016</td>
              <td className="py-2 px-4">Master of Business Administration</td>
              <td className="py-2 px-4">Chulalongkorn University, Thailand</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">Add Interpreter</button>
      </div>
    </div>
  );
};

export default InterpreterAddForm;
