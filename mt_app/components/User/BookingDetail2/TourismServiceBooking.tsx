import { Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { PackageBooking } from '@/types/Booking';
import { formatDate } from '@/components/Reuseable-Function/FormateDate';

interface MedicalServiceBookingProps {
  bookingData: PackageBooking | null;
}

const TourismServiceBooking: React.FC<MedicalServiceBookingProps> = ({ bookingData }) => {
  if(!bookingData) return;
    const tripBookings = [
    {
      id: 1,
      tripName: "Phuket Go Around",
      duration: "3 days",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop",
      includes: ["Phi Phi Islands", "City Tour", "James Bond Island"],
      tags: ["Summer", "Holiday", "Relax"],
      bookingDate: "Monday, October 6 2025 → Tuesday, October 7 2025",
      contact: {
        name: "Ekkarat Thepthong",
        phone: "+66 814739090",
        email: "test@gmail.com",
      },
      payments: [
        { label: "Adult (ages 16 - 80)", price: "฿ 1000 × 1" },
        { label: "Child (ages 4 - 15)", price: "฿ 500 × 1" },
        { label: "Guide (Arabic Language)", price: "฿ 1,000" },
        { label: "Car Service", price: "฿ 1,000" },
      ],
      total: "฿ 3,500",
      policy: "Cancellation and change policies",
    },
  ];

  return (
    <div>
      <div className="flex-1">
      <div key={bookingData.tourism_bookings.routes.route_id}>
        {/* Trip Details */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
            <h2 className="text-xl font-semibold">Trip Details</h2>
          </div>
          <div className="p-6 flex items-start gap-4">
            <img src={bookingData.tourism_bookings.routes.image} alt={bookingData.tourism_bookings.routes.title} className="w-32 h-48 object-cover rounded-2xl" />
            <div className="flex-1">
                <div className='flex justify-between items-start'>
              <h3 className="text-lg font-semibold">{bookingData.tourism_bookings.routes.title} <span className="text-yellow-500 ml-2 text-sm font-semibold">{bookingData.tourism_bookings.routes.duration} Day(s)</span></h3>
              <button className="cursor-pointer text-teal-400 hover:text-teal-500 font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              <p className=" font-semibold mb-3 mt-2">Including :</p>
              <ul className=" text-gray-600 space-y-3 mb-5">
                {bookingData.tourism_bookings.routes.attractions.map((item, i) => (
                  <li key={i}>• {item.places.name}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                {bookingData.tourism_bookings.routes.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-200 text-emerald-700 text-xs rounded-full">{tag.tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
            <h2 className="text-xl font-semibold">Booking Details</h2>
          </div>
          <div className="p-6">
            <p className=" font-semibold mb-2">Trip Booking Date</p>
            <p className="text-gray-700">{formatDate(bookingData.tourism_bookings.start)} - {formatDate(bookingData.tourism_bookings.end)}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Contact details</h3>
            <p className="font-semibold  text-lg mb-4">{bookingData.user_contact_detail.firstname} {bookingData.user_contact_detail.firstname}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                <span>{bookingData.user_contact_detail.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} />
                <span>{bookingData.user_contact_detail.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 pb-4 border-b border-gray-300">Payment details</h3>
              <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">Adult (age 16 - 80)</span>
                <span className="font-semibold">฿ {bookingData.tourism_bookings.routes.adult_price} x {bookingData.tourism_bookings.adult}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">Child (age 4 - 15)</span>
                <span className="font-semibold">฿ {bookingData.tourism_bookings.routes.child_price} x {bookingData.tourism_bookings.child}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">Guide ({bookingData.tourism_bookings.guide_bookings.language})</span>
                <span className="font-semibold">฿ {bookingData.tourism_bookings.routes.guide_price}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-700">Car Service</span>
                <span className="font-semibold">฿ {bookingData.tourism_bookings.routes.car_service_price}</span>
              </div>
            <div className="flex justify-between pt-3 mt-2 border-t border-gray-300">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">฿ {bookingData.price}</span>
            </div>
          </div>
        </div>

        {/* Booking Policies */}
        <div className="bg-white rounded-2xl shadow-md mb-8 border border-gray-300">
              <div className="p-6">
                <h3 className="text-lg font-semibold pb-4">
                  Booking policies
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cancellation and change policies</span>
                  <button className="cursor-pointer text-teal-400 hover:text-teal-500 text-sm font-medium flex items-center gap-1">
                    View details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
      </div>
  </div>
  </div>
  )
}
export default TourismServiceBooking