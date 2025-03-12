import React from 'react'

const MedicalService = () => {
  return (
      <div><div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical Service</h3>
          <div className="flex items-center mt-4">
              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
              <div>
                  <p className="text-black font-bold"><span className="font-bold">Appointment:</span> Sat, Feb 8, 2025</p>
                  <p className="text-gray-600"><span className="font-medium">Time:</span> 9:00 AM - 12:00 PM</p>
                  <p className="text-gray-600"><span className="font-medium">Service:</span> Medical Check-up</p>
              </div>
          </div>
      </div></div>
  )
}

export default MedicalService