"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

// Interfaces
interface Package {
  package_id: number;
  package_hotels: package_hotels[];
}

interface package_hotels {
  packhotel_id: number;
  package_id: number;
  hotel_id: number;
}

interface accommodations {
  hotel_id: number;
  name: string;
  hotel_cod: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
  contact_info: string;
  create_at: Date;
  hotel_facilities: hotel_facilities[];
  hotel_images: hotel_images[];
  hotel_rooms: hotel_rooms[];
  review_hotel: review_hotel[];
}

interface hotel_facilities {
  facility_id: number;
  facility_name: string;
  description: string;
}

interface hotel_images {
  image_id: number;
  image: string;
}

interface hotel_rooms {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  image: string;
}

interface review_hotel {
  review_id: number;
  user_id: number;
  rating: number;
  title_review: string;
  comment: string;
  created_at: string;
  user: user;
}
interface user {
  user_id: number;
  name: string;
}

interface hotel_rooms {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  image: string;
  hotel_room_facilities: HotelRoomFacility[];
  room_aggregate: RoomAggregate[];
  room_image: RoomImage[];
}

interface RoomAggregate {
  amount: number;
  aggregate_id: number;
  booking_id: number;
}

interface HotelRoomFacility {
  room_facilitiy_id: number;
  facility_name: string;
  description: string;
}

interface RoomImage {
  image_id: number;
  image: string;
}

interface AccommodationCardProps {
  setSelectedAccommodation: (accommodation: accommodations) => void;
  selectedAccommodation: accommodations | null;
}

export default function AccommodationCard({
  setSelectedAccommodation,
  selectedAccommodation,
}: AccommodationCardProps) {
  const [accommodationData, setAccommodationData] = useState<accommodations[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  
  const calculateAverageRating = (reviews: review_hotel[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  useEffect(() => {
    async function fetchPackage() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/services/packages/${id}`);
        if (!res.ok) throw new Error("Failed to fetch package");

        const packageJson: Package = await res.json();
        const hotelIds = packageJson.package_hotels.map((p) => p.hotel_id);
        fetchHotels(hotelIds);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    async function fetchHotels(hotelIds: number[]) {
      try {
        const hotels = await Promise.all(
          hotelIds.map(async (id) => {
            const res = await fetch(`/api/services/accommodations/${id}`);
            if (!res.ok) throw new Error("Failed to fetch hotel");
            return res.json();
          })
        );
        setAccommodationData(hotels);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    fetchPackage();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-center bg-white mt-6">
        <h1 className="text-4xl font-bold">Accommodation</h1>
      </div>
      <div className="flex justify-center py-10 bg-white">
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {accommodationData.map((hotel) => (
            <div
              key={hotel.hotel_id}
              className={`relative bg-white overflow-hidden shadow-lg w-60 cursor-pointer transition transform ${
                selectedAccommodation?.hotel_id === hotel.hotel_id ? "ring-4 ring-green-500 scale-105" : ""
              }`}
              onClick={() => setSelectedAccommodation(hotel)}
            >
              {/* Hotel Image */}
              <Image
                src={hotel.image}
                alt={hotel.name}
                width={243}
                height={200}
                className="w-full h-90 object-cover"
              />

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <span className="text-yellow-500">
                  <FaStar />
                </span>
                <span className="font-medium text-sm">{hotel.rating}/5</span>
              </div>

              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                  {/* Hotel Name */}
                  <div className="text-white text-md font-semibold mb-8">{hotel.name}</div>

                  {/* Features */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hotel.hotel_facilities.slice(0, 2).map((feature) => (
                      <span
                        key={feature.facility_id}
                        className="text-xs bg-white px-3 py-1 rounded-xs"
                      >
                        {feature.facility_name}
                      </span>
                    ))}
                    {hotel.hotel_facilities.length > 2 && (
                      <span className="text-xs bg-gray-200 px-3 py-1 rounded-xs text-gray-600">
                        +{hotel.hotel_facilities.length - 2} more
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedAccommodation && (
        <div className="flex justify-center mt-6">
          <p className="text-2xl font-semibold text-black mb-11">
            {selectedAccommodation.name}
          </p>
        </div>
      )}
    </div>
  );
}
