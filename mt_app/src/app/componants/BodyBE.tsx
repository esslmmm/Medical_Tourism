'use client';
import { useState } from 'react';

export default function AppointmentForm() {
    const [formData] = useState({
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

    return (
        <div className="flex min-h-screen bg-gray-100 p-10">
            {/* Left Form Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h2 className="text-lg font-semibold mb-4 text-black border-b border-gray-300 pb-2">Contact detail</h2>
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
                        <p className="text-sm font-medium text-black">Email</p>
                        <p className="text-black">{formData.email}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-black">Country</p>
                        <p className="text-black">{formData.country}</p>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-black">Phone</p>
                            <p className="text-black">{formData.phoneCode} {formData.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <h2 className="text-lg font-semibold mb-4 text-black border-b border-gray-300 pb-2">Patient detail</h2>
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
            </div>

            {/* Right Sidebar Section */}
            <div className="w-1/3 ml-6">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                    <div>
                        <h3 className="font-semibold text-black">Medical Service</h3>
                        <p className="text-sm text-black">Appointment - Sat, Feb 8, 2025</p>
                        <p className="text-sm text-black">Time - 9:00 - 12:00</p>
                        <p className="text-sm text-black">Service: Medical check-up</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-black">Place to Visit</h3>
                    <p className="text-sm text-black">Sat, 8 FEB 2025</p>
                    <div className="flex items-center mt-4">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <p className="font-semibold text-black">Wat Long Khun</p>
                            <p className="text-sm text-black">Time: 1:00 PM - 3:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <p className="font-semibold text-black">Wat Long Khun</p>
                            <p className="text-sm text-black">Time: 3:00 PM - 5:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




