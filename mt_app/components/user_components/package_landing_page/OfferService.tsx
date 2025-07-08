"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updatePackageBooking } from "../../../app/api/booking/packages/updatePackageBooking";
import { createtrip } from "../../../app/api/booking/trips/createtrip";
import { useSession, signIn } from 'next-auth/react';
import LoginModal from "../Homepage/LoginModal";

interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  description: description[];
  trips: trips[]
}

interface trips {
  tour_id: number;
  package_id: number;
}

interface description {
  description_id: number;
  title: string;
  details: string;
}
type ServiceType = "accommodation_booking" | "Interpreter";

interface ServicesProps {
  selectedServices: Record<ServiceType, boolean>;
}

const OfferService: React.FC<ServicesProps> = ({selectedServices}) => {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [startloading, setstartLoading] = useState(false); // Optional loading state
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


    const handleStart = async () => {
      if (startloading) return; // Prevent double submission
      setstartLoading(true);

      const selected = Object.entries(selectedServices)
        .filter(([_, value]) => value)
        .map(([key]) => key as ServiceType);

      if (selected.length === 0) {
        alert('Please select at least one service.');
        setstartLoading(false);
        return;
      }

      try {
        // Check authentication first
        const isAuthenticated = await checkUserAuth();
        
        if (!isAuthenticated) {
          // Store booking intent
          localStorage.setItem('bookingIntent', JSON.stringify({
            selectedServices: selected,
            packageId: id,
            packageData: data,
            redirectTo: `/user/${selected[0]}/${id}`
          }));
          
          // Show modal instead of redirecting
          setIsLoginOpen(true);
          setstartLoading(false);
          return;
        }

        // User is authenticated, proceed with booking creation
        const payload = {
          user_id: 1, // You might want to get this from authenticated user context
          package_id: Number(id),
          tourism_booking_id: null,
          appointment_id: null,
          hotel_booking_id: null,
          contact_id: null,
          inter_booking_id: null,
          status: 'In_Progress',
        };

        const res = await fetch('/api/booking/packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const error = await res.json();
          
          // If it's an authentication error, redirect to login
          if (res.status === 401 || res.status === 403) {
            localStorage.setItem('bookingIntent', JSON.stringify({
              selectedServices: selected,
              packageId: id,
              packageData: data,
              redirectTo: `/user/${selected[0]}/${id}`
            }));
            router.push('/login');
            setstartLoading(false);
            return;
          }
          
          alert(`Booking failed: ${error.error}`);
          setstartLoading(false);
          return;
        }

        const result = await res.json();
        const package_booking_id = result.booking_id;

        // If Medical_Tourism, proceed with creating tourism booking
        if (data?.trips[0]?.tour_id) {
          const tourPayload = {
            tour_id: data.trips[0].tour_id,
            status: 'In_Progress',
          };

          console.log('Sending trip payload:', tourPayload);
          const response = await createtrip(tourPayload);

          if (!response || response.error) {
            throw new Error(response?.error || 'Failed to create tourism booking');
          }

          const tourism_booking_id = response.tourism_id;

          if (!package_booking_id || !tourism_booking_id) {
            throw new Error('Missing booking ID(s).');
          }

          // Update package booking with tourism_booking_id
          await updatePackageBooking(Number(package_booking_id), {
            tourism_booking_id,
          });
        }

        localStorage.setItem('package_booking_id', package_booking_id);
        localStorage.setItem('selectedSteps', JSON.stringify(selected));
        localStorage.setItem('currentStepIndex', '0');

        router.push(`/user/${selected[0]}/${id}`);
      } catch (error) {
        console.error('Error creating booking:', error);
        alert('Something went wrong while creating the booking.');
      } finally {
        setstartLoading(false);
      }
    };

    const checkUserAuth = () => {
        // No need for async/await since session data is already available
        return status === 'authenticated' && session?.user;
      };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Book Button Styled as a Div */}
        <div
          onClick={handleStart}
          className={`cursor-pointer w-2/3 sm:w-1/2 md:w-2/3 bg-green-400 text-white text-lg px-8 py-4 font-semibold rounded-2xl hover:bg-green-700 transition duration-300 flex justify-center items-center mx-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {startloading ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
              />
            </svg>
          ) : (
            'Book'
          )}
        </div>
      {/* Services Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl text-[#000000] font-bold mb-6">Offer Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data?.description.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-[#000000] text-lg">{service.title}</h3>
              {service.details && (
                <p className="text-gray-600 text-sm mt-2">{service.details}</p>
              )}
            </div>
          ))}
        </div>
      </section>

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)}
        />

    </div>

    
  );
}

export default OfferService;

