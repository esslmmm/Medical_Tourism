'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Hotel, Plus, Search, MapPin, Star, Edit, Trash2, Phone, Bed, Clock, Eye } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';
import ConfirmDialog from '@/components/admin_component/ui/ConfirmDialog';
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

interface HotelRoomFacility {
  room_facilitiy_id?: number;
  facility_name: string;
  description: string;
}

interface RoomImage {
  image_id?: number;
  image: string;
}

interface HotelRoom {
  room_id?: number;
  room_type: string;
  price_per_night: number;
  capacity: string;
  description: string;
  image: string;
  hotel_room_facilities?: HotelRoomFacility[];
  room_image?: RoomImage[];
}

interface HotelData {
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
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState<HotelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    hotelId: 0,
    hotelName: ''
  });

  // Fetch hotels data
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/services/hotels');
      
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch hotels:', response.status, errorText);
        showError('Failed to fetch hotels', 'Please try again later');
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      showError('Error fetching hotels', 'Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (hotelId: number, hotelName: string) => {
    setConfirmDialog({
      isOpen: true,
      hotelId,
      hotelName
    });
  };

  const handleDeleteConfirm = async () => {
    const { hotelId, hotelName } = confirmDialog;
    
    try {
      const response = await fetch(`/api/admin/services/hotels/${hotelId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        showSuccess('Hotel deleted successfully', `${hotelName} has been removed from the system`);
        await fetchHotels(); // Refresh the list
      } else {
        console.error('Failed to delete hotel');
        showError('Failed to delete hotel', 'Please try again later');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      showError('Error deleting hotel', 'Please try again later');
    }
    
    setConfirmDialog({ isOpen: false, hotelId: 0, hotelName: '' });
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.hotel_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique cities count
  const uniqueCities = new Set(hotels.map(h => h.city)).size;

  // Calculate average rating
  const averageRating = hotels.length > 0 ? 
    hotels.reduce((sum, h) => sum + (h.rating || 0), 0) / hotels.length : 0;

  // Calculate total rooms
  const totalRooms = hotels.reduce((sum, h) => sum + (h.hotel_rooms?.length || 0), 0);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading hotels...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, hotelId: 0, hotelName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Hotel"
        message={`Are you sure you want to delete "${confirmDialog.hotelName}"? This action cannot be undone and will remove all associated rooms, facilities, and bookings.`}
        confirmText="Delete Hotel"
        cancelText="Cancel"
      />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
              <p className="text-black">Manage hotel details, rooms, and facilities</p>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => router.push('/admin/hotel/add')}
            >
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
                  <p className="text-sm text-black">Total Hotels</p>
                  <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-black">Cities Covered</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueCities}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-black">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <Bed className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-black">Total Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${confirmDialog.isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                      <p className="text-sm text-black font-mono">{hotel.hotel_code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                        onClick={() => router.push(`/admin/hotel/${hotel.hotel_id}`)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => router.push(`/admin/hotel/edit/${hotel.hotel_id}`)}
                        title="Edit Hotel"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => handleDeleteClick(hotel.hotel_id, hotel.name)}
                        title="Delete Hotel"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-black">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{hotel.city}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating || 'N/A'}</span>
                    </div>

                    <p className="text-sm text-black line-clamp-2">{hotel.description}</p>

                    <div className="flex items-center text-black text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Check-in: {hotel.check_in_time}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {hotel.hotel_facilities?.slice(0, 2).map((facility, index) => (
                        <span key={facility.facility_id || index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {facility.facility_name}
                        </span>
                      ))}
                      {(hotel.hotel_facilities?.length || 0) > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full">
                          +{(hotel.hotel_facilities?.length || 0) - 2} more
                        </span>
                      )}
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-center justify-between text-sm text-black">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-32">
                            {hotel.contact_info?.split(',')[0] || hotel.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {hotel.city}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            {hotel.hotel_rooms?.length || 0} rooms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-8">
                <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-black">No hotels found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default HotelManagement;