'use client';
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaPlus } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";

export default function UserDetail() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState("");

    const chats = [
        {
            id: 1, name: "Ekkarat Singkhala", role: "Junior Staff", image: "/profile1.jpg", messages: [
                { text: "Hello! How can I assist you today?", sender: "other" },
                { text: "I'm looking for dental implants...", sender: "user" },
                { text: "For dental implants, Mexico and Hungary are great options!", sender: "other" }
            ]
        },
        {
            id: 2, name: "Sondeth Singkhala", role: "Customer", image: "/profile2.jpg", messages: [
                { text: "Can you help me book an appointment?", sender: "user" },
                { text: "Of course! What procedure are you looking for?", sender: "other" }
            ]
        }
    ];

    const sendMessage = () => {
        if (message.trim() !== "" && selectedChat) {
            selectedChat.messages.push({ text: message, sender: "user" });
            setMessage("");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between">
                <div>
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
                            <li className="flex items-center space-x-3 text-teal-600 hover:text-teal-600 font-semibold cursor-pointer relative">
                          <FaRegCommentDots size={18} />
                          <span>Chat</span>
                          <span className="absolute right-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">•</span>
                      </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                    <HiOutlineLogout size={18} />
                    <span>Log out</span>
                </div>
            </aside>

            {/* Chat Section */}
            <main className="flex-1 bg-gray-50 flex flex-col">
                {/* Top Right Profile */}
                <div className="p-4 flex justify-end border-b bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                        <div>
                            <div className="font-semibold text-lg">Ekkarat Singkhala</div>
                            <div className="text-sm text-black">Junior Staff</div>
                        </div>
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex flex-1">
                    <div className="w-1/3 border-r bg-white p-5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Customer Chat</h3>
                            <FaPlus size={18} className="text-teal-600 cursor-pointer" onClick={() => setShowPopup(true)} />
                        </div>
                        <ul className="mt-4 space-y-4">
                            {chats.map(chat => (
                                <li key={chat.id} className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${selectedChat?.id === chat.id ? 'bg-teal-100' : 'hover:bg-gray-100'}`} onClick={() => setSelectedChat(chat)}>
                                    <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                                    <div>
                                        <div className="font-semibold">{chat.name}</div>
                                        <div className="text-sm text-black">{chat.role}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Chat Window */}
                    <div className="flex-1 flex flex-col">
                        {selectedChat ? (
                            <>
                                <div className="p-4 border-b bg-white flex items-center space-x-3">
                                    <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                                    <div>
                                        <div className="font-semibold text-lg">{selectedChat.name}</div>
                                        <div className="text-sm text-black">{selectedChat.role}</div>
                                    </div>
                                </div>
                                <div className="flex-1 p-4 overflow-y-auto">
                                    {selectedChat.messages.map((msg, index) => (
                                        <div key={index} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>{msg.text}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t bg-white flex items-center">
                                    <input type="text" className="flex-1 p-2 border rounded-lg" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <button onClick={sendMessage} className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-lg">Send</button>
                                </div>
                            </>
                        ) : <div className="flex-1 flex items-center justify-center text-black">Select a chat to view</div>}
                    </div>
                </div>
            </main>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-lg font-semibold mb-4">Add Customer Chat</h2>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-full text-center text-gray-500"
                            placeholder="customer@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="mt-4 flex justify-center space-x-4">
                            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">Add</button>
                            <button className="px-6 py-2 bg-red-500 text-white rounded-lg" onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
