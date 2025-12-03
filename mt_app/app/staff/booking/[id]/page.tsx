"use client";

import { useEffect, useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { useParams } from 'next/navigation';
import { PackageBooking } from '@/types/Booking';
import MedicalServiceCard from '@/components/staff_component/BookingDetail/MedicalService';
import PlacesToVisit from '@/components/staff_component/BookingDetail/PlacesToVisit';
import Guide from '@/components/staff_component/BookingDetail/Guide';
import UserDetail from '@/components/staff_component/BookingDetail/UserDetail';

const BookingApp = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
//   const [Booking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"medical" | "tourism">("medical");


    const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);

  useEffect(() => {
      const fetchPackageBooking = async () => {
        try {
          const response = await fetch(`/api/staff/booking/packages/${id}`);
          if (!response.ok) throw new Error("Failed to fetch package booking data");
          const packageData = await response.json();
          setPackageBooking(packageData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPackageBooking();
    }, [id]);
  


  if (loading) return <p className="text-center text-gray-500">Loading details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-8 text-black">

        <UserDetail data={packageBooking} user={packageBooking?.user}/>

        {/* ⬇️ NEW SERVICE TAB UI (same as PackageDetail) */}
        <div className="pt-6 border-b border-gray-300">
          <div className="flex items-center gap-8">

            {/* Medical Tab */}
            <div>
              <button
                onClick={() => setActiveTab("medical")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${activeTab === "medical"
                    ? "text-white bg-teal-500"
                    : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase size={18} />
                  Medical Service
                </div>
              </button>

              <div
                className={`${activeTab === "medical"
                    ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                    : "mt-3"
                  }`}
              ></div>
            </div>

            {/* Tourism Tab */}
            <div>
              <button
                onClick={() => setActiveTab("tourism")}
                className={`cursor-pointer text-base font-bold px-4 py-2 rounded ${activeTab === "tourism"
                    ? "text-white bg-teal-500"
                    : "text-gray-500 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  Tourism Service
                </div>
              </button>

              <div
                className={`${activeTab === "tourism"
                    ? "border-t-2 border-teal-500 transition-all duration-300 mt-3"
                    : "mt-3"
                  }`}
              ></div>
            </div>

          </div>
        </div>

        

        {/* Main Content */}
        <div className="pt-6">
          {activeTab === "medical" ? <MedicalServiceCard packageBooking={packageBooking} setPackageBooking={setPackageBooking}/> : <div>
            <div className="bg-white rounded-2xl shadow-md  border border-gray-300">
        <div className="bg-emerald-500 text-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-2xl font-semibold">Tourism Services</h2>
        </div>
                    <PlacesToVisit tripBooking={packageBooking?.tourism_bookings ?? null} setPackageBooking={setPackageBooking}/>
            <Guide guideBooking={packageBooking?.tourism_bookings.guide_bookings ?? null} setPackageBooking={setPackageBooking}/>
      </div>
        </div>}
        </div>

      </div>
    </div>
  );
};

export default BookingApp;
