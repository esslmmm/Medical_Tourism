// import React, { useEffect, useState } from "react";
// import Image from "next/image"; // Import for optimized images
// import { Inter } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

// interface PackageBooking {
//   booking_id: number; // Fixed typo from "bookind_id" to "booking_id"
//   package_id: number;
//   create_at: string;
//   status: string;
// }

// const DashboardCards = () => {
//   const [bookings, setBookings] = useState<PackageBooking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [count, setCount] = useState(0);
//   const [pendingCount, setPendingCount] = useState(0);
//   const [approvedCount, setApprovedCount] = useState(0);
//   const [disapprovedCount, setDisapprovedCount] = useState(0);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch("/api/booking/packages");
//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings");
//         }
//         const data: PackageBooking[] = await response.json();

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid response format");
//         }

//         setBookings(data);
//         setCount(data.length);
//         setPendingCount(data.filter((booking) => booking.status === "Pending").length);
//         setApprovedCount(data.filter((booking) => booking.status === "Approved").length);
//         setDisapprovedCount(data.filter((booking) => booking.status === "Rejected").length);
//       } catch (err: any) {
//         console.error("Error fetching bookings:", err);
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const cards = [
//     { imgSrc: "/img/booking-management/total.png", number: count, text: "Total" },
//     { imgSrc: "/img/booking-management/pending.png", number: pendingCount, text: "Pending" },
//     { imgSrc: "/img/booking-management/approve.png", number: approvedCount, text: "Approved" },
//     { imgSrc: "/img/booking-management/disapprove.png", number: disapprovedCount, text: "Disapproved" },
//   ];

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500 text-center">{error}</p>;
//   }

//   return (
//     <div
//       className={`pt-10 border border-[#C5D1E0] bg-white rounded-[30px] shadow-md w-full h-[230px] mx-auto flex justify-center gap-40 ${inter.className}`}
//     >
//       {cards.map(({ imgSrc, number, text }, index) => (
//         <div key={index} className="flex flex-col items-center text-center">
//           <Image src={imgSrc} alt={text} width={96} height={96} className="w-24 h-24" />
//           <span className="font-bold text-lg mt-2" style={{ fontSize: "25px" }}>
//             {number}
//           </span>
//           <p className="text-gray-700 font-semibold" style={{ fontSize: "15px" }}>
//             {text}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashboardCards;



import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users, 
  TrendingUp,
  AlertCircle,
  FileText
} from "lucide-react";

interface PackageBooking {
  booking_id: number;
  package_id: number;
  create_at: string;
  status: string;
}

const MedicalTourismDashboard = () => {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [disapprovedCount, setDisapprovedCount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data: PackageBooking[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setBookings(data);
        setCount(data.length);
        setPendingCount(data.filter((booking) => booking.status === "Pending").length);
        setApprovedCount(data.filter((booking) => booking.status === "Approved").length);
        setDisapprovedCount(data.filter((booking) => booking.status === "Rejected").length);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cards = [
    { 
      icon: Users, 
      number: count, 
      text: "Total Bookings",
      subtitle: "All medical packages",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      iconColor: "text-blue-500"
    },
    { 
      icon: Clock, 
      number: pendingCount, 
      text: "Pending Review",
      subtitle: "Awaiting approval",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      iconColor: "text-yellow-500"
    },
    { 
      icon: CheckCircle, 
      number: approvedCount, 
      text: "Approved",
      subtitle: "Ready to proceed",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "text-green-500"
    },
    { 
      icon: XCircle, 
      number: disapprovedCount, 
      text: "Rejected",
      subtitle: "Requires attention",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      iconColor: "text-red-500"
    },
  ];

  const getStatusPercentage = (statusCount: number) => {
    return count > 0 ? Math.round((statusCount / count) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mx-auto">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <div>
            <h3 className="text-red-800 font-medium">Error Loading Dashboard</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Tourism Dashboard</h2>
        <p className="text-gray-600">Manage patient bookings and medical package requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ icon: Icon, number, text, subtitle, bgColor, textColor, iconColor }, index) => (
          <div 
            key={index} 
            className={`${bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${textColor} mb-1`}>
                  {getStatusPercentage(number)}% of total
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-3xl font-bold ${textColor}`}>
                {number.toLocaleString()}
              </div>
              <div>
                <h3 className={`font-semibold ${textColor} text-lg`}>{text}</h3>
                <p className="text-gray-600 text-sm">{subtitle}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-yellow-500' :
                    index === 2 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${getStatusPercentage(number)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Review Pending Requests</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 border border-green-200">
            <Calendar className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">Schedule Appointments</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 border border-purple-200">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-purple-700 font-medium">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Status Summary */}
      {count > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{getStatusPercentage(count)}%</div>
              <div className="text-sm text-gray-600">Total Coverage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{getStatusPercentage(pendingCount)}%</div>
              <div className="text-sm text-gray-600">Pending Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{getStatusPercentage(approvedCount)}%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{getStatusPercentage(disapprovedCount)}%</div>
              <div className="text-sm text-gray-600">Rejection Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalTourismDashboard;
