"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Hourglass, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import BookingSkeleton from "../skeleton-screen/profile/BookingSkeleton";
import { checkoutAction } from "@/app/checkout/checkout-action";

interface Booking {
  booking_id: number;
  package_id: number;
  create_at: Date;
  status: "Pending" | "Approved" | "Completed";
  packages: Packages;
}

interface Packages {
  package_id: number;
  image: string;
  package_name: string;
  package_type?: string;
}

interface User {
  user_id: number;
  name: string;
  email: string;
  package_bookings: Booking[];
}

const BookingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Completed">("Pending");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/profile`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching user data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime())
      ? new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date)
      : "Invalid Date";
  };

  const handleCheckout = async (bookingId: number) => {
    setProcessing(bookingId);
    try {
      const res = await fetch(`http://localhost:3000/api/booking/packages/${bookingId}`);
      if (!res.ok) throw new Error("Failed to fetch booking details");
      const bookingData = await res.json();
      await checkoutAction(bookingData, bookingId);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to proceed with payment. Please try again.");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <BookingSkeleton />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredBookings = user?.package_bookings?.filter((b) => b.status === activeTab) || [];

  const tabConfig = {
  Pending: {
    label: "In Process",
    icon: Hourglass,
    gradient: "from-amber-400 to-yellow-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200"
  },
  Approved: {
    label: "Wait for Payment",
    icon: CreditCard,
    gradient: "from-blue-400 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  Completed: {
    label: "Completed",
    icon: CircleCheck,
    gradient: "from-green-400 to-emerald-500",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200"
  }
};


  return (
    <div className="text-lg font-bold mb-6 relative flex flex-col w-full max-w-4xl">
      {/* Enhanced Tabs */}
      <div className="flex gap-2 mb-8 bg-gray-50 p-2 rounded-2xl shadow-inner">
        {(["Pending", "Approved", "Completed"] as const).map((tab) => {
          const config = tabConfig[tab];
          const isActive = activeTab === tab;
          
          return (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 relative px-6 py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                isActive ? "text-white shadow-lg" : "text-gray-600 hover:text-gray-800"
              }`}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-xl`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
  <config.icon className="w-4 h-4" />
  <span className="hidden md:inline">{config.label}</span>
  <span className="md:hidden">{tab}</span>
</span>

            </motion.button>
          );
        })}
      </div>

      {/* Booking Count Badge */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {tabConfig[activeTab].label}
        </h2>
        <div className={`px-4 py-2 rounded-full ${tabConfig[activeTab].bgLight} ${tabConfig[activeTab].textColor} font-semibold`}>
          {filteredBookings.length} {filteredBookings.length === 1 ? "Booking" : "Bookings"}
        </div>
      </div>

      {/* Booking List with Animations */}
      <AnimatePresence mode="wait">
        {filteredBookings.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.booking_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 ${tabConfig[activeTab].borderColor}`}
              >
                {/* Decorative gradient overlay */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${tabConfig[activeTab].gradient}`} />
                
                <div className="flex gap-3 flex-wrap justify-center items-start md:justify-end p-6">
                  {/* Enhanced Image Container */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-opacity" />
                    <img
                      src={booking.packages.image || "/img/xray.png"}
                      alt="Package Image"
                      className="relative w-32 h-24 md:w-48 md:h-32 rounded-xl object-cover shadow-lg ring-2 ring-white"
                    />
                    {/* Status Badge on Image
                    <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tabConfig[activeTab].gradient} shadow-lg`}>
                      {tabConfig[activeTab].icon}
                    </div> */}
                  </div>

                  {/* Enhanced Booking Details */}
                <div className="flex-1 text-left">
                    <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                       {booking.packages.package_name}
                    </h3>

                <div className="flex flex-col gap-2 text-md text-gray-600">
                    <div className="flex gap-2">
                    <span>Date:</span>
                    <span className="font-medium">{formatDate(booking.create_at)}</span>
               </div>

              {/* Move package_type here */}
<div className="mt-4 flex gap-2 border text-xs border-gray-300 bg-teal-200 rounded-lg px-3 py-2 w-max text-green-700 font-semibold">
  <span className="font-bold">{booking.packages.package_type}</span>
</div>
           </div>

  {booking.status === "Approved" && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-3 flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-200"
    >
      <span>⚠️</span>
      <span>Expires in 3 days - Complete payment soon!</span>
    </motion.div>
  )}
                 </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3 flex-wrap justify-center items-start md:justify-end">
                    <motion.button
                      className="px-6 py-3 bg-teal-500 text-white cursor-pointer rounded-xl font-semibold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
                      onClick={() => router.push(`/user/BookingDetail/${booking.booking_id}`)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Details</span>
                    </motion.button>

                    {booking.status === "Approved" && (
                      <motion.button
                        disabled={processing === booking.booking_id}
                        className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center gap-2 ${
                          processing === booking.booking_id
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-gray-800 to-black text-white hover:shadow-xl hover:from-black hover:to-gray-900"
                        }`}
                        whileHover={processing === booking.booking_id ? {} : { scale: 1.05, y: -2 }}
                        whileTap={processing === booking.booking_id ? {} : { scale: 0.95 }}
                        onClick={() => handleCheckout(booking.booking_id)}
                      >
                        {processing === booking.booking_id ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⏳
                            </motion.span>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>💳</span>
                            <span>Pay Now</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-200 to-white rounded-full blur-2xl opacity-20"
              />
              <img
                src="/img/Packages/Nocontent.png"
                alt="No Content"
                className="relative w-64 h-64 object-contain"
              />
            </div>
            {/* <h3 className="mt-6 text-2xl font-bold text-gray-700">No Bookings Found</h3> */}
            <p className="mt-2 text-gray-500">You don't have any {tabConfig[activeTab].label.toLowerCase()} bookings yet.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingTabs;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import BookingSkeleton from "../skeleton-screen/profile/BookingSkeleton";
// import { checkoutAction } from "@/app/checkout/checkout-action";

// interface Booking {
//   booking_id: number;
//   package_id: number;
//   create_at: Date;
//   status: "Pending" | "Approved" | "Completed";
//   packages: Packages;
// }

// interface Packages {
//   package_id: number;
//   image: string;
//   package_name: string;
// }

// interface User {
//   user_id: number;
//   name: string;
//   email: string;
//   package_bookings: Booking[];
// }

// const BookingTabs: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Completed">("Pending");
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [processing, setProcessing] = useState<number | null>(null); // Track which booking is being paid
//   const router = useRouter();

//   // Fetch user
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const response = await fetch(`/api/profile`);
//         if (!response.ok) throw new Error("Failed to fetch user");
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error(error);
//         setError("Error fetching user data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, []);

//   // Helper: format date
//   const formatDate = (dateString: string | number | Date) => {
//     const date = new Date(dateString);
//     return !isNaN(date.getTime())
//       ? new Intl.DateTimeFormat("en-GB", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//         }).format(date)
//       : "Invalid Date";
//   };

//   // Handle checkout logic
//   const handleCheckout = async (bookingId: number) => {
//     setProcessing(bookingId);
//     try {
//       const res = await fetch(`http://localhost:3000/api/booking/packages/${bookingId}`);
//       if (!res.ok) throw new Error("Failed to fetch booking details");

//       const bookingData = await res.json();

//       // Pass fetched booking data to checkoutAction
//       await checkoutAction(bookingData, bookingId);
//     } catch (err) {
//       console.error("Checkout failed:", err);
//       alert("Failed to proceed with payment. Please try again.");
//     } finally {
//       setProcessing(null);
//     }
//   };

//   if (loading) return <BookingSkeleton />;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   const filteredBookings =
//     user?.package_bookings?.filter((b) => b.status === activeTab) || [];


//   return (
//     <div>
//       {/* Tabs for Booking Status */}
//         <div className="flex gap-50 text-lg font-bold cursor-pointer mb-6 relative">
//           {["Pending", "Approved", "Completed"].map((tab) => (
//             <div key={tab} className="relative">
//               <span
//                 className={`px-4 pb-2 transition-all duration-300 ${
//                   activeTab === tab
//                     ? tab === "Pending"
//                       ? "text-[#FFCC00]"
//                       : tab === "Approved"
//                       ? "text-[#2196F3]"
//                       : "text-[#4CAF50]"
//                     : "text-gray-700"
//                 }`}
//                 onClick={() => setActiveTab(tab as "Pending" | "Approved" | "Completed")}
//               >
//                 {tab === "Pending" ? "In Process" : tab === "Approved" ? "Wait for Payment" : "Completed"}
//               </span>
//               {/* Motion Underline Animation */}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="active-tab"
//                   className={`absolute bottom-0 left-0 w-full h-1 ${
//                     tab === "Pending"
//                       ? "bg-yellow-400"
//                       : tab === "Approved"
//                       ? "bg-blue-500"
//                       : "bg-green-500"
//                   }`}
//                   transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
        
      
//       {/* Booking List */}
//         {(user?.package_bookings ?? []).filter((booking) => booking.status === activeTab).length > 0 ? ( user?.package_bookings
//           .filter((booking) => booking.status === activeTab)
//           .map((booking) => (
//             <div key={booking.booking_id} className="flex flex-col md:flex-row items-center border border-gray-200 bg-white p-3 rounded-xl shadow-md mb-4">
//               {/* Package Image */}
//               <img
//                 src={booking.packages.image || "/img/xray.png"}
//                 alt="Package Image"
//                 className="w-24 h-16 rounded-md shadow-md md:w-40 md:h-28"
//               />

//               {/* Booking Details */}
//               <div className="flex-1 ml-4 text-center md:text-left flex flex-col justify-start">
//                 <h3 className="text-lg font-semibold">{booking.packages.package_name}</h3>
//                 <p className="text-gray-600">Date: {formatDate(booking.create_at)}</p>
//                 {booking.status === "Approved" && (
//                   <p className="text-red-500 text-sm">Expired 3 days before the booking confirmation timeout.</p>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="ml-auto flex gap-3 mt-4 md:mt-0">
//                 {/* View More Button */}
//                 <motion.button
//                   className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
//                   onClick={() => router.push(`/user/BookingDetail/${booking.booking_id}`)}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   View More
//                 </motion.button>

//                 {/* Pay Now Button (Only visible for Approved Bookings) */}
//                 {booking.status === "Approved" && (
//                 <motion.button
//                   disabled={processing === booking.booking_id}
//                   className={`${
//                     processing === booking.booking_id
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-black hover:bg-gray-900"
//                   } text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-105`}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleCheckout(booking.booking_id)}
//                 >
//                   {processing === booking.booking_id ? "Processing..." : "Pay Now"}
//                 </motion.button>
//               )}
//               </div>
//             </div>
//           ))
//       ) : (
//         // Display No Content Image if there are no bookings
//         <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
//           <img src="/img/Packages/Nocontent.png" alt="No Content" className="w-120 h-120 object-contain" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingTabs;
