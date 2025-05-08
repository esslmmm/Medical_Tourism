import React from 'react'
import Image from "next/image";

const PlaceToVisit = () => {
  return (
      <div className="bg-white p-6 border-b border-[#E0E0E0]">
          <h3 className="text-xl font-bold text-black">Place to Visit</h3>
          <p className="text-black text-sm">Sat, 8 FEB 2025</p>
          <div className="flex gap-4 items-start mt-4">
              {/* Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/img/Places/khunkorn.png"
                        alt=""
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
              <div>
                  <p className="text-black font-bold text-md ">Khon Kron Waterfall</p>
                  <p className="text-black">Time: 1:00 PM - 3:00 PM</p>
              </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src="/img/Places/Wat_Rong_Khun.jpg"
                        alt=""
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
              <div>
                  <p className="text-black font-bold text-md">Wat Rong Khunl</p>
                  <p className="text-black">Time: 3:00 PM - 5:00 PM</p>
              </div>
          </div>
      </div>
  )
}

export default PlaceToVisit