import React from 'react'
import { FaRegUser, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";

const SideBar = () => {
  return (
      <div><div className="flex h-screen">
        <aside className="w-64 bg-white border-r p-5 flex flex-col justify-between">
          <div>
              <h2 className="text-2xl font-semibold text-teal-600">Medical <br /> Tourism</h2>
              <nav className="mt-8">
                  <ul className="space-y-4">
                      <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                          <FaRegUser size={18} />
                          <span>Profile</span>
                      </li>
                      <li className="flex items-center space-x-3 text-teal-600 font-semibold cursor-pointer">
                          <MdOutlineEventAvailable size={18} />
                          <span>Booking Management</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer relative">
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
      </div></div>
  )
}

export default SideBar