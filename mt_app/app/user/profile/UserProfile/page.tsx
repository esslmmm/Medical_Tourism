"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import SideBar from "@/components/user_components/UserProfile/SideBar";

interface User {
    name?: string;
    email: string;
    nationality?: string;
    image?: string;
    role: string;
  }

export default function UserProfile() {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError("Error fetching user data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  }, [status]);

  // Update profile
  const handleSubmit = async () => {
    try {
      await axios.put("/api/profile", { name, email });
      setUser((prev) => (prev ? { ...prev, name, email } : null));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    session?.user && (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <main className="flex h-screen w-screen bg-gray-100 flex-col items-center justify-center p-6">
          <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-6xl text-center flex flex-col items-center h-full">
            
            {/* Profile Picture */}
            <div className="relative w-40 h-40 m-10">
              <div className="w-40 h-40 rounded-full border bg-gray-200"></div>
              <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all cursor-pointer">
                <FiEdit2 className="text-gray-600" size={24} />
              </div>
            </div>

            {/* User Details */}
            <div className="w-full bg-zinc-50 p-8 rounded-lg shadow-md max-w-4xl flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-gray-700 text-center m-2">
                Profile Details
              </h2>

              {/* Name Field */}
              <div className="flex flex-col items-start border border-gray-200 p-8 hover:bg-gray-100 rounded-lg m-5 bg-white w-full">
                <div className="flex justify-between w-full">
                  <p className="text-gray-600 font-semibold">Name</p>
                  <FiEdit2
                    className="text-gray-600 cursor-pointer hover:text-teal-600 transition-all"
                    size={20}
                    onClick={() => setIsEditing(true)}
                  />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    className="border border-gray-300 p-3 w-full rounded-md mt-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <p className="text-black text-2xl font-medium w-full text-start mt-5">
                    {user?.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col items-start border border-gray-200 p-8 hover:bg-gray-100 rounded-lg m-5 bg-white w-full">
                <div className="flex justify-between w-full">
                  <p className="text-gray-600 font-semibold">Email</p>
                  <FiEdit2
                    className="text-gray-600 cursor-pointer hover:text-teal-600 transition-all"
                    size={20}
                    onClick={() => setIsEditing(true)}
                  />
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    className="border border-gray-300 p-3 w-full rounded-md mt-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <p className="text-black text-2xl font-medium w-full text-start mt-5">
                    {user?.email}
                  </p>
                )}
              </div>

              {/* Save / Cancel Buttons */}
              {isEditing && (
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition-all"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition-all"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user?.name || "");
                      setEmail(user?.email || "");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )
  );
}
