import React from 'react'
import { useState } from 'react';

const ShowPopUp = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState("");
  return (
      <div>{showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <h2 className="text-lg font-semibold mb-4">Add Customer Chat</h2>
                  <input
                      type="email"
                      className="w-full p-3 border rounded-full text-center text-gray-500"
                      placeholder="customer@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mt-4 flex justify-center space-x-4">
                      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Add</button>
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg" onClick={() => setShowPopup(false)}>Cancel</button>
                  </div>
              </div>
          </div>
      )}</div>
  )
}

export default ShowPopUp