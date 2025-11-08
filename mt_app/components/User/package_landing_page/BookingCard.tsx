"use client"
import { useRouter, useParams } from "next/navigation";
import React, { useState } from 'react';
import { Check, Info, AlertCircle } from 'lucide-react';
import { useUserId } from "@/hooks/useUserId";
import { createtrip } from "@/app/api/booking/trips/createtrip";
import { updatePackageBooking } from "@/app/api/booking/packages/updatePackageBooking";
import LoginModal from "../Homepage/LoginModal";



interface trips {
  tour_id: number;
  package_id: number;
  total_price: number;
}

interface Packages {
  package_id: number;
  package_name: string;
  packages_package_type: string;
  duration: number;
  routes: routes[]
  description: description[];
}

interface description {
  description_id: number;
  title: string;
  details: string;
}

interface routes{
  route_id: number;
  tour_id: number;
  trips: trips
}

interface PackageDetailProps {
  selectedTourismRoute: routes | null;
  data: Packages | null;
  includeAccommodation: boolean;
}

type ServiceType = "accommodation_booking" | "Guide";

const BookingCard: React.FC<PackageDetailProps> = ({ selectedTourismRoute, data, includeAccommodation }) => {
    const params = useParams<{ id: string }>();
  const id = params?.id;
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { userId, isLoading, isAuthenticated } = useUserId();
  const [startloading, setstartLoading] = useState(false);
  const router = useRouter();

  // derived service selection
  const selectedServices: Record<ServiceType, boolean> = {
    accommodation_booking: includeAccommodation,
    Guide: selectedTourismRoute !== null,
  };

  const handleStart = async () => {
    if (startloading) return;
    setstartLoading(true);
  
    const selected = Object.entries(selectedServices)
      .filter(([_, value]) => value)
      .map(([key]) => key as ServiceType);
  
    try {
      if (!isAuthenticated) {
        // If no services selected → go directly to medical_appointment form
        const redirectPath =
          selected.length === 0
            ? `/user/Form/medical_appointment/${id}`
            : `/user/${selected[0]}/${id}`;
  
        localStorage.setItem(
          "bookingIntent",
          JSON.stringify({
            selectedServices: selected,
            packageId: id,
            packageData: data,
            redirectTo: redirectPath,
          })
        );
  
        // Show login modal instead of redirecting
        setIsLoginOpen(true);
        setstartLoading(false);
        return;
      }
  
      // User is authenticated, proceed with booking creation
      const payload = {
        user_id: Number(userId),
        package_id: id,
        tourism_booking_id: null,
        appointment_id: null,
        hotel_booking_id: null,
        contact_id: null,
        guide_booking_id: null,
        status: "In_Progress",
      };
  
      const res = await fetch("/api/booking/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const error = await res.json();
  
        if (res.status === 401 || res.status === 403) {
          const redirectPath =
            selected.length === 0
              ? `/user/Form/medical_appointment/${id}`
              : `/user/${selected[0]}/${id}`;
  
          localStorage.setItem(
            "bookingIntent",
            JSON.stringify({
              selectedServices: selected,
              packageId: id,
              packageData: data,
              redirectTo: redirectPath,
            })
          );
  
          router.push("/login");
          setstartLoading(false);
          return;
        }
  
        alert(`Booking failed: ${error.error}`);
        setstartLoading(false);
        return;
      }
  
      const result = await res.json();
      const package_booking_id = result.booking_id;
  
      // If a tourism route was chosen → create tourism booking
      if (selectedTourismRoute?.tour_id) {
        const tourPayload = {
          tour_id: selectedTourismRoute.tour_id,
          status: "In_Progress",
        };
  
        console.log("Sending trip payload:", tourPayload);
        const response = await createtrip(tourPayload);
  
        if (!response || response.error) {
          throw new Error(response?.error || "Failed to create tourism booking");
        }
  
        const tourism_booking_id = response.tourism_id;
  
        if (!package_booking_id || !tourism_booking_id) {
          throw new Error("Missing booking ID(s).");
        }
  
        await updatePackageBooking(package_booking_id, {
          tourism_booking_id,
        });
      }
  
      localStorage.setItem("package_booking_id", package_booking_id);
      localStorage.setItem("selectedSteps", JSON.stringify(selected));
      localStorage.setItem("currentStepIndex", "0");
  
      // ✅ Navigation check
      if (selected.length === 0) {
        router.push(`/user/Form/medical_appointment/${id}`);
      } else {
        router.push(`/user/${selected[0]}/${id}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Something went wrong while creating the booking.");
    } finally {
      setstartLoading(false);
    }
  };
  

  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedTourismRoute) {
      total += selectedTourismRoute.trips.total_price;
    }
    return total;
  };
  
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">${calculateTotalPrice().toLocaleString()}</span>
            <span className="text-gray-600">package total</span>
          </div>
          
          {/* Pricing Breakdown */}
          <div className="space-y-2 mb-4">

            {/* Accommodation Pricing */}
            {includeAccommodation && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Accommodation</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Hotel pricing will be shown on the next page after you select your preferred accommodation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tourism Route Pricing */}
            {selectedTourismRoute && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-sm text-gray-600">Tourism package:</span>
                <span className="text-sm font-medium text-gray-900">
                  ${selectedTourismRoute.trips.total_price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <button 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleStart}
          disabled={startloading}
        >
          {startloading ? 'Processing...' : 'Continue Booking'}
        </button>

        {/* Included Services */}
        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <h4 className="font-medium text-gray-900 text-base">What's Included:</h4>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Free cancellation up to 48 hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>24/7 medical support coordination</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Hospital transfers included</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>English-speaking coordinator</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Pre-treatment consultation</span>
          </div>
        </div>

        {/* Warning section */}
        <div className="space-y-2">
         {/* Medical Treatment Pricing */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Medical Treatment</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Medical costs are paid directly to the hospital based on your treatment plan. 
                    Final pricing will be provided during consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Pricing Note */}
          <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-teal-500">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-700">
                  <strong>Package includes:</strong> Coordination services, transfers, and support. 
                  Medical and accommodation costs are additional and will be clarified during booking process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  )
}

export default BookingCard