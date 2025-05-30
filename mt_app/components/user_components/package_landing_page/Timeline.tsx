"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

// const events = [
//   {
//     title: "Medical Check-Up at MFU",
//     time: "11:00 - 12:00 | Day 1",
//     image: "/img/package_detail/landing02.jpeg",
//   },
//   {
//     title: "Khon Kron Waterfall",
//     time: "13:00 - 15:00 | Day 1",
//     image: "/img/Places/khunkorn.png",
//   },
//   {
//     title: "Wat Rong Khun",
//     time: "15:00 - 17:00 | Day 1",
//     image: "/img/Places/Wat_Rong_Khun.jpg",
//   },
//   {
//     title: "Singha Park",
//     time: "15:00 - 17:00 | Day 2",
//     image: "/img/Places/singha-park.jpg",
//   },
// ];

interface Packages {
  package_id: number;
  package_name: string;
  trips: trips[]
}

interface trips {
  tour_id: number;
  package_places: package_places[]
}

interface package_places {
  packplace_id: number;
  tour_id: number;
  place_id: number;
  date: string;
  start: string;
  end: string;
  places: places
}

interface places {
  place_id: number;
  place_name: string;
  image: string;
  description: string;
}

export default function Timeline() {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTimelineVisible, setIsTimelineVisible] = useState(true);

   //Getting the Package data
      useEffect(() => {
        const fetchPackage = async () => {
          try {
            const res = await fetch(`/api/services/packages/${id}`);
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(errorData.error || 'Unknown error');
            }
    
            const json = await res.json();
            setData(json);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPackage();
      }, [id]);

  const toggleTimelineVisibility = () => {
    setIsTimelineVisible((prev) => !prev);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6">Timeline</h2>
      {isTimelineVisible && (
        <div className="relative border-l-2 border-green-400 pl-6">
          {data?.trips?.flatMap(trip => trip.package_places)?.map((event, index) => (
            <div key={index} className="mb-8 flex items-center">
              {index % 2 === 0 ? (
                <>
                  <div className="w-48 mr-4">
                    <Image
                      src={event.places.image}
                      alt={event.places.place_name}
                      width={200}
                      height={150}
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold">{event.places.place_name}</h3>
                    <p className="text-gray-600">{event.start} - {event.end} | Day {event.date}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-end text-right">
                    <h3 className="font-bold">{event.places.place_name}</h3>
                    <p className="text-gray-600">{event.start} - {event.end} | Day {event.date}</p>
                  </div>
                  <div className="w-48 ml-4">
                    <Image
                      src={event.places.image}
                      alt={event.places.place_name}
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
