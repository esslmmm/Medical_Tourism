"use client"

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Plus, Minus } from 'lucide-react';

const MakeAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null); // fix scrollBy type
  const [selectedTime, setSelectedTime] = useState<string>('7:00');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(1);

  const timeSlots: string[] = ['7:00', '8:00', '9:00', '10:00'];

  // Generate dates array starting from today
  const generateDates = (startDate: Date, count = 30): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates(new Date());

  const formatDateDisplay = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(calendarMonth);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
      const isSelected = isSameDay(currentDate, selectedDate);
      const isToday = isSameDay(currentDate, today);
      const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      days.push(
        <button
          key={day}
          onClick={() => {
            if (!isPast) {
              setSelectedDate(currentDate);
              setShowCalendar(false);
            }
          }}
          disabled={isPast}
          className={`h-10 rounded-lg flex items-center justify-center font-medium transition-colors
            ${isSelected ? 'bg-teal-500 text-white' : ''}
            ${isToday && !isSelected ? 'border-2 border-teal-500 text-teal-500' : ''}
            ${!isSelected && !isToday && !isPast ? 'hover:bg-gray-100' : ''}
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const changeMonth = (direction: number) => {
    const newMonth = new Date(calendarMonth);
    newMonth.setMonth(calendarMonth.getMonth() + direction);
    setCalendarMonth(newMonth);
  };

  const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];



  return (
    <div className=''>
      {/* max-h-screen overflow-auto */}

      {/* <MakeAppointment/> */}
      <h1 className=" my-5 text-2xl font-bold text-gray-900">Make an Appointment</h1>

      {/* Date Selection */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">Select Date</p>
          <button 
            onClick={() => setShowCalendar(true)}
            className="text-xs text-teal-500 font-bold hover:text-teal-600 transition-colors"
          >
            show more dates
          </button>
          </div>
          <ChevronDown className="w-5 h-5 text-emerald-500" />
        </div>
        
        {/* Scrollable Date Selection */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {dates.map((date, index) => {
              const { day, date: dateNum, month } = formatDateDisplay(date);
              const isSelected = isSameDay(date, selectedDate);
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 w-20 border rounded-2xl p-3 text-center cursor-pointer transition-all ${
                    isSelected ? 'border-teal-500 bg-teal-50 border-2' : 'border-gray-300 hover:border-teal-300'
                  }`}
                >
                  <div className={`text-xs font-medium ${
                    isSelected ? 'text-teal-500' : 'text-gray-600'
                  }`}>
                    {day}
                  </div>
                  <div className={`text-xl font-bold mt-1 ${
                    isSelected ? 'text-teal-500' : 'text-gray-900'
                  }`}>
                    {dateNum}
                  </div>
                  <div className={`text-xs ${
                    isSelected ? 'text-teal-500' : 'text-gray-600'
                  }`}>
                    {month}
                  </div>
                </div>
              );
            })}
          </div>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Selected Date Display */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected Date:</p>
          <p className="text-lg font-semibold text-gray-900">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Date</h2>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-semibold text-gray-900">
                {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </span>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 h-10 flex items-center justify-center">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>

            <button
              onClick={() => setShowCalendar(false)}
              className="w-full bg-teal-500 text-white rounded-lg py-3 font-semibold hover:bg-teal-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

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
      
      {/* Patient Count */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5">
            {/* Tourist Count */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-gray-900">How Many Patient ?</span>
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