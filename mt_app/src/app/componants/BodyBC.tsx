'use client';

import React from 'react';

export default function ConfirmBody() {
    return (
        <div className="flex justify-center bg-gray-100 py-10 px-6">
            <div className="w-full max-w-6xl grid grid-cols-3 gap-8">

                {/* Left Section: Contact & Patient Details */}
                <div className="col-span-2">

                    {/* Contact Detail */}
                    <div className="bg-white p-6 rounded-lg shadow border mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Detail</h2>
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
                                <p className="font-medium">Country</p>
                                <p>Thailand</p>
                            </div>
                            <div>
                                <p className="font-medium">Phone</p>
                                <p>+66 872311430</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-medium">Email</p>
                                <p>620501231@lamduan.mfu.ac.th</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Detail */}
                    <div className="bg-white p-6 rounded-lg shadow border mb-6">
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
                    </div>

                    {/* Confirm Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300">
                        Confirm
                    </button>
                </div>

                {/* Right Section: Medical Services & Places to Visit */}
                <div className="w-full">

                    {/* Medical Service */}
                    <div className="bg-white p-6 rounded-lg shadow border mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical Service</h3>
                        <div className="flex items-center mt-4">
                            <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            <div>
                                <p className="text-black font-bold"><span className="font-bold">Appointment:</span> Sat, Feb 8, 2025</p>
                                <p className="text-gray-600"><span className="font-medium">Time:</span> 9:00 AM - 12:00 PM</p>
                                <p className="text-gray-600"><span className="font-medium">Service:</span> Medical Check-up</p>
                            </div>
                        </div>
                    </div>

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
