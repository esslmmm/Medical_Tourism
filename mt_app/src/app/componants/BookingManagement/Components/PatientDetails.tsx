import React from 'react'
import { Card, CardContent } from "./widgets/card";

const PatientDetails = () => {
  return (
      <div><Card>
          <CardContent className="p-6">
              <h3 className="text-black font-semibold mb-4">Patient Detail</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                      <p className="font-medium text-black">First Name</p>
                      <p className="text-gray-600">Ekkarat</p>
                  </div>
                  <div>
                      <p className="font-medium text-black">Last Name</p>
                      <p className="text-gray-600">Singkhala</p>
                  </div>
                  <div>
                      <p className="font-medium text-black">Gender</p>
                      <p className="text-gray-600">Male</p>
                  </div>
                  <div>
                      <p className="font-medium text-black">Nationality</p>
                      <p className="text-gray-600">Thai</p>
                  </div>
                  <div>
                      <p className="font-medium text-black">Date of Birth</p>
                      <p className="text-gray-600">10-10-1990</p>
                  </div>
                  <div>
                      <p className="font-medium text-black">Passport ID</p>
                      <p className="text-gray-600">AB-365-134-1345</p>
                  </div>
              </div>
          </CardContent>
      </Card></div>
  )
}

export default PatientDetails