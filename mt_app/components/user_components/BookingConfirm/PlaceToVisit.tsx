import React from 'react'

const PlaceToVisit = () => {
  return (
      <div><div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Place to Visit</h3>
          <p className="text-gray-600 font-medium">Sat, 8 FEB 2025</p>
          <div className="flex items-center mt-4">
              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
              <div>
                  <p className="text-gray-800 font-semibold">Wat Long Khun</p>
                  <p className="text-gray-600 text-sm">Time: 1:00 PM - 3:00 PM</p>
              </div>
          </div>
          <div className="flex items-center mt-4">
              <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
              <div>
                  <p className="text-gray-800 font-semibold">Wat Long Khun</p>
                  <p className="text-gray-600 text-sm">Time: 3:00 PM - 5:00 PM</p>
              </div>
          </div>
      </div></div>
  )
}

export default PlaceToVisit