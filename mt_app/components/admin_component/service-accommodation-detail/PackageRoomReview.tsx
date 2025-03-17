"use client";
import { FaPlus, FaArrowRight } from "react-icons/fa";

const packages = [
  {
    id: 1,
    name: "Preventive Cancer Package",
    description: "Packages offer a promotion",
    image: "/img/package.png",
    expiry: "Expires soon",
  },
  {
    id: 2,
    name: "Health Screening Package",
    description: "Special health promotion",
    image: "/img/package.png",
    expiry: "Limited Offer",
  },
  {
    id: 3,
    name: "Comprehensive Check-Up",
    description: "Full body examination package",
    image: "/img/package.png",
    expiry: "Available Now",
  },
];

const rooms = [
  {
    id: 1,
    name: "Deluxe Twins",
    image: "/img/room.png",
  },
  {
    id: 2,
    name: "Premium Suite",
    image: "/img/room.png",
  },
  {
    id: 3,
    name: "Executive King",
    image: "/img/room.png",
  },
];

const reviews = [
  {
    id: 1,
    user: "Steve Brown",
    title: "Friendly Staff",
    rating: 4,
    text: "I had an amazing experience at MFU Hospital. The doctors and nurses were incredibly professional and compassionate.",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    title: "Great Service",
    rating: 5,
    text: "The best hospital experience ever! The staff was very attentive, and the care was exceptional.",
  },
  {
    id: 3,
    user: "Michael Lee",
    title: "Highly Recommended",
    rating: 5,
    text: "Doctors are well experienced, and the environment is super clean. Highly recommended.",
  },
];

export default function PackageRoomReview() {
  return (
    <div className="mt-8 space-y-12">
      {/* Packages Section */}
      <section className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Packages</h3>
          
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="font-medium mt-3">{pkg.name}</h4>
              <p className="text-sm text-gray-600">{pkg.description}</p>
              <p className="text-xs text-red-500 mt-1">{pkg.expiry}</p>
            </div>
          ))}
        </div>
        <button className="text-blue-600 mt-3 flex items-center hover:underline">
          View More <FaArrowRight className="ml-2" />
        </button>
      </section>

      {/* Rooms Section */}
      <section className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Rooms</h3>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition">
            <FaPlus className="mr-2" /> Add
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h4 className="text-center font-medium mt-3">{room.name}</h4>
            </div>
          ))}
        </div>
        <button className="text-blue-600 mt-3 flex items-center hover:underline">
          View More <FaArrowRight className="ml-2" />
        </button>
      </section>

      {/* Reviews Section */}
      <section className="w-full bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="grid grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              <h4 className="font-medium">{review.user}</h4>
              <p className="text-sm italic">{review.title}</p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-yellow-400 ${
                      index < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-2">{review.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
