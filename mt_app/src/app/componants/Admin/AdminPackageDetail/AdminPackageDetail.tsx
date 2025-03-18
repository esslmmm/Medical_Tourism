'use client';
import { useState } from 'react';
import { FaRegUser, FaEdit } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiPackage, FiUsers, FiGlobe } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import { AiOutlineCar } from "react-icons/ai";
import { GiHospital, GiConfirmed, GiWorld } from "react-icons/gi";
import { MdPlace, MdMedicalServices } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import Image from 'next/image';

export default function PackageManagement() {
    const [selectedDay, setSelectedDay] = useState("Day 1");
    const [isEditing, setIsEditing] = useState(false);
    const [packageData, setPackageData] = useState({
        name: "Suk Jai Package",
        type: "Medical Tourism",
        expired: "No limit"
    });
    const [isEditingMedical, setIsEditingMedical] = useState(false);
    const [medicalData, setMedicalData] = useState({
        hospitalName: "Mae Fah Luang Hospital Center",
        medicalType: "Medical Check-up",
        image: "check-up.png",
        description: "Medical Check-up Services\n- General health screening (blood tests, cholesterol, diabetes check, etc.)\n- Physical examination by a certified doctor.\n- ECG (heart test) and check X-ray.\n- Ultrasound or other diagnostic tests.\n- Consultation and convenience services.\n- Accommodation – 3 to 5-star hotel options nearby the hospital.\n- Sightseeing & Tourism Package."
    });
    const [isEditingAccommodation, setIsEditingAccommodation] = useState(false);
    const [accommodationData, setAccommodationData] = useState([
        { name: "Chiang Rai Hotel", image: "chiang-rai-hotel.jpg" },
        { name: "Phuket Hotel", image: "phuket-hotel.jpg" },
        { name: "Bangkok Hotel", image: "bangkok-hotel.jpg" }
    ]);
    const [isEditingPlaces, setIsEditingPlaces] = useState(false);
    const [placesData, setPlacesData] = useState([
        { name: "Wat Rong Khun", image: "wat-rong-khun.jpg", time: "1:00 PM - 3:00 PM" },
        { name: "Waterfall", image: "waterfall.jpg", time: "3:00 PM - 5:00 PM" }
    ]);
    const [isEditingInterpreters, setIsEditingInterpreters] = useState(false);
    const [interpreterData, setInterpreterData] = useState([
        { name: "Vanessa Leiva", role: "Arabic Interpreter", image: "interpreter-arabic.jpg" },
        { name: "Rayji De Guia", role: "Burmese Interpreter", image: "interpreter-burmese.jpg" },
        { name: "Sek Han Foo", role: "Chinese Interpreter", image: "interpreter-chinese.jpg" }
    ]);
    const [isEditingCarService, setIsEditingCarService] = useState(false);
    const [carServiceData, setCarServiceData] = useState([
        { name: "Rayji De Guia", role: "Car", image: "car-service-car.jpg" },
        { name: "Sek Han Foo", role: "Van", image: "car-service-van.jpg" }
    ]);
    return (
        <div className="flex full-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col">
                <h2 className="text-2xl font-semibold text-teal-600">Medical <br /> Tourism</h2>
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <MdOutlineEventAvailable size={18} />
                            <span>Booking Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-black bg-gray-100 p-2 rounded-lg cursor-pointer">
                            <FiPackage size={18} />
                            <span>Package Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FiUsers size={18} />
                            <span>User Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FiGlobe size={18} />
                            <span>Public Relationship Management</span>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                    <HiOutlineLogout size={18} />
                    <span>Log in</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-6">
                {/* Top Right Profile */}
                <div className="flex justify-end items-center border-b pb-4">
                    <div className="flex items-center space-x-3">
                        <img src="/profile.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
                        <div>
                            <div className="font-semibold text-black">Ekkarat Singkhala</div>
                            <div className="text-sm text-gray-500">Senior Admin</div>
                        </div>
                    </div>
                </div>

                {/* Package Services */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <div className="flex justify-between">
                        {[{ label: 'Timeline', icon: GiConfirmed }, { label: 'Package', icon: FiPackage }, { label: 'Medical Service', icon: MdMedicalServices }, { label: 'Accommodation', icon: FaHotel }, { label: 'Place to Visit', icon: MdPlace }, { label: 'Interpreter', icon: GiWorld }, { label: 'Car Service', icon: AiOutlineCar }].map((service, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <service.icon size={30} className="text-gray-600" />
                                <p className="text-sm text-gray-800 mt-2">{service.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h3 className="text-lg font-semibold text-black">Timeline</h3>
                    <div className="flex space-x-2 mt-2 text-black">
                        {["Day 1", "Day 2", "Day 3", "All trip"].map((day) => (
                            <button
                                key={day}
                                className={`px-4 py-2 rounded-lg text-sm ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Package Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold text-black">Package</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {isEditing ? (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold">Name:</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded-lg w-full"
                                        value={packageData.name}
                                        onChange={(e) => setPackageData({ ...packageData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Type:</label>
                                    <select
                                        className="border p-2 rounded-lg w-full"
                                        value={packageData.type}
                                        onChange={(e) => setPackageData({ ...packageData, type: e.target.value })}
                                    >
                                        <option>Medical Tourism</option>
                                        <option>General Checkup</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Expired:</label>
                                    <select
                                        className="border p-2 rounded-lg w-full"
                                        value={packageData.expired}
                                        onChange={(e) => setPackageData({ ...packageData, expired: e.target.value })}
                                    >
                                        <option>No limit</option>
                                        <option>1 Year</option>
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <p><span className="font-semibold">Name:</span> {packageData.name}</p>
                                <p><span className="font-semibold">Type:</span> {packageData.type}</p>
                                <p><span className="font-semibold">Expired:</span> {packageData.expired}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Medical Service */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold">Medical Service</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditingMedical(!isEditingMedical)}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {isEditingMedical ? (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold">Hospital Name:</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded-lg w-full"
                                        value={medicalData.hospitalName}
                                        onChange={(e) => setMedicalData({ ...medicalData, hospitalName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Medical Type:</label>
                                    <select
                                        className="border p-2 rounded-lg w-full"
                                        value={medicalData.medicalType}
                                        onChange={(e) => setMedicalData({ ...medicalData, medicalType: e.target.value })}
                                    >
                                        <option>Medical Check-up</option>
                                        <option>Surgical Procedure</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Image:</label>
                                    <input
                                        type="text"
                                        className="border p-2 rounded-lg w-full"
                                        value={medicalData.image}
                                        onChange={(e) => setMedicalData({ ...medicalData, image: e.target.value })}
                                    />
                                </div>
                                <Image src={`/${medicalData.image}`} alt="Medical Check-up" width={300} height={200} className="rounded-lg mt-2" />
                                <div>
                                    <label className="block text-sm font-semibold">Description:</label>
                                    <textarea
                                        className="border p-2 rounded-lg w-full"
                                        rows="5"
                                        value={medicalData.description}
                                        onChange={(e) => setMedicalData({ ...medicalData, description: e.target.value })}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p><span className="font-semibold">Hospital Name:</span> {medicalData.hospitalName}</p>
                                <p><span className="font-semibold">Medical Type:</span> {medicalData.medicalType}</p>
                                <p><span className="font-semibold">Image:</span> {medicalData.image}</p>
                                <Image src={`/${medicalData.image}`} alt="Medical Check-up" width={300} height={200} className="rounded-lg mt-2" />
                                <p className="mt-4"><span className="font-semibold">Description:</span></p>
                                <p className="bg-gray-100 p-4 rounded-lg text-sm whitespace-pre-line">{medicalData.description}</p>
                            </>
                        )}
                    </div>
                </div>
                {/* Accommodation Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold">Accommodation</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditingAccommodation(!isEditingAccommodation)}
                    />
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        {accommodationData.map((hotel, index) => (
                            <div key={index} className="text-center">
                                {isEditingAccommodation ? (
                                    <>
                                        <label className="block text-sm font-semibold">Hotel Name:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={hotel.name}
                                            onChange={(e) => {
                                                const updatedHotels = [...accommodationData];
                                                updatedHotels[index].name = e.target.value;
                                                setAccommodationData(updatedHotels);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <p className="font-semibold">{hotel.name}</p>
                                )}
                                <Image src={`/${hotel.image}`} alt={hotel.name} width={250} height={150} className="rounded-lg shadow-md mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Place to Visit Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold">Place To Visit</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditingPlaces(!isEditingPlaces)}
                    />
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        {placesData.map((place, index) => (
                            <div key={index} className="text-center">
                                {isEditingPlaces ? (
                                    <>
                                        <label className="block text-sm font-semibold">Place Name:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={place.name}
                                            onChange={(e) => {
                                                const updatedPlaces = [...placesData];
                                                updatedPlaces[index].name = e.target.value;
                                                setPlacesData(updatedPlaces);
                                            }}
                                        />
                                        <label className="block text-sm font-semibold">Time:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={place.time}
                                            onChange={(e) => {
                                                const updatedPlaces = [...placesData];
                                                updatedPlaces[index].time = e.target.value;
                                                setPlacesData(updatedPlaces);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold">{place.name}</p>
                                        <p className="text-sm text-gray-600">{place.time}</p>
                                    </>
                                )}
                                <Image src={`/${place.image}`} alt={place.name} width={250} height={150} className="rounded-lg shadow-md mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Interpreter Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold">Interpreter</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditingInterpreters(!isEditingInterpreters)}
                    />
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        {interpreterData.map((interpreter, index) => (
                            <div key={index} className="text-center border rounded-lg p-4 shadow-md">
                                {isEditingInterpreters ? (
                                    <>
                                        <label className="block text-sm font-semibold">Interpreter Role:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={interpreter.role}
                                            onChange={(e) => {
                                                const updatedInterpreters = [...interpreterData];
                                                updatedInterpreters[index].role = e.target.value;
                                                setInterpreterData(updatedInterpreters);
                                            }}
                                        />
                                        <label className="block text-sm font-semibold">Interpreter Name:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={interpreter.name}
                                            onChange={(e) => {
                                                const updatedInterpreters = [...interpreterData];
                                                updatedInterpreters[index].name = e.target.value;
                                                setInterpreterData(updatedInterpreters);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold">{interpreter.role}</p>
                                        <p className="text-sm text-gray-700">{interpreter.name}</p>
                                    </>
                                )}
                                <Image src={`/${interpreter.image}`} alt={interpreter.name} width={100} height={100} className="rounded-full mx-auto mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Car Service Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6 relative text-black">
                    <h3 className="text-lg font-semibold">Car Service</h3>
                    <FaEdit
                        size={18}
                        className="absolute top-6 right-6 text-gray-500 cursor-pointer"
                        onClick={() => setIsEditingCarService(!isEditingCarService)}
                    />
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        {carServiceData.map((service, index) => (
                            <div key={index} className="text-center border rounded-lg p-4 shadow-md">
                                {isEditingCarService ? (
                                    <>
                                        <label className="block text-sm font-semibold">Service Type:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={service.role}
                                            onChange={(e) => {
                                                const updatedServices = [...carServiceData];
                                                updatedServices[index].role = e.target.value;
                                                setCarServiceData(updatedServices);
                                            }}
                                        />
                                        <label className="block text-sm font-semibold">Driver Name:</label>
                                        <input
                                            type="text"
                                            className="border p-2 rounded-lg w-full mb-2"
                                            value={service.name}
                                            onChange={(e) => {
                                                const updatedServices = [...carServiceData];
                                                updatedServices[index].name = e.target.value;
                                                setCarServiceData(updatedServices);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold">{service.role}</p>
                                        <p className="text-sm text-gray-700">{service.name}</p>
                                    </>
                                )}
                                <Image src={`/${service.image}`} alt={service.name} width={100} height={100} className="rounded-full mx-auto mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
