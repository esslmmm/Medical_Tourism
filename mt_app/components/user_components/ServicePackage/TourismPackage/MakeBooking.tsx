import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Globe, Plus, Minus } from 'lucide-react';

export default function BookingCard() {
  const [selectedDate, setSelectedDate] = useState<number>(5);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [selectedLanguage, setSelectedLanguage] = useState<'Arabic' | 'English' | 'Other'>('Arabic');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(1);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, and shift others
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = []; 

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
      const day = daysInPrevMonth - firstDay + i + 1;
      days.push(
        <button
          key={`prev-${day}`}
          className="w-12 h-12 text-gray-300 hover:bg-gray-50 rounded-lg"
        >
          {day}
        </button>
      );
    }

    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const isTrip = day >= 8 && day <= 10;
      const isAppointment = day === 5;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`
            w-12 h-12 rounded-lg font-medium transition-all
            ${isSelected && isAppointment 
              ? 'bg-emerald-500 text-white' 
              : isTrip 
              ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' 
              : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  type Language = {
    code: string;
    name: 'Arabic' | 'English' | 'Other';
    flag: string;
  };

  const languages: Language[] = [
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'other', name: 'Other', flag: '🌐' }
  ];

  return (
    <div>
        <h1 className=" my-5 text-2xl font-bold text-gray-900">Make a Booking</h1>


        <div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200'>
            {/* Date Selection */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Select Date</span>
          <ChevronDown className="w-5 h-5 text-emerald-500" />
        </div>
        
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {months[currentMonth]} {currentYear}
          </h2>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>

        {/* Trip indicator */}
        <div className="flex items-center mt-4 text-sm text-emerald-600">
          <div className="w-4 h-2 bg-emerald-200 rounded-full mr-2"></div>
          Trip
        </div>

        {/* Selected Dates Info */}
        <div className="mt-4 space-y-2 text-black">
          <div className="text-sm ">
            <span className="font-semibold">Appointment Date : </span>
            <span>{selectedDate} October {currentYear}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">Trip Date : </span>
            <span>8 - 10 October {currentYear}</span>
          </div>
        </div>
        </div>




<div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5'>
{/* Language Selection */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Select Tour Guide Language</span>
          <ChevronDown className="w-5 h-5 text-emerald-500" />
        </div>
        
        <div className="flex gap-3">
          {languages.map(lang => (
            <button
              key={lang.name}
              onClick={() => setSelectedLanguage(lang.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                selectedLanguage === lang.name
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-emerald-300'
              }`}
            >
              {lang.name === 'Other' ? <Globe className="w-4 h-4" /> : <span className="text-sm">{lang.flag}</span>}
              <span className="font-medium">{lang.name}</span>
              {lang.name === 'Other' && <ChevronDown className="w-3 h-3" />}
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
            <div className="text-sm text-gray-500">฿ 1,000 per person</div>
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
            <div className="text-sm text-gray-500">฿ 500 per person</div>
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

    </div>


    <div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mt-5'>
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
        <span className="text-3xl font-bold text-gray-900">Price</span>
    </div>
    <hr className="border-t border-gray-300 mb-6" />

    {/* Price Breakdown */}
    <div className="space-y-4">
        {/* Adults */}
        <div className="flex items-center justify-between">
            <div>
                <div className="font-semibold text-gray-900">Adult (ages 16 - 80)</div>
            </div>
            <div className="text-gray-900 font-medium">฿ 1,000 × 1</div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
            <div>
                <div className="font-semibold text-gray-900">Child (ages 4 - 15)</div>
            </div>
            <div className="text-gray-900 font-medium">฿ 500 × 1</div>
        </div>

        {/* Guide */}
        <div className="flex items-center justify-between">
            <div>
                <div className="font-semibold text-gray-900">Guide</div>
            </div>
            <div className="text-gray-900 font-medium">฿ 1,000</div>
        </div>

        {/* Car Service */}
        <div className="flex items-center justify-between">
            <div>
                <div className="font-semibold text-gray-900">Car Service</div>
            </div>
            <div className="text-gray-900 font-medium">฿ 1,000</div>
        </div>
    </div>

    {/* Total */}
    <div className="flex items-center justify-between pt-8">
        <div className="text-3xl font-bold text-gray-900">Total</div>
        <div className="text-3xl font-bold text-red-500">฿ 1,500</div>
    </div>

    {/* Book Now Button */}
    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-2xl transition-colors mt-6">
        Book Now
    </button>
    
    {/* Policy Checkbox */}
    <div className="flex items-center mt-4">
        <input type="checkbox" id="policy" className="form-checkbox text-emerald-500 rounded-lg h-5 w-5 mr-2" />
        <label htmlFor="policy" className="text-gray-600 text-sm">
            I read and agree <a href="#" className="text-blue-500 underline">the policy</a>
        </label>
    </div>
</div>
    </div>
  );
}
