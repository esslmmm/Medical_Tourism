import React from 'react'
import { useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';


const ContactDetails = () => {
    const [formData, setFormData] = useState({
        firstName: 'Ekkarat',
        lastName: 'Singhkha',
        email: '653150137@lamduan.mfu.ac.th',
        country: 'Thailand',
        phoneCode: '+66',
        phoneNumber: '812511440',
        gender: 'Male',
        nationality: 'Thai',
        birthDate: '10-10-1990',
        passportId: 'AB-365-134-1345',
    });
    const [isEditingPatient, setIsEditingPatient] = useState(false);

    const handleEditTogglePatient = () => {
        setIsEditingPatient(!isEditingPatient);
    };
  return (
      <div><div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h2 className="text-lg font-semibold mb-4 text-black border-b border-gray-300 pb-2 flex justify-between">
              Patient detail
              <PencilSquareIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={handleEditTogglePatient} />
          </h2>
          {isEditingPatient ? (
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-black">First Name</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.firstName} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-black">Last Name</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.lastName} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-black">Gender</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.gender} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-black">Nationality</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.nationality} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-black">Date of Birth</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.birthDate} />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-black">Passport ID</label>
                      <input className="border p-2 rounded text-black" defaultValue={formData.passportId} />
                  </div>
                  <button className="col-span-2 bg-blue-500 text-white p-2 rounded" onClick={handleEditTogglePatient}>Confirm</button>
              </div>
          ) : (
              <div className="grid grid-cols-2 gap-4">
                  <div>
                      <p className="text-sm font-medium text-black">First Name</p>
                      <p className="text-black">{formData.firstName}</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-black">Last Name</p>
                      <p className="text-black">{formData.lastName}</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-black">Gender</p>
                      <p className="text-black">{formData.gender}</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-black">Nationality</p>
                      <p className="text-black">{formData.nationality}</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-black">Date of Birth</p>
                      <p className="text-black">{formData.birthDate}</p>
                  </div>
                  <div>
                      <p className="text-sm font-medium text-black">Passport ID</p>
                      <p className="text-black">{formData.passportId}</p>
                  </div>
              </div>
          )}
      </div></div>
  )
}

export default ContactDetails