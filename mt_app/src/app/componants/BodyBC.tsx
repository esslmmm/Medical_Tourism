'use client';

import React from 'react';
import ContactDetails from './BookingConfirm/ContactDetails';
import PatientDetails from './BookingConfirm/PatientDetails';
import MedicalService from './BookingConfirm/MedicalService';
import ConfirmButton from './BookingConfirm/ConfirmButton';

export default function ConfirmBody() {
    return (
        <div className="flex justify-center bg-gray-100 py-10 px-6">
            <div className="w-full max-w-6xl grid grid-cols-3 gap-8">

                {/* Left Section: Contact & Patient Details */}
                <div className="col-span-2">
                    {/* Contact Details */}
                    <ContactDetails />
                    {/* Patient Details */}
                    <PatientDetails />

                    {/* Confirm Button */}
                    <ConfirmButton />
                </div>

                {/* Right Section: Medical Services & Places to Visit */}
                <div className="w-full">

                    {/* Medical Service */}
                    <MedicalService />

                    {/* Place to Visit */}
                    <div className="bg-white p-6 rounded-lg shadow border">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Place to Visit</h3>
                        <p className="text-gray-600 font-medium">Sat, 8 FEB 2025</p>

                        {/* First Place */}
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="text-gray-800 font-semibold">Wat Long Khun</p>
                                <p className="text-gray-600 text-sm">Time: 1:00 PM - 3:00 PM</p>
                            </div>
                        </div>

                        {/* Second Place */}
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="text-gray-800 font-semibold">Wat Long Khun</p>
                                <p className="text-gray-600 text-sm">Time: 3:00 PM - 5:00 PM</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 my-6">
                        <h3 className="font-semibold text-black">Accommodation</h3>
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="font-semibold text-black">Chiang Rai Hotel</p>
                                <p className="text-sm text-black">8 Feb 2025 - 10 Feb 2025 | 2 Nights</p>
                                <p className="text-sm text-black">1 x Sweet Dream Room (90m²)</p>
                                <p className="text-sm text-black">Guest(s): 1 Adult</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h3 className="font-semibold text-black">Interpreter</h3>
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="font-semibold text-black">Wan Lucas</p>
                                <p className="text-sm text-black">English to Thai Language</p>
                                <p className="text-sm text-black">1 - 5 FEB 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-black">Car Service</h3>
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="font-semibold text-black">In Plan</p>
                                <p className="text-sm text-black">1 - 5 FEB 2025</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-right">
                        <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">Show all details</a>
                    </div>
                </div>

            </div>
        </div>
    );
}
