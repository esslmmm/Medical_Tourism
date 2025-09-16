"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Globe, Plus, Minus } from 'lucide-react';

const MakeAppointment = () => {

  const [selectedDate, setSelectedDate] = useState('5 October 2025');
    const [selectedTime, setSelectedTime] = useState('7:00');
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(1);

    const timeSlots = ['7:00', '8:00', '9:00', '10:00'];
  const dates = ['Fri\nOct', 'Fri\nOct', 'Fri\nOct', 'Fri\nOct'];


  return (
    <div>
      {/* <MakeAppointment/> */}
      <h1 className=" my-5 text-2xl font-bold text-gray-900">Make an Appointment</h1>

      {/* Date Selection */}
      <div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5'>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Select Date</span>
          <button className="text-xs text-teal-500 font-bold">show more dates</button>
        </div>
        <div className="flex gap-2">
                  {dates.map((date, index) => (
                    <div
                      key={index}
                      className={`flex-1 border rounded-lg p-4 text-center cursor-pointer ${
                        index === 0 ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                      }`}
                    >
                      <div className={`text-xs whitespace-pre-line ${
                        index === 0 ? 'text-teal-500' : 'text-gray-600'
                      }`}>
                        {date}
                      </div>
                    </div>
                  ))}
                </div>
      </div>

      {/* Time Selection */}
      <div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5'>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Select Time</span>
          <button className="text-xs text-teal-500 font-bold">show more time</button>
        </div>
        <div className="flex gap-2">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      className={`flex-1 py-3 rounded text-sm font-bold ${
                        time === selectedTime
                          ? 'bg-teal-100 text-teal-600'
                          : 'text-gray-400'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5">
            {/* Tourist Count */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-gray-900">How Many Tourist ?</span>
                <ChevronDown className="w-5 h-5 text-emerald-500" />
              </div>
              
              {/* Adults */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-semibold text-gray-900">Adult (ages 16 - 80)</div>
                </div>
                <div className="flex items-center bg-white rounded-full border border-gray-200">
                  <button 
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                    className="p-3 text-gray-400 hover:text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-emerald-500">{adults}</span>
                  <button 
                    onClick={() => setAdults(adults + 1)}
                    className="p-3 text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
      
              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Child (ages 4 - 15)</div>
                </div>
                <div className="flex items-center bg-white rounded-full border border-gray-200">
                  <button 
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="p-3 text-gray-400 hover:text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium text-emerald-500">{children}</span>
                  <button 
                    onClick={() => setChildren(children + 1)}
                    className="p-3 text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
            </div>

            {/* Book Now Button */}
    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl transition-colors mt-6">
        Next Step
    </button>
    
    {/* Policy Checkbox */}
    <div className="flex items-start mt-4">
        <input type="checkbox" id="policy" className="form-checkbox text-emerald-500 rounded-lg h-5 w-5 mr-2" />
        <label htmlFor="policy" className="text-gray-600 text-sm">
            This package covers appointment arrangements only. All medical 
                    expenses and related costs must be paid directly to the hospital.
        </label>
        </div>
        </div>
    </div>
  )
}
export default MakeAppointment