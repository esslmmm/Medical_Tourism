"use client"

// import { CalendarIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

// const SelectRoom = () => {
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);

//   return (
//     <div className="bg-[#D2ECE4] py-10 flex justify-center">
//       <div className="max-w-4xl w-full text-center">
//         <h2 className="text-3xl font-bold mb-6">Select Room</h2>

//         <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between p-6 space-y-4 md:space-y-0 md:space-x-6">
//           {/* Accommodation */}
//           <div className="flex items-center space-x-4">
//             <HomeIcon className="h-6 w-6 text-gray-500" />
//             <div>
//               <p className="text-gray-500 text-sm font-semibold">Accommodation</p>
//               <p className="font-medium">The Heritage Chiang Rai Hotel and Convention</p>
//             </div>
//           </div>

//           {/* Check-in Date */}
//           <div className="flex items-center space-x-4">
//             <CalendarIcon className="h-6 w-6 text-gray-500" />
//             <div>
//               <p className="text-gray-500 text-sm font-semibold">Check-in</p>
//               <input
//                 type="date"
//                 className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
//                 value={checkInDate}
//                 onChange={(e) => setCheckInDate(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Check-out Date */}
//           <div className="flex items-center space-x-4">
//             <CalendarIcon className="h-6 w-6 text-gray-500" />
//             <div>
//               <p className="text-gray-500 text-sm font-semibold">Check-out</p>
//               <input
//                 type="date"
//                 className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
//                 value={checkOutDate}
//                 onChange={(e) => setCheckOutDate(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Guest Info */}
//           <div className="flex items-center space-x-4">
//             <UserIcon className="h-6 w-6 text-gray-500" />
//             <div>
//               <p className="text-gray-500 text-sm font-semibold">Guests</p>
//               <div className="flex space-x-2">
//                 <select
//                   className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
//                   value={adults}
//                   onChange={(e) => setAdults(Number(e.target.value))}
//                 >
//                   {[...Array(10).keys()].map((num) => (
//                     <option key={num} value={num + 1}>{`${num + 1} Adults`}</option>
//                   ))}
//                 </select>
//                 <select
//                   className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
//                   value={children}
//                   onChange={(e) => setChildren(Number(e.target.value))}
//                 >
//                   {[...Array(6).keys()].map((num) => (
//                     <option key={num} value={num}>{`${num} Children`}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectRoom;

import { CalendarIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const SelectRoom = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <div className="bg-[#D2ECE4] py-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Select Room</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accommodation */}
          <div className="flex items-center space-x-4 border-b border-gray-300 pb-4">
            <HomeIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm font-semibold">Accommodation</p>
              <p className="font-medium">The Heritage Chiang Rai Hotel and Convention</p>
            </div>
          </div>

          {/* Guest Info */}
          <div className="flex items-center space-x-4 border-b border-gray-300 pb-4">
            <UserIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm font-semibold">Guests</p>
              <div className="flex space-x-2 w-full">
                <select
                  className="bg-gray-50 border-gray-300 text-gray-800 px-4 py-2 rounded-md w-1/2 border"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num} value={num + 1}>{`${num + 1} Adults`}</option>
                  ))}
                </select>
                <select
                  className="bg-gray-50 border-gray-300 text-gray-800 px-4 py-2 rounded-md w-1/2 border"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                >
                  {[...Array(6).keys()].map((num) => (
                    <option key={num} value={num}>{`${num} Children`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Check-in Date */}
          <div className="flex items-center space-x-4 pb-4">
            <CalendarIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm font-semibold">Check-in</p>
              <input
                type="date"
                className="bg-gray-50 border-gray-300 px-4 py-2 rounded-md w-full border"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div className="flex items-center space-x-4 pb-4">
            <CalendarIcon className="h-6 w-6 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm font-semibold">Check-out</p>
              <input
                type="date"
                className="bg-gray-50 border-gray-300 text-gray-800 px-4 py-2 rounded-md w-full border"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SelectRoom;