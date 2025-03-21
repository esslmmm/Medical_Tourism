import React from 'react'
import { useState } from 'react';
import { FiEdit2 } from "react-icons/fi";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Ekkarat Singkhala",
        phone: "+66 819320420",
        email: "6531501137@lamduan.mfu.ac.th",
        password: "**********",
    });
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const handleEditClick = (field) => {
        setEditingField(field);
        setTempValue(user[field]);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField]: tempValue });
        setEditingField(null);
    };
  return (
      <div><div className="flex flex-1 items-center justify-center">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[600px] text-center">
              <div className="relative">
                  <div className="w-28 h-28 rounded-full mx-auto border bg-gray-300"></div>
                  {/* <img src="/profile1.jpg" alt="Profile" className="w-28 h-28 rounded-full mx-auto border" /> */}
              </div>
              <div className="mt-6 text-left space-y-6">
                  {["name", "phone", "email", "password"].map((field, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                              <p className="text-gray-600 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                              {editingField === field ? (
                                  <input
                                      type="text"
                                      className="border p-2 w-full rounded text-black"
                                      value={tempValue}
                                      onChange={(e) => setTempValue(e.target.value)}
                                  />
                              ) : (
                                  <p className="text-black text-lg">{user[field]}</p>
                              )}
                          </div>
                          {editingField === field ? (
                              <button className="text-teal-600 font-semibold" onClick={handleSave}>Save</button>
                          ) : (
                              <FiEdit2 className="text-gray-600 cursor-pointer" size={18} onClick={() => handleEditClick(field)} />
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </div></div>
  )
}

export default Profile