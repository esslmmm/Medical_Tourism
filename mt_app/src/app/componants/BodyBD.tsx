"use client";

import { useState } from "react";

export default function MedicalForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        phone: "",
        purpose: "",
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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
            <h2 className="text-xl font-bold mb-4">Contact Detail</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Contact Details */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="purpose"
                        placeholder="Purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                </div>

                {/* Patient Details */}
                <h2 className="text-xl font-bold mt-6">Patient Detail</h2>
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

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="patientFirstName"
                        placeholder="First Name"
                        value={formData.patientFirstName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="patientLastName"
                        placeholder="Last Name"
                        value={formData.patientLastName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="nationality"
                        placeholder="Nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                    <input
                        type="text"
                        name="passport"
                        placeholder="Passport ID"
                        value={formData.passport}
                        onChange={handleChange}
                        className="border p-2 w-full rounded text-black"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
