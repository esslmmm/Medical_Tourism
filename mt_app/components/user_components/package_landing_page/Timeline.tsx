"use client";
import Image from "next/image";
import { useState } from "react";

const events = [
  {
    title: "Medical Check-Up at MFU",
    time: "11:00 - 12:00 | Day 1",
    image: "/img/package_detail/landing02.jpeg",
  },
  {
    title: "Khon Kron Waterfall",
    time: "13:00 - 15:00 | Day 1",
    image: "/img/Places/khunkorn.png",
  },
  {
    title: "Wat Rong Khun",
    time: "15:00 - 17:00 | Day 1",
    image: "/img/Places/Wat_Rong_Khun.jpg",
  },
  {
    title: "Singha Park",
    time: "15:00 - 17:00 | Day 2",
    image: "/img/Places/singha-park.jpg",
  },
];

export default function Timeline() {
  const [isTimelineVisible, setIsTimelineVisible] = useState(true);

  const toggleTimelineVisibility = () => {
    setIsTimelineVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Timeline</h2>
      {isTimelineVisible && (
        <div className="relative border-l-2 border-green-400 pl-6">
          {events.map((event, index) => (
            <div key={index} className="mb-8 flex items-center">
              {index % 2 === 0 ? (
                <>
                  <div className="w-48 mr-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={200}
                      height={150}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-end text-right">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                  <div className="w-48 ml-4">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={200}
                      height={150}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </>
              )}
              <div className="absolute left-[-10px] bg-green-400 w-4 h-4 rounded-full border-4 border-white"></div>
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
        onClick={toggleTimelineVisibility}
      >
        {isTimelineVisible ? "Hide Timeline" : "Show Timeline"}
      </button>
    </div>
  );
}
