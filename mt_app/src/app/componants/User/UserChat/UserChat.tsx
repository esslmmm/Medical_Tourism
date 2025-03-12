'use client';
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar, FaPaperclip } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoSend } from "react-icons/io5";

export default function UserChat() {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm interested in medical tourism and would like to learn more about the process and options available.", sender: "user" },
        { text: "Hello! I'd be happy to assist you. Medical tourism typically involves traveling to another country for medical treatment. What type of treatment or procedure are you considering?", sender: "other" },
        { text: "I'm looking into dental implants. Do you have any recommendations for affordable destinations with good quality care?", sender: "user" },
        { text: "For dental implants, popular destinations include Mexico, Thailand, and Turkey. These countries offer high-quality care at lower costs compared to many Western countries. Would you like more details on clinics and pricing?", sender: "other" },
        { text: "Mexico sounds great! Could you provide more information on the clinics and how the booking process works?", sender: "user" },
        { text: "Typing...", sender: "other" }
    ]);

    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim() !== "") {
            setMessages([...messages, { text: message, sender: "user" }]);
            setMessage("");
        }
    };

    return (
        <div className="flex h-screen">
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
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-black bg-black text-white p-2 rounded-lg cursor-pointer">
                            <FaRegCommentDots size={18} />
                            <span>Chat for Service</span>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Chat Section */}
            <main className="flex-1 bg-gray-50 flex flex-col p-6">
                <div className="text-center text-gray-500 text-sm mb-4">Today, 9 Mar</div>
                <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start items-center'}`}>
                            {msg.sender === 'other' && (
                                <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                            )}
                            <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t bg-white flex items-center">
                    <FaPaperclip size={20} className="text-gray-600 cursor-pointer mr-3" />
                    <input
                        type="text"
                        className="flex-1 p-2 border rounded-lg text-black"
                        placeholder="Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage} className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-lg">
                        <IoSend size={20} />
                    </button>
                </div>
            </main>
        </div>
    );
}
