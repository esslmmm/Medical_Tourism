import React from 'react'

const Warning = () => {
  return (
    <div>
      <h1 className="my-5 text-2xl font-bold text-gray-900 text-center">Make a Booking</h1>
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200">
        <div className="flex items-start justify-between"> 
            <span className="text-lg font-semibold text-gray-900">Please finish previous page</span>
        </div>
      </div>
    </div>
  )
}

export default Warning
