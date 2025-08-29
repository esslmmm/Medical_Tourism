'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Save, Plus, Trash2, Hotel } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import '@/app/admin/styles/globals.css';

// Define interfaces
interface HotelFacility {
  facility_name: string;
  description: string;
}

interface HotelRoom {
  room_type: string;
  price_per_night: string;
  capacity: string;
  description: string;
  image: string;
  room_facilities: HotelRoomFacility[];
  room_images: string[];
}

interface HotelRoomFacility {
  facility_name: string;
  description: string;
}

const AddHotelPage: React.FC = () => {
  const router = useRouter();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    hotel_code: '',
    location: '',
    city: '',
    rating: '',
    email: '',
    description: '',
    image: '',
    check_in_time: '2 PM',
    contact_info: '',
  });

  const [hotelFacilities, setHotelFacilities] = useState<HotelFacility[]>([]);
  const [hotelImages, setHotelImages] = useState<string[]>([]);
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFacilityChange = (index: number, field: keyof HotelFacility, value: string) => {
    const updated = [...hotelFacilities];
    updated[index] = { ...updated[index], [field]: value };
    setHotelFacilities(updated);
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...hotelImages];
    updated[index] = value;
    setHotelImages(updated);
  };

  const handleRoomChange = (index: number, field: keyof HotelRoom, value: any) => {
    const updated = [...hotelRooms];
    updated[index] = { ...updated[index], [field]: value };
    setHotelRooms(updated);
  };

  const handleRoomFacilityChange = (roomIndex: number, facilityIndex: number, field: keyof HotelRoomFacility, value: string) => {
    const updated = [...hotelRooms];
    if (!updated[roomIndex].room_facilities) {
      updated[roomIndex].room_facilities = [];
    }
    updated[roomIndex].room_facilities[facilityIndex] = {
      ...updated[roomIndex].room_facilities[facilityIndex],
      [field]: value
    };
    setHotelRooms(updated);
  };

  const handleRoomImageChange = (roomIndex: number, imageIndex: number, value: string) => {
    const updated = [...hotelRooms];
    if (!updated[roomIndex].room_images) {
      updated[roomIndex].room_images = [];
    }
    updated[roomIndex].room_images[imageIndex] = value;
    setHotelRooms(updated);
  };

  const addFacility = () => {
    setHotelFacilities([...hotelFacilities, { facility_name: '', description: '' }]);
  };

  const removeFacility = (index: number) => {
    setHotelFacilities(hotelFacilities.filter((_, i) => i !== index));
  };

  const addImage = () => {
    setHotelImages([...hotelImages, '']);
  };

  const removeImage = (index: number) => {
    setHotelImages(hotelImages.filter((_, i) => i !== index));
  };

  const addRoom = () => {
    setHotelRooms([...hotelRooms, { 
      room_type: '', 
      price_per_night: '', 
      capacity: '', 
      description: '', 
      image: '',
      room_facilities: [],
      room_images: []
    }]);
  };

  const removeRoom = (index: number) => {
    setHotelRooms(hotelRooms.filter((_, i) => i !== index));
  };

  const addRoomFacility = (roomIndex: number) => {
    const updated = [...hotelRooms];
    if (!updated[roomIndex].room_facilities) {
      updated[roomIndex].room_facilities = [];
    }
    updated[roomIndex].room_facilities.push({ facility_name: '', description: '' });
    setHotelRooms(updated);
  };

  const removeRoomFacility = (roomIndex: number, facilityIndex: number) => {
    const updated = [...hotelRooms];
    updated[roomIndex].room_facilities = updated[roomIndex].room_facilities.filter((_, i) => i !== facilityIndex);
    setHotelRooms(updated);
  };

  const addRoomImage = (roomIndex: number) => {
    const updated = [...hotelRooms];
    if (!updated[roomIndex].room_images) {
      updated[roomIndex].room_images = [];
    }
    updated[roomIndex].room_images.push('');
    setHotelRooms(updated);
  };

  const removeRoomImage = (roomIndex: number, imageIndex: number) => {
    const updated = [...hotelRooms];
    updated[roomIndex].room_images = updated[roomIndex].room_images.filter((_, i) => i !== imageIndex);
    setHotelRooms(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Filter and clean the data
      const cleanedFacilities = hotelFacilities.filter(facility => 
        facility.facility_name && facility.facility_name.trim() !== ''
      );
      const cleanedImages = hotelImages.filter(image => 
        image && image.trim() !== ''
      );
      const cleanedRooms = hotelRooms.filter(room => 
        room.room_type && room.room_type.trim() !== ''
      ).map(room => ({
        ...room,
        room_facilities: room.room_facilities?.filter(facility => 
          facility.facility_name && facility.facility_name.trim() !== ''
        ) || [],
        room_images: room.room_images?.filter(image => 
          image && image.trim() !== ''
        ) || []
      }));

      const payload = {
        ...formData,
        hotel_facilities: cleanedFacilities,
        hotel_images: cleanedImages,
        hotel_rooms: cleanedRooms,
      };

      console.log('=== FRONTEND SENDING DATA ===');
      console.log('Payload:', JSON.stringify(payload, null, 2));
      console.log('Facilities count:', payload.hotel_facilities.length);
      console.log('Images count:', payload.hotel_images.length);
      console.log('Rooms count:', payload.hotel_rooms.length);

      const response = await fetch('/api/services/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newHotel = await response.json();
        showSuccess('Hotel created successfully', `${newHotel.name} has been added to the system`);
        setTimeout(() => {
          router.push(`/admin/hotel/${newHotel.hotel_id}`);
        }, 1500);
      } else {
        console.error('Response status:', response.status);
        console.error('Response headers:', response.headers);
        const responseText = await response.text();
        console.error('Response body:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: 'Invalid JSON response', body: responseText };
        }
        
        console.error('Failed to create hotel:', errorData);
        showError('Failed to create hotel', errorData.details || errorData.error || responseText || 'Unknown error');
      }
    } catch (error) {
      console.error('Error creating hotel:', error);
      showError('Error creating hotel', 'Please try again later');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/hotel')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Hotels
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Hotel</h1>
              <p className="text-black">Create a new hotel profile</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/admin/hotel')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Creating...' : 'Create Hotel'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter hotel name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Code *
                  </label>
                  <input
                    type="text"
                    value={formData.hotel_code}
                    onChange={(e) => handleInputChange('hotel_code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., HTL001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter full address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter city"
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
                    value={formData.rating}
                    onChange={(e) => handleInputChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 4.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="hotel@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={formData.check_in_time}
                    onChange={(e) => handleInputChange('check_in_time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="e.g., 2 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    value={formData.contact_info}
                    onChange={(e) => handleInputChange('contact_info', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Phone, email, etc."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://example.com/hotel-photo.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Brief description about the hotel"
                  />
                </div>
              </div>
            </div>

            {/* Hotel Facilities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Hotel Facilities</h2>
                <button
                  onClick={addFacility}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Facility
                </button>
              </div>
              <div className="space-y-4">
                {hotelFacilities.map((facility, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Facility {index + 1}</h4>
                      <button
                        onClick={() => removeFacility(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Facility Name
                        </label>
                        <input
                          type="text"
                          value={facility.facility_name}
                          onChange={(e) => handleFacilityChange(index, 'facility_name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., Outdoor infinity pool"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {hotelFacilities.length === 0 && (
                  <p className="text-black text-center py-4">No facilities added. Click "Add Facility" to add one.</p>
                )}
              </div>
            </div>

            {/* Hotel Images */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Hotel Images</h2>
                <button
                  onClick={addImage}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Image
                </button>
              </div>
              <div className="space-y-3">
                {hotelImages.map((image, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="https://example.com/hotel-image.jpg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {hotelImages.length === 0 && (
                  <p className="text-black text-center py-4">No images added. Click "Add Image" to add one.</p>
                )}
              </div>
            </div>

            {/* Hotel Rooms */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Hotel Rooms</h2>
                <button
                  onClick={addRoom}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Room
                </button>
              </div>
              <div className="space-y-6">
                {hotelRooms.map((room, roomIndex) => (
                  <div key={roomIndex} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-gray-900">Room {roomIndex + 1}</h4>
                      <button
                        onClick={() => removeRoom(roomIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Room Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room Type
                        </label>
                        <input
                          type="text"
                          value={room.room_type}
                          onChange={(e) => handleRoomChange(roomIndex, 'room_type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., Deluxe Room"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price per Night
                        </label>
                        <input
                          type="number"
                          value={room.price_per_night}
                          onChange={(e) => handleRoomChange(roomIndex, 'price_per_night', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., 150"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Capacity
                        </label>
                        <input
                          type="text"
                          value={room.capacity}
                          onChange={(e) => handleRoomChange(roomIndex, 'capacity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="e.g., 2 Adults"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room Image
                        </label>
                        <input
                          type="text"
                          value={room.image}
                          onChange={(e) => handleRoomChange(roomIndex, 'image', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="https://example.com/room.jpg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Room Description
                        </label>
                        <textarea
                          value={room.description}
                          onChange={(e) => handleRoomChange(roomIndex, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                          placeholder="Brief description of the room"
                        />
                      </div>
                    </div>
                    
                    {/* Room Facilities */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium text-gray-700">Room Facilities</h5>
                        <button
                          onClick={() => addRoomFacility(roomIndex)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          + Add Facility
                        </button>
                      </div>
                      <div className="space-y-2">
                        {room.room_facilities?.map((facility, facilityIndex) => (
                          <div key={facilityIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={facility.facility_name}
                              onChange={(e) => handleRoomFacilityChange(roomIndex, facilityIndex, 'facility_name', e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Facility name"
                            />
                            <input
                              type="text"
                              value={facility.description}
                              onChange={(e) => handleRoomFacilityChange(roomIndex, facilityIndex, 'description', e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="Description"
                            />
                            <button
                              onClick={() => removeRoomFacility(roomIndex, facilityIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Room Images */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium text-gray-700">Additional Room Images</h5>
                        <button
                          onClick={() => addRoomImage(roomIndex)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          + Add Image
                        </button>
                      </div>
                      <div className="space-y-2">
                        {room.room_images?.map((image, imageIndex) => (
                          <div key={imageIndex} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={image}
                              onChange={(e) => handleRoomImageChange(roomIndex, imageIndex, e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="https://example.com/room-image.jpg"
                            />
                            <button
                              onClick={() => removeRoomImage(roomIndex, imageIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {hotelRooms.length === 0 && (
                  <p className="text-black text-center py-4">No rooms added. Click "Add Room" to add one.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Hotel Preview</h3>
              <div className="text-center">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-full h-32 object-cover rounded-lg mx-auto mb-3 border border-gray-200"
                  />
                )}
                <h4 className="font-semibold text-gray-900">{formData.name || 'Hotel Name'}</h4>
                <p className="text-sm text-blue-600 font-medium">{formData.hotel_code || 'Hotel Code'}</p>
                <p className="text-sm text-black mt-2">{formData.city || 'City'}</p>
                {formData.rating && (
                  <p className="text-sm text-yellow-600 font-medium">★ {formData.rating}</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-black">Hotel Facilities</span>
                  <span className="font-medium text-gray-900">{hotelFacilities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Hotel Images</span>
                  <span className="font-medium text-gray-900">{hotelImages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Hotel Rooms</span>
                  <span className="font-medium text-gray-900">{hotelRooms.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Room Facilities</span>
                  <span className="font-medium text-gray-900">
                    {hotelRooms.reduce((sum, room) => sum + (room.room_facilities?.length || 0), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default AddHotelPage;