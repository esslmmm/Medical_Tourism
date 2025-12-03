"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Footer from '@/components/User/Main/Footer';
import { Navbar } from '@/components/User/Main/AuthenticatedNavbar';

const Contact_Us = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("+95 "); // default code
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


    // Define the country codes as an array
const countryPhoneCodes = [
  { code: "+95", name: "Myanmar" },
  { code: "+66", name: "Thailand" },
  { code: "+971", name: "UAE"},
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK"},
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan"},
  { code: "+82", name: "South Korea" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
];

    // Validate form fields before enabling submit
    const isFormValid =
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        phoneNumber.trim() &&
        country.trim() &&
        type.trim() &&
        message.trim() &&
        agreed;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (loading) return;
        setLoading(true);

        try {
            // Split phoneNumber into dial code and local number
        const [dialCode, ...localNumberParts] = phoneNumber.split(" ");
        const localNumber = localNumberParts.join(""); // remove any spaces in local number
        const formattedPhoneNumber = `${dialCode}${localNumber}`;

            await axios.post('/api/contact_us', {
                firstName,
                lastName,
                email,
                phoneNumber,
                country,
                type,
                message,
            });

                    // Show success modal
        setShowSuccessModal(true);

        // Clear form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('+95 ');
        setCountry('');
        setType('');
        setMessage('');
        setAgreed(false);
        router.refresh
        
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">Get In Touch</h2>
                        <p className="text-gray-600 text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-300">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* First Name */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                            focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                            transition-all duration-200 outline-none"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                            focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                            transition-all duration-200 outline-none"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                            focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                            transition-all duration-200 outline-none"
                                        placeholder="john.doe@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Phone Number */}
<div className="relative w-full max-w-md">
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Phone Number<span className="text-red-500">*</span>
  </label>

  <div className="flex gap-3">
    {/* Country Code Dropdown */}
    <div className="relative w-20">
      <button
        onClick={() => setShowCountryMenu(!showCountryMenu)}
        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 flex justify-between items-center focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
      >
        {phoneNumber.split(" ")[0] || "+95"}
        <span className="ml-2">&#9662;</span> {/* Down arrow */}
      </button>

      {showCountryMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10 overflow-hidden">
          {countryPhoneCodes.map((country) => (
            <button
              key={country.code}
              onClick={() => {
                const rest = phoneNumber.replace(/^\+\d+\s?/, "");
                setPhoneNumber(`${country.code} ${rest}`);
                setShowCountryMenu(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                phoneNumber.split(" ")[0] === country.code
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              ({country.code}) {country.name}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Local Number */}
    <input
      type="tel"
      className="flex-1 border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                 transition-all duration-200 outline-none"
      placeholder="123 456 789"
      onChange={(e) => {
        const raw = e.target.value;
        const currentCode = phoneNumber.split(" ")[0] || "+95";
        setPhoneNumber(`${currentCode} ${raw}`);
      }}
    />
  </div>
</div>



                                {/* Country */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Country<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                            focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                            transition-all duration-200 outline-none cursor-pointer"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="">Select your country</option>
                                        <option value="myanmar">Myanmar</option>
                                        <option value="thailand">Thailand</option>
                                        <option value="arab">United Arab Emirates</option>
                                    </select>
                                </div>

                                {/* Inquiry Type */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Inquiry Type<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                            focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                            transition-all duration-200 outline-none cursor-pointer"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="">Select inquiry type</option>
                                        <option value="support">Support</option>
                                        <option value="partner">Partner</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    How can we help you?<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-900 
                                        focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 
                                        transition-all duration-200 outline-none resize-none"
                                    rows={5}
                                    placeholder="Tell us about your inquiry..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                                    By proceeding with this booking, I agree to Medical Tourism's{" "}
                                    <a href="#" className="text-blue-600 font-medium underline">Terms of Use</a> and{" "}
                                    <a href="#" className="text-blue-600 font-medium underline">Privacy Policy</a>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`w-full bg-teal-500 text-white font-semibold py-4 px-8 rounded-lg shadow-lg 
                                    transition-all duration-200
                                    ${(!isFormValid || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl active:scale-95'}
                                `}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-8">
                        Need immediate assistance? Call us at <span className="font-semibold text-gray-700">+66 81-123-4567</span>
                    </p>
                </div>
            </div>
            {showSuccessModal && (
  <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-3">🎉 Message Sent!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for contacting us. We will get back to you shortly.
      </p>
      <button
        onClick={() => setShowSuccessModal(false)}
        className="bg-teal-500 text-white py-2 px-6 rounded-lg font-semibold transition hover:bg-teal-600"
      >
        Close
      </button>
    </div>
  </div>
)}

            <Footer />
        </div>
    );
};

export default Contact_Us;
