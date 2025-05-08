import React from 'react'
import Image from "next/image";

const Interpreter = () => {
  return (
      <div><div className="bg-white p-6 border-b border-[#E0E0E0]">
          <h3 className="font-bold text-black text-xl">Interpreter</h3>
          <div className="flex gap-4 items-start mt-4">
              {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src="/img/Interpreter/interpreter4.png"
                        alt=""
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
              <div className='space-y-1'>
                  <p className="font-bold text-black text-md">Rayji De Guia</p>
                  <p className="text-sm text-black">English to Thai Language</p>
                  <p className="text-sm text-black">1 - 5 FEB 2025</p>
              </div>
          </div>
      </div></div>
  )
}

export default Interpreter