'use client';
import { useState } from 'react';
import { FaRegUser, FaRegCommentDots, FaStar } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

export default function UserReviews() {
    const [reviews, setReviews] = useState([
        {
            hospital: "Mae Fah Luang Hospital",
            rating: 4,
            review: "The interpreter was so helpful and professional! They made my hospital visit stress-free by ensuring I understood everything clearly.",
            date: "February 08, 2025"
        }
    ]);

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
                        <li className="flex items-center space-x-3 text-black bg-black text-white p-2 rounded-lg cursor-pointer">
                            <FaStar size={18} />
                            <span>Reviews</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaRegUser size={18} />
                            <span>Profile</span>
                        </li>
                        <li className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 cursor-pointer">
                            <FaRegCommentDots size={18} />
                            <span>Chat</span>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Reviews Section */}
            <main className="flex-1 bg-gray-50 flex flex-col p-6">
                {/* Search Bar */}
                <div className="flex items-center border p-3 rounded-lg bg-white mb-4">
                    <IoSearch size={20} className="text-gray-600 mr-2" />
                    <input type="text" className="w-full outline-none text-black" placeholder="Search History" />
                </div>

                {/* Review Card */}
                {reviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg border">
                        <h3 className="font-semibold text-black">{review.hospital}</h3>
                        <div className="flex items-center text-yellow-500 mb-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                                <FaStar key={i} />
                            ))}
                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                <FaStar key={i} className="text-gray-300" />
                            ))}
                        </div>
                        <p className="text-gray-600 mb-2">{review.review}</p>
                        <p className="text-gray-400 text-sm">Reviewed {review.date}</p>
                    </div>
                ))}
            </main>
        </div>
    );
}
