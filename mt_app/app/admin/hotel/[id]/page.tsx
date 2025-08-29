'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Star, Phone, Mail, Clock, Building, Bed, Image as ImageIcon, DollarSign, Users } from 'lucide-react';
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

const HotelDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hotelId = params?.id as string;

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchHotel = async () => {
      // Simulate API call
      const mockHotel: Hotel = {
        hotel_id: parseInt(hotelId),
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
      };
      
      setHotel(mockHotel);
      setLoading(false);
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!hotel) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Hotel not found</h2>
          <p className="text-gray-600 mt-2">The hotel you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    );
  }

  // Parse contact info to extract phone and email
  const contactInfo = hotel.contact_info;
  const phoneMatch = contactInfo.match(/\+?[\d\s\-\(\)]+/);
  const emailMatch = contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  
  const phone = phoneMatch ? phoneMatch[0] : 'N/A';
  const email = emailMatch ? emailMatch[0] : 'N/A';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/hotels')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hotels
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>
              <p className="text-gray-600">Hotel Details & Information</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/admin/hotels/edit/${hotel.hotel_id}`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Hotel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel Main Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-6 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Hotel Code: {hotel.hotel_code}</h3>
                  <p className="text-sm text-gray-600">Created: {hotel.create_at}</p>
                </div>
              </div>
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Hotel Facilities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Hotel Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.hotel_facilities.map((facility, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{facility.facility_name}</h4>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Rooms */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Hotel Rooms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.hotel_rooms.map((room, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{room.room_type}</h4>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-600">${room.price_per_night}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{room.capacity}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{room.description}</p>
                    {room.image && (
                      <img
                        src={room.image}
                        alt={room.room_type}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Images Gallery */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Hotel Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.hotel_images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.image}
                      alt={`Hotel image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-700 font-medium">{hotel.city}</span>
                    <p className="text-gray-600 text-sm">{hotel.location}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Full Contact Info:</strong> {hotel.contact_info}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">City</span>
                  <span className="font-medium">{hotel.city}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hotel Code</span>
                  <span className="font-medium font-mono text-sm">{hotel.hotel_code}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Check-in Time</span>
                  <span className="font-medium">{hotel.check_in_time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{hotel.create_at}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Facilities</span>
                  <span className="font-medium">{hotel.hotel_facilities.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rooms</span>
                  <span className="font-medium">{hotel.hotel_rooms.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Images</span>
                  <span className="font-medium">{hotel.hotel_images.length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/admin/hotels/edit/${hotel.hotel_id}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Hotel
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Building className="h-4 w-4 mr-2" />
                  View Packages
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Clock className="h-4 w-4 mr-2" />
                  View Bookings
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Manage Images
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Bed className="h-4 w-4 mr-2" />
                  Manage Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HotelDetailPage;
