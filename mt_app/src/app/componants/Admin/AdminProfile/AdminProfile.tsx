


'use client';
import { SetStateAction, useState } from 'react';
import { FaRegUser, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiPackage, FiUsers, FiGlobe, FiEdit2 } from "react-icons/fi";

export default function UserProfile() {
    const [user, setUser] = useState({
        name: "Ekkarat Singkhala",
        phone: "+66 819320420",
        email: "6531501137@lamduan.mfu.ac.th",
        password: "**********",
    });
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const handleEditClick = (field: string | SetStateAction<null>) => {
        setEditingField(field);
        setTempValue(user[field]);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField]: tempValue });
        setEditingField(null);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col">
                <h2 className="text-2xl font-semibold text-teal-600">Medical <br /> Tourism</h2>
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 text-black bg-gray-100 p-2 rounded-lg cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <MdOutlineEventAvailable size={18} />
                            <span>Booking Management</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
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
                    <span>Log out</span>
                </div>
            </aside> 

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 flex flex-col p-6">
                {/* Top Right Profile */}
                <div className="p-4 flex justify-end border-b bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <div className="font-semibold text-black">Ekkarat Singkhala</div>
                            <div className="text-sm text-black">Admin</div>
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="bg-white p-10 rounded-lg shadow-lg w-[600px] text-center">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full mx-auto border bg-gray-300"></div>
                            {/* <img src="/profile1.jpg" alt="Profile" className="w-28 h-28 rounded-full mx-auto border" /> */}
                        </div>
                        <div className="mt-6 text-left space-y-6">
                            {["name", "phone", "email", "password"].map((field, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2">
                                    <div>
                                        <p className="text-gray-600 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                        {editingField === field ? (
                                            <input
                                                type="text"
                                                className="border p-2 w-full rounded text-black"
                                                value={tempValue}
                                                onChange={(e) => setTempValue(e.target.value)}
                                            />
                                        ) : (
                                            <p className="text-black text-lg">{user[field]}</p>
                                        )}
                                    </div>
                                    {editingField === field ? (
                                        <button className="text-teal-600 font-semibold" onClick={handleSave}>Save</button>
                                    ) : (
                                        <FiEdit2 className="text-gray-600 cursor-pointer" size={18} onClick={() => handleEditClick(field)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
