'use client';
import { useState } from 'react';

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phoneCode: '',
        phoneNumber: '',
        gender: '',
        patientFirstName: '',
        patientLastName: '',
        birthDate: '',
        passportId: '',
    });

    return (
        <div className="flex min-h-screen bg-gray-100 p-10">
            {/* Left Form Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h2 className="text-lg font-semibold mb-4 text-black">Contact detail</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black">First Name</label>
                        <input type="text" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Last Name</label>
                        <input type="text" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Email</label>
                        <input type="email" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Country</label>
                        <select className="border p-2 rounded-lg w-full text-black text-black">
                            <option>Country</option>
                        </select>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-black">Phone</label>
                            <select className="border p-2 rounded-lg w-full text-black">
                                <option>Country code</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <input type="text" className="border p-2 rounded-lg w-full text-black" placeholder="Number" />
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-4 text-black">Patient detail</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black">Gender</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-black">
                                <input type="radio" name="gender" value="male" /> Male
                            </label>
                            <label className="flex items-center gap-2 text-black">
                                <input type="radio" name="gender" value="female" /> Female
                            </label>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">First Name</label>
                        <input type="text" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Last Name</label>
                        <input type="text" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Date of Birth</label>
                        <input type="date" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-black">Passport ID</label>
                        <input type="text" className="border p-2 rounded-lg w-full text-black" />
                    </div>
                </div>
                <button className="bg-blue-600 text-white p-2 rounded-lg mt-4 w-full">Continue</button>
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
