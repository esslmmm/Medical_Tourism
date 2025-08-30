'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Upload, X, Plus, Trash2, Image as ImageIcon, Bed, Wifi } from 'lucide-react';
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

// Thailand cities for dropdown
const THAILAND_CITIES = [
  'Bangkok',
  'Phuket',
  'Chiang Mai',
  'Pattaya',
  'Krabi',
  'Koh Samui',
  'Hua Hin',
  'Ayutthaya',
  'Sukhumvit',
  'Silom',
  'Chatuchak',
  'Sathorn',
  'Thonglor',
  'Ekkamai',
  'On Nut',
  'Bang Na',
  'Lat Krabang',
  'Don Mueang',
  'Suvarnabhumi',
  'Other'
];

// Check-in time options
const CHECK_IN_TIMES = [
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'
];

const HotelEditPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hotelId = params?.id as string;

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');

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
      setMainImagePreview(mockHotel.image);
      setLoading(false);
    };

    fetchHotel();
  }, [hotelId]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && hotel) {
      const newImages: HotelImage[] = Array.from(files).map(file => ({
        image: URL.createObjectURL(file)
      }));
      setHotel({
        ...hotel,
        hotel_images: [...hotel.hotel_images, ...newImages]
      });
    }
  };

  const removeHotelImage = (index: number) => {
    if (!hotel) return;
    const newImages = hotel.hotel_images.filter((_, i) => i !== index);
    setHotel({ ...hotel, hotel_images: newImages });
  };

  const handleFacilityChange = (index: number, field: keyof HotelFacility, value: string) => {
    if (!hotel) return;
    const newFacilities = [...hotel.hotel_facilities];
    newFacilities[index] = { ...newFacilities[index], [field]: value };
    setHotel({ ...hotel, hotel_facilities: newFacilities });
  };

  const addFacility = () => {
    if (!hotel) return;
    setHotel({
      ...hotel,
      hotel_facilities: [...hotel.hotel_facilities, { facility_name: '', description: '' }]
    });
  };

  const removeFacility = (index: number) => {
    if (!hotel) return;
    const newFacilities = hotel.hotel_facilities.filter((_, i) => i !== index);
    setHotel({ ...hotel, hotel_facilities: newFacilities });
  };

  const handleRoomChange = (index: number, field: keyof HotelRoom, value: string | number) => {
    if (!hotel) return;
    const newRooms = [...hotel.hotel_rooms];
    newRooms[index] = { ...newRooms[index], [field]: value };
    setHotel({ ...hotel, hotel_rooms: newRooms });
  };

  const addRoom = () => {
    if (!hotel) return;
    setHotel({
      ...hotel,
      hotel_rooms: [...hotel.hotel_rooms, { 
        room_type: '', 
        price_per_night: 0, 
        capacity: '', 
        description: '', 
        image: '' 
      }]
    });
  };

  const removeRoom = (index: number) => {
    if (!hotel) return;
    const newRooms = hotel.hotel_rooms.filter((_, i) => i !== index);
    setHotel({ ...hotel, hotel_rooms: newRooms });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotel) return;

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle main image upload if changed
      if (mainImageFile) {
        console.log('Uploading main image:', mainImageFile);
      }

      // Update hotel data
      console.log('Updating hotel:', hotel);
      
      // Redirect back to hotels list
      router.push('/admin/hotels');
    } catch (error) {
      console.error('Error updating hotel:', error);
    } finally {
      setSaving(false);
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Edit Hotel</h1>
              <p className="text-gray-600">Update hotel information, rooms, and facilities</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Hotel Image */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Main Hotel Image</h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={mainImagePreview}
                  alt="Hotel"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                {mainImageFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setMainImageFile(null);
                      setMainImagePreview(hotel.image);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Main Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 800x600px, JPG or PNG
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Name *
                </label>
                <input
                  type="text"
                  value={hotel.name}
                  onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hotel Code *
                </label>
                <input
                  type="text"
                  value={hotel.hotel_code}
                  onChange={(e) => setHotel({ ...hotel, hotel_code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={20}
                  placeholder="e.g., BGH001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  value={hotel.city}
                  onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a city</option>
                  {THAILAND_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Time *
                </label>
                <select
                  value={hotel.check_in_time}
                  onChange={(e) => setHotel({ ...hotel, check_in_time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {CHECK_IN_TIMES.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Address *
                </label>
                <input
                  type="text"
                  value={hotel.location}
                  onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={255}
                  placeholder="Street address, district, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={hotel.email}
                  onChange={(e) => setHotel({ ...hotel, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={hotel.rating}
                  onChange={(e) => setHotel({ ...hotel, rating: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="4.5"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={hotel.description}
                  onChange={(e) => setHotel({ ...hotel, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Describe the hotel's amenities, services, and unique features"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Information *
                </label>
                <textarea
                  value={hotel.contact_info}
                  onChange={(e) => setHotel({ ...hotel, contact_info: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  maxLength={255}
                  placeholder="Phone numbers, email addresses, website, etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include phone, email, website, and other contact details
                </p>
              </div>
            </div>
          </div>

          {/* Hotel Facilities */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hotel Facilities</h2>
            <div className="space-y-4">
              {hotel.hotel_facilities.map((facility, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facility Name *
                      </label>
                      <input
                        type="text"
                        value={facility.facility_name}
                        onChange={(e) => handleFacilityChange(index, 'facility_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        maxLength={100}
                        placeholder="e.g., Swimming Pool"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={facility.description}
                        onChange={(e) => handleFacilityChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={255}
                        placeholder="Brief description of the facility"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeFacility(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addFacility}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Facility
              </button>
            </div>
          </div>

          {/* Hotel Rooms */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hotel Rooms</h2>
            <div className="space-y-4">
              {hotel.hotel_rooms.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Room Type *
                      </label>
                      <input
                        type="text"
                        value={room.room_type}
                        onChange={(e) => handleRoomChange(index, 'room_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        maxLength={100}
                        placeholder="e.g., Deluxe Room"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price per Night (USD) *
                      </label>
                      <input
                        type="number"
                        value={room.price_per_night}
                        onChange={(e) => handleRoomChange(index, 'price_per_night', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                        placeholder="150.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity *
                      </label>
                      <input
                        type="text"
                        value={room.capacity}
                        onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        maxLength={200}
                        placeholder="e.g., 2 Adults + 1 Child"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Room Image URL
                      </label>
                      <input
                        type="text"
                        value={room.image}
                        onChange={(e) => handleRoomChange(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={255}
                        placeholder="/room-image.jpg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={room.description}
                        onChange={(e) => handleRoomChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={255}
                        placeholder="Describe the room features, amenities, and view"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeRoom(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addRoom}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Bed className="h-4 w-4 mr-2" />
                Add Room
              </button>
            </div>
          </div>

          {/* Hotel Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Hotel Images</h2>
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="images-upload"
                />
                <label
                  htmlFor="images-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Choose Images
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  You can select multiple images. Recommended: 800x600px, JPG or PNG
                </p>
              </div>

              {/* Current Images Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.hotel_images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.image}
                      alt={`Hotel image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeHotelImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/hotels')}
              className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default HotelEditPage;
