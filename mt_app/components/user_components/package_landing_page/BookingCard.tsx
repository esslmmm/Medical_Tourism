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
    <div className="w-full">
      {/* Enhanced Full-Width Booking Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-8 text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-3">🚀 Ready to Start Your Medical Journey?</h3>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Complete your package selection and begin the booking process. Our team will guide you through every step.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Left Column - Steps & Summary */}
            <div>
              {/* What Happens Next */}
              <div className="mb-6 lg:mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">What happens next?</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Instant Booking Confirmation</p>
                      <p className="text-sm text-gray-600">Get immediate confirmation & care coordinator contact</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Personal Consultation</p>
                      <p className="text-sm text-gray-600">Free 30-minute call to plan your journey</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Complete Planning</p>
                      <p className="text-sm text-gray-600">Finalize dates, medical appointments & travel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Package Summary */}
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 h-full">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Package Summary</h4>
            
            {/* Selected Services */}
            <div className="space-y-3 mb-6">
              {selectedTourismRoute && (
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">🌏</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Wellness Tourism Experience</p>
                      <p className="text-sm text-gray-600">Recovery-friendly cultural activities</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    ${selectedTourismRoute.trips.total_price.toLocaleString()}
                  </span>
                </div>
              )}
              
              {includeAccommodation && (
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">🏨</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Accommodation</p>
                      <p className="text-sm text-gray-600">Premium hotel stay</p>
                    </div>
                  </div>
                  <span className="text-sm text-amber-600 font-medium">Selected</span>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">⚕️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Medical Care</p>
                    <p className="text-sm text-gray-600">Expert treatment & support</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Included</span>
              </div>
            </div>

            {/* Total Display */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Service Coordination Fee:</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${calculateTotalPrice().toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Medical costs quoted separately</div>
                </div>
              </div>
            </div>
          </div>

          </div>
          </div>

          {/* Call to Action - Full Width & Prominent */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Ready to Begin?</h4>
              <p className="text-gray-600">
                Start your consultation process. No payment required - we'll create your personalized treatment plan first.
              </p>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-8 text-xl" 
              onClick={handleStart}
              disabled={startloading}
            >
              {startloading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Setting up your booking...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span>🚀 Start Your Medical Journey</span>
                  <span className="text-2xl">→</span>
                </div>
              )}
            </button>

            {/* Trust & Security Footer */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                ✅ Free cancellation • ✅ Secure booking • ✅ No hidden fees
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Secure Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                  <span>JCI Accredited</span>
                </div>
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