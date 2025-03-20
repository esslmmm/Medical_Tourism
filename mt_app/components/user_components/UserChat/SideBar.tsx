'use client';
import React from 'react'
import { FaRegUser, FaRegCommentDots, FaStar, FaPaperclip } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";

const SideBar = () => {
  return (
    <div><aside className="w-64 bg-white border-r p-5 flex flex-col h-full">
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
                </aside></div>
  )
}

export default SideBar