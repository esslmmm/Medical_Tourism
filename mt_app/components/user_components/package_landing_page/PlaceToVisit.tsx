"use client";
import Image from "next/image";

const trips = [
  {
    id: 1,
    name: "Khon Kron Waterfall",
    image: "/img/place.png", // Replace with actual images
  },
  {
    id: 2,
    name: "White Temple",
    image: "/img/place.png", // Replace with actual images
  },
  {
    id: 3,
    name: "Phi Phi Islands",
    image: "/img/place.png", // Replace with actual images
  },
  {
    id: 4,
    name: "Phi Phi Islands",
    image: "/img/place.png", // Replace with actual images
  },
];

export default function Trips() {
  return (
    <section className="bg-[#D8EAE4] py-12 px-20 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Place to Visit</h2>
      <div className="grid md:grid-cols-4 gap-6 justify-center">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <Image
              src={trip.image}
              alt={trip.name}
              width={400}
              height={500}
              className="object-cover w-full h-72"
            />
            {/* <div className="absolute bottom-0 left-0 w-full p-4 transition-opacity duration-300 bg-gradient-to-t from-black to-transparent opacity-90 hover:opacity-100">
                <div className="relative z-10 text-white text-md font-semibold mb-5">{trip.name}</div>
                <button className="bg-white text-green-500 px-4 py-2 rounded-full text-sm font-medium transition transform hover:scale-110 hover:bg-gray-200">
                  View More
                </button>
              </div> */}
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10">
                  {/* Hotel Name */}
                  <div className="text-white text-md font-semibold mb-5">{trip.name}</div>
                  <button className=" bg-white text-green-500 px-4 py-2 rounded-full text-sm font-medium transition hover:bg-gray-200">
                View More
                 </button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}

