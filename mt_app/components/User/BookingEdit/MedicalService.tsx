import React from 'react'

const MedicalService = () => {
  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
        <div>
          <h3 className="font-semibold text-black">Medical Service</h3>
          <p className="text-sm text-black font-bold">Appointment - Sat, Feb 8, 2025</p>
          <p className="text-sm text-black">Time - 9:00 - 12:00</p>
          <p className="text-sm text-black">Service: Medical check-up</p>
        </div>
      </div>
    </div>
  )
}

export default MedicalService