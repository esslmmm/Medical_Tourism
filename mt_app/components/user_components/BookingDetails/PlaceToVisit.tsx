"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useParams } from 'next/navigation';

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

const PlaceToVisit = () => {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
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
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
      <div className="bg-white p-6 border-b border-[#E0E0E0]">
          <h3 className="text-xl font-bold text-black">Place to Visit</h3>
          <div className="space-y-8">
              {data?.trips.map((trip) => {
                // Group places by date and sort
                const groupedByDate = trip.package_places.reduce<
                  Record<number, package_places[]>
                >((acc, placeItem) => {
                  if (!acc[Number(placeItem.date)]) acc[Number(placeItem.date)] = [];
                  acc[Number(placeItem.date)].push(placeItem);
                  return acc;
                }, {});

                // Sort dates ascending
                const sortedDates = Object.keys(groupedByDate)
                  .map(Number)
                  .sort((a, b) => a - b);

                return (
                  <div key={trip.tour_id}>

                    {sortedDates.map((date) => (
                      <div key={date} className="mb-4">
                        <h3 className="font-bold ml-2 mb-2 text-sm">
                          Day {date}
                        </h3>
                        <div className="space-y-3">
                          {groupedByDate[date]
                            .sort(
                              (a, b) =>
                                a.start.localeCompare(b.start) ||
                                a.places.place_name.localeCompare(b.places.place_name)
                            )
                            .map((placeItem) => (
                              <div
                                  key={placeItem.packplace_id}
                                  className="flex gap-4 items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                >
                                  {/* Image */}
                                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                    <Image
                                      src={placeItem.places.image}
                                      alt={placeItem.places.place_name}
                                      width={80}
                                      height={80}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>

                                  {/* Text Info */}
                                  <div className="flex flex-col max-w-md"> {/* Limit width for consistent layout */}
                                    <p className="text-gray-900 font-semibold text-lg">
                                      {placeItem.places.place_name}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-1">
                                      Time: {placeItem.start} - {placeItem.end}
                                    </p>
                                    <p className="text-gray-700 text-sm line-clamp-2">
                                      {placeItem.places.description}
                                    </p>
                                  </div>
                                </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
        </div>
      </div>
  )
}

export default PlaceToVisit