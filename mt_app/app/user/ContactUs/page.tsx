"use client";

import FirstInputs from '../../../components/user_components/ContactUs/FirstInputs';
import SecondInputs from '../../../components/user_components/ContactUs/SecondInputs';
// import NavbarContactUs from "../../../components/user_components/ContactUs/NavbarContactUs";
// import Footer from "../../../components/user_components/ContactUs/Footer";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Contact_Us = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Prevent multiple clicks
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        
        
        if (loading) return; // Avoid duplicate requests
        setLoading(true);

        try {
            const response = await axios.post('/api/contact_us', {
                firstName,
                lastName,
                email,
                phoneNumber,
                country,
                type,
                message,
            });

            console.log("Success:", response.data);
            router.refresh(); // Redirect on success
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center py-12 px-4 bg-gray-200 text-black">
            <h2 className="text-2xl font-semibold mb-6">Send us an Email</h2>
            <form className="w-full max-w-3xl space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">First Name*</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name*</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number*</label>
                        <input
                            type="tel"
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Country*</label>
                        <select
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value="">Select a country</option>
                            <option value="myanmar">Myanmar</option>
                            <option value="thailand">Thailand</option>
                            <option value="arab">Arab</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Type*</label>
                        <select
                            className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Select a type</option>
                            <option value="medical">Medical</option>
                            <option value="booking">Booking</option>
                            <option value="support">Support</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">How can we help you?</label>
                    <textarea
                        className="mt-1 block w-full border rounded-md p-2 bg-white text-black"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" required className="text-black" />
                    <label htmlFor="terms" className="text-sm">
                        By proceeding with this booking, I agree to Medical Tourism {" "}
                        <a href="#" className="underline">Terms of Use</a> and {" "}
                        <a href="#" className="underline">Privacy Policy</a>.
                    </label>
                </div>
                <button
                    type="submit"
                    className={`bg-black text-white py-2 px-6 rounded-md ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 focus:ring focus:ring-gray-400'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Contact_Us;
