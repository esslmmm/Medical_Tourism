import React from 'react'
import Image from "next/image";

const Accommodation = () => {
  return (
      <div><div className="bg-white p-6 border-b border-[#E0E0E0]">
          <h3 className="font-bold text-black text-xl">Accommodation</h3>
          <div className="flex gap-4 items-start mt-4">
              {/* Image */}
                            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                      src="/img/hotels/wanasom03.jpg"
                                      alt=""
                                      width={80}
                                      height={80}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
              <div>
                  <p className="font-bold text-black text-sm">Wanasom Resort</p>
                  <p className="text-sm text-black">8 Feb 2025 - 10 Feb 2025 | 2 Nights</p>
                  <p className="text-sm text-black">1 x Sweet Dream Room (90m²)</p>
                  <p className="text-sm text-black">Guest(s): 1 Adult</p>
              </div>
          </div>
      </div></div>
  )
}

export default Accommodation