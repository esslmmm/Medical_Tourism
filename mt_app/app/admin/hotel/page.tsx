'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Hotel, Plus, Search, MapPin, Star, Edit, Trash2, Phone, Bed, Clock } from 'lucide-react';
import '@/app/admin/styles/globals.css';

// Define interfaces based on your Prisma schema
interface HotelImage {
  image_id?: number;
  image: string;
}

interface HotelFacility {
  facility_id?: number;
  facility_name: string;
  description: string;
}

interface HotelRoom {
  room_id?: number;
  room_type: string;
  price_per_night: number;
  capacity: string;
  description: string;
  image: string;
}

interface Hotel {
  hotel_id: number;
  name: string;
  hotel_code: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
  contact_info: string;
  create_at: string;
  hotel_images: HotelImage[];
  hotel_facilities: HotelFacility[];
  hotel_rooms: HotelRoom[];
}

const HotelManagement: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const hotels: Hotel[] = [
    {
      hotel_id: 1,
      name: 'Bangkok Grand Hotel',
      hotel_code: 'BGH001',
      location: '123 Sukhumvit Road, Thonglor',
      city: 'Bangkok',
      rating: 4.7,
      email: 'info@bangkokgrand.com',
      description: 'Luxury 5-star hotel in the heart of Bangkok with world-class amenities',
      image: '/hotels/hotel1.jpg',
      check_in_time: '2 PM',
      contact_info: '+66-2-123-4567, info@bangkokgrand.com',
      create_at: '2023-01-15',
      hotel_images: [
        { image: '/hotels/hotel1.jpg' },
        { image: '/hotels/hotel1-2.jpg' }
      ],
      hotel_facilities: [
        { facility_name: 'Swimming Pool', description: 'Outdoor infinity pool' },
        { facility_name: 'Spa & Wellness', description: 'Full-service spa' }
      ],
      hotel_rooms: [
        { room_type: 'Deluxe Room', price_per_night: 150, capacity: '2 Adults', description: 'Comfortable room with city view', image: '/hotels/room1.jpg' },
        { room_type: 'Suite', price_per_night: 300, capacity: '4 Adults', description: 'Luxury suite with balcony', image: '/hotels/suite1.jpg' }
      ]
    },
    {
      hotel_id: 2,
      name: 'Phuket Beach Resort',
      hotel_code: 'PBR002',
      location: '456 Patong Beach Road',
      city: 'Phuket',
      rating: 4.8,
      email: 'info@phuketbeach.com',
      description: 'Beachfront resort with stunning ocean views and tropical gardens',
      image: '/hotels/hotel2.jpg',
      check_in_time: '3 PM',
      contact_info: '+66-76-234-5678, info@phuketbeach.com',
      create_at: '2023-01-10',
      hotel_images: [
        { image: '/hotels/hotel2.jpg' },
        { image: '/hotels/hotel2-2.jpg' }
      ],
      hotel_facilities: [
        { facility_name: 'Private Beach', description: 'Exclusive beach access' },
        { facility_name: 'Water Sports', description: 'Diving and snorkeling' }
      ],
      hotel_rooms: [
        { room_type: 'Beach Villa', price_per_night: 250, capacity: '2 Adults + 2 Children', description: 'Private villa steps from the beach', image: '/hotels/villa1.jpg' },
        { room_type: 'Ocean View Room', price_per_night: 180, capacity: '2 Adults', description: 'Room with panoramic ocean view', image: '/hotels/room2.jpg' }
      ]
    },
    {
      hotel_id: 3,
      name: 'Chiang Mai Heritage Hotel',
      hotel_code: 'CMH003',
      location: '789 Old City Square',
      city: 'Chiang Mai',
      rating: 4.6,
      email: 'info@chiangmaiheritage.com',
      description: 'Traditional Thai architecture meets modern luxury in the historic old city',
      image: '/hotels/hotel3.jpg',
      check_in_time: '2 PM',
      contact_info: '+66-53-345-6789, info@chiangmaiheritage.com',
      create_at: '2023-02-01',
      hotel_images: [
        { image: '/hotels/hotel3.jpg' }
      ],
      hotel_facilities: [
        { facility_name: 'Traditional Spa', description: 'Authentic Thai massage' },
        { facility_name: 'Cultural Tours', description: 'Guided temple visits' }
      ],
      hotel_rooms: [
        { room_type: 'Traditional Suite', price_per_night: 200, capacity: '2 Adults', description: 'Suite with traditional Thai decor', image: '/hotels/suite2.jpg' },
        { room_type: 'Garden Room', price_per_night: 120, capacity: '2 Adults', description: 'Peaceful room overlooking gardens', image: '/hotels/room3.jpg' }
      ]
    }
  ];

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.hotel_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique cities count
  const uniqueCities = new Set(hotels.map(h => h.city)).size;

  // Calculate average rating
  const averageRating = hotels.reduce((sum, h) => sum + h.rating, 0) / hotels.length;

  // Calculate total rooms
  const totalRooms = hotels.reduce((sum, h) => sum + h.hotel_rooms.length, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
            <p className="text-gray-600">Manage hotel details, rooms, and facilities</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Hotel
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Hotel className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Hotels</p>
                <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Cities Covered</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueCities}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Bed className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search hotels by name, city, or code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div key={hotel.hotel_id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{hotel.hotel_code}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => router.push(`/admin/hotels/edit/${hotel.hotel_id}`)}
                      title="Edit Hotel"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      onClick={() => router.push(`/admin/hotels/${hotel.hotel_id}`)}
                      title="View Details"
                    >
                      <Hotel className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete Hotel"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{hotel.city}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Check-in: {hotel.check_in_time}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {hotel.hotel_facilities.slice(0, 2).map((facility) => (
                      <span key={facility.facility_name} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {facility.facility_name}
                      </span>
                    ))}
                    {hotel.hotel_facilities.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{hotel.hotel_facilities.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-32">
                          {hotel.contact_info.split(',')[0]}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {hotel.city}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          {hotel.hotel_rooms.length} rooms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelManagement;
