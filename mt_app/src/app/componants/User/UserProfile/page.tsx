'use client';
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";

export default function UserProfile() {
    const [user, setUser] = useState({
        name: "Ekkarat Singkhala",
        phone: "+66 819320420",
        email: "6531501137@lamduan.mfu.ac.th",
        password: "**********",
    });
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");

    const handleEditClick = (field) => {
        setEditingField(field);
        setTempValue(user[field]);
    };

    const handleSave = () => {
        setUser({ ...user, [editingField]: tempValue });
        setEditingField(null);
    };

    return (
        <div className="flex full-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col">
                <nav className="mt-8">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <MdOutlineEventAvailable size={18} />
                            <span>My bookings</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaStar size={18} />
                            <span>Reviews</span>
                        </li>
                        <li className="flex items-center space-x-3 text-black bg-black text-white p-2 rounded-lg cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer relative">
                            <FaRegCommentDots size={18} />
                            <span>Chat</span>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Profile Section */}
            <main className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-10 rounded-lg shadow-lg w-[500px] text-center">
                    <div className="relative w-28 h-28 mx-auto">
                        <div className="w-28 h-28 rounded-full mx-auto border bg-gray-300"></div>
                        {/* <img src="/profile1.jpg" alt="Profile" className="w-full h-full rounded-full border" /> */}
                        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
                            <FiEdit2 className="text-gray-600 cursor-pointer" size={16} />
                        </div>
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
            </main>
        </div>
    );
}
