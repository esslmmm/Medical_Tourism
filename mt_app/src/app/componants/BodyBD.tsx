"use client";

import { useState } from "react";

export default function MedicalForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        phone: "",
        gender: "male",
        patientFirstName: "",
        patientLastName: "",
        dob: "",
        nationality: "",
        passport: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-3 gap-6">
                {/* Left Column: Contact & Patient Details */}
                <div className="col-span-2 space-y-6">
                    {/* Contact Detail */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-black">Contact Detail</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/** First Name */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Last Name */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Email */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Country */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Phone */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Patient Detail */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4 text-black">Patient Detail</h2>

                        {/* Gender - Moved Label to Top Left */}
                        <div>
                            <label className="text-sm text-gray-500">Gender</label>
                            <div className="flex space-x-4 text-black">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === "male"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Male
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === "female"}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Female
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {/** Patient First Name */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">First Name</label>
                                <input
                                    type="text"
                                    name="patientFirstName"
                                    value={formData.patientFirstName}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Patient Last Name */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Last Name</label>
                                <input
                                    type="text"
                                    name="patientLastName"
                                    value={formData.patientLastName}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Date of Birth */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Nationality */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Nationality</label>
                                <input
                                    type="text"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>

                            {/** Passport ID */}
                            <div className="relative">
                                <label className="absolute text-sm text-gray-500 top-1 left-2">Passport ID</label>
                                <input
                                    type="text"
                                    name="passport"
                                    value={formData.passport}
                                    onChange={handleChange}
                                    className="border p-3 w-full rounded pt-6 text-black"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Button - Positioned Correctly */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Continue
                    </button>
                </div>

                {/* Right Column: Medical Service & Place to Visit */}
                <div className="space-y-6">
                    {/* Medical Service */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-bold text-black">Medical Service</h2>
                        <p className="text-gray-700 mt-2">Appointment - Sat, Feb 8, 2025</p>
                        <p className="text-gray-600">Time: 10:00-12:00</p>
                        <p className="text-gray-600">MFU Hospital - Medical Checkup</p>
                    </div>

                    {/* Place to Visit */}
                    <div className="border p-6 rounded-lg">
                        <h2 className="text-xl font-bold text-black">Place to Visit</h2>
                        <p className="text-gray-700 mt-2">Sat, Feb 2, 2025</p>
                        <p className="text-gray-600">Wat Long Khun - 1:00 PM - 3:00 PM</p>
                        <p className="text-gray-600">Wat Long Khun - 3:00 PM - 5:00 PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}








// "use client";

// import { useState } from "react";

// export default function MedicalForm() {
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         country: "",
//         phone: "",
//         gender: "male",
//         patientFirstName: "",
//         patientLastName: "",
//         dob: "",
//         nationality: "",
//         passport: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form Data Submitted:", formData);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-3 gap-6">
//                 {/* Left Column: Contact & Patient Details */}
//                 <div className="col-span-2 space-y-6">
//                     {/* Contact Detail */}
//                     <div className="border p-6 rounded-lg">
//                         <h2 className="text-xl font-bold mb-4 text-black">Contact Detail</h2>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="text-sm text-gray-500">First Name</label>
//                                 <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Last Name</label>
//                                 <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Email</label>
//                                 <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Country</label>
//                                 <input type="text" name="country" value={formData.country} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Phone</label>
//                                 <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                         </div>
//                     </div>
//                     {/* Patient Detail */}
//                     <div className="border p-6 rounded-lg">
//                         <h2 className="text-xl font-bold mb-4 text-black">Patient Detail</h2>
//                         <div>
//                             <label className="text-sm text-gray-500">Gender</label>
//                             <div className="flex space-x-4 text-black">
//                                 <label className="flex items-center">
//                                     <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} className="mr-2" /> Male
//                                 </label>
//                                 <label className="flex items-center">
//                                     <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} className="mr-2" /> Female
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4 mt-4">
//                             <div>
//                                 <label className="text-sm text-gray-500">First Name</label>
//                                 <input type="text" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-gray-500">Last Name</label>
//                                 <input type="text" name="patientLastName" value={formData.patientLastName} onChange={handleChange} className="border p-3 w-full rounded text-black" />
//                             </div>
//                         </div>
//                     </div>
//                     <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full">Continue</button>
//                 </div>
//                 {/* Right Column: Medical Service & Place to Visit */}
//                 <div className="space-y-6">
//                     <div className="border p-6 rounded-lg">
//                         <h2 className="text-xl font-bold text-black">Medical Service</h2>
//                         <img src="/medical_service.jpg" alt="Medical Service" className="w-full h-32 object-cover rounded-lg mt-2" />
//                         <p className="text-gray-700 mt-2">Appointment - Sat, Feb 8, 2025</p>
//                         <p className="text-gray-600">Time: 10:00-12:00</p>
//                         <p className="text-gray-600">MFU Hospital - Medical Checkup</p>
//                     </div>
//                     <div className="border p-6 rounded-lg">
//                         <h2 className="text-xl font-bold text-black">Place to Visit</h2>
//                         <img src="/place_to_visit.jpg" alt="Place to Visit" className="w-full h-32 object-cover rounded-lg mt-2" />
//                         <p className="text-gray-700 mt-2">Sat, Feb 2, 2025</p>
//                         <p className="text-gray-600">Wat Long Khun - 1:00 PM - 3:00 PM</p>
//                         <p className="text-gray-600">Wat Long Khun - 3:00 PM - 5:00 PM</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
