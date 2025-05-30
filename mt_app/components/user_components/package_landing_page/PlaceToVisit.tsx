"use client";
import { useParams,  useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function Trips() {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


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
    <section className="bg-[#D8EAE4] py-12 px-20 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Place to Visit</h2>
      <div className="grid md:grid-cols-4 gap-6 justify-center">
        {data?.trips?.flatMap(trip => trip.package_places)?.map((place) => (
          <div
            key={place.place_id}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <Image
              src={place.places.image}
              alt={place.places.place_name}
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
                  <div className="text-white text-md font-semibold mb-5">{place.places.place_name}</div>
                  <button
                    onClick={() => router.push(`/places/${place.place_id}`)}
                    className="bg-white text-green-500 px-4 py-2 rounded-full text-sm font-medium transition hover:bg-gray-200"
                  >
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

