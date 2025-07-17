import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

interface PackageBooking {
  booking_id: number;
  status: string;
  create_at: string;
  inter_booking_id: number | null;
}

interface InterBooking {
  booking_id: number;
  interpreter_id: number;
  start: string;
  end: string;
  interpreters: Interpreters;
}

interface Interpreters {
  interpreter_id: number;
  name: string;
  language: string;
  phone: string;
  image: string;
}

interface InterpreterProps {
  selectedDay: number | "all"; 
}

const Interpreter: React.FC<InterpreterProps> = ({ selectedDay }) => {
  const { id } = useParams();
  const [packageBooking, setPackageBooking] = useState<PackageBooking | null>(null);
  const [interBooking, setInterBooking] = useState<InterBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const daysInMonth = 30; 
  const startDayOfWeek = 6; 

  useEffect(() => {
    const fetchPackageBooking = async () => {
      try {
        const response = await fetch(`/api/booking/packages/${id}`);
        if (!response.ok) throw new Error("Failed to fetch package booking data");
        const packageData = await response.json();
        setPackageBooking(packageData);

        if (packageData.inter_booking_id) {
          const interResponse = await fetch(`/api/booking/interpreters/${packageData.inter_booking_id}`);
          if (!interResponse.ok) throw new Error("Failed to fetch interpreter booking data");
          const interData = await interResponse.json();
          setInterBooking(interData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageBooking();
  }, [id]);

  const formatDate = (timestamp: string) => {
    if (!timestamp) return "Invalid Date";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYearMonth = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; 
  
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  };

  const getDayOnly = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; 
  
    return date.getDate();
  };

  // ✅ Function to Check if Interpreter is Available on the Selected Day
  const isInterpreterAvailable = () => {
    if (selectedDay === "all") return true; // Show all dates

    if (!interBooking) return false;

    const selectedDate = new Date(interBooking.start);
    selectedDate.setDate(selectedDate.getDate() + (selectedDay - 1));

    const startDate = new Date(interBooking.start);
    const endDate = new Date(interBooking.end);

    return selectedDate >= startDate && selectedDate <= endDate;
  };

  // ✅ Hide the component if the interpreter is not available on the selected day
  if (!isInterpreterAvailable()) return null;

  const startDate = interBooking?.start ? getDayOnly(interBooking.start) : null;
  const endDate = interBooking?.end ? getDayOnly(interBooking.end) : null;
  const markedDates =
    typeof startDate === "number" &&
    typeof endDate === "number" &&
    startDate <= endDate
      ? Array.from({ length: endDate - startDate + 1 }, (_, i) => startDate + i)
      : [];
  
  if (loading) return <p className="text-center text-gray-500">Loading interpreter details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!interBooking) return <p className="text-center text-gray-500"></p>;

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md mt-6 border border-[#C5D1E0] ${inter.className}`}>
      <h2 className="text-xl font-bold mb-4" style={{ fontSize: "25px" }}>Interpreter</h2>

      <div className="flex items-start">
        {/* Interpreter Image */}
        <img 
          src={interBooking.interpreters.image} 
          alt="Interpreter" 
          className="w-30 h-30 rounded-full ml-15 mb-5 border border-gray-300 mr-4"
        />

        {/* Interpreter Info */}
        <div className="ml-10 space-y-1">
          <p className="text-md font-bold">Name: <span className="font-normal">{interBooking?.interpreters?.name ?? "Unknown"}</span></p>
          <p className="text-md font-bold">Language: <span className="font-normal">{interBooking?.interpreters?.language ?? "Unknown"}</span></p>
          <p className="text-md font-bold">Contact Number: <span className="font-normal">{interBooking?.interpreters?.phone ?? "Unknown"}</span></p>
          <p className="text-md font-bold">In Plan: 
            <span className="font-normal">
              {interBooking?.start ? formatDate(interBooking.start) : "Unknown"} - 
              {interBooking?.end ? formatDate(interBooking.end) : "Unknown"}
            </span>
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 w-full mx-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{getYearMonth(interBooking.start)}</h3>

        <div className="grid grid-cols-7 gap-2 text-center text-gray-600">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
            <div key={index} className="font-bold text-gray-700">{day}</div>
          ))}

          {[...Array(startDayOfWeek)].map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}

          {[...Array(daysInMonth)].map((_, index) => {
            const dayNumber = index + 1;
            const isInRange = markedDates.includes(dayNumber);

            return (
              <div 
                key={index} 
                className={`p-2 rounded-lg text-gray-800 font-semibold cursor-pointer transition-all
                  ${isInRange ? "bg-blue-500 text-white" : "bg-gray-100"}
                  hover:bg-gray-300
                `}
              >
                {dayNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Interpreter;
