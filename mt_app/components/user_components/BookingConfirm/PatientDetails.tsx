import React from 'react'

const PatientDetails = () => {
  return (
      <div className='max-w-2xl mx-auto p-6'>
        {/* Patient Detail */}
          <div className="bg-white p-6 rounded-lg shadow border border-[#C5D1E0]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Detail</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                      <p className="font-medium">First Name</p>
                      <p>Ekkarat</p>
                  </div>
                  <div>
                      <p className="font-medium">Last Name</p>
                      <p>Singhkha</p>
                  </div>
                  <div>
                      <p className="font-medium">Gender</p>
                      <p>Male</p>
                  </div>
                  <div>
                      <p className="font-medium">Nationality</p>
                      <p>Thai</p>
                  </div>
                  <div>
                      <p className="font-medium">Date of Birth</p>
                      <p>19-10-1993</p>
                  </div>
                  <div>
                      <p className="font-medium">Passport ID</p>
                      <p>AB-356-134-1345</p>
                  </div>
              </div>
          </div></div>
  )
}

export default PatientDetails