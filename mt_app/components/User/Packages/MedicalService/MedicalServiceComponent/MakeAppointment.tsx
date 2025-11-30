"use client";

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Plus, Minus } from 'lucide-react';

interface AppointmentData {
  selectedDate: Date;
  selectedTime: string;
  adult: number;
  child: number;
}

interface MakeAppointmentProps {
  onNextStep?: (date: Date) => void;
}

const MakeAppointment: React.FC<MakeAppointmentProps> = ({ onNextStep }) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [showDateSection, setShowDateSection] = useState(true);
  const [showTimeSection, setShowTimeSection] = useState(true);
  const [showPatientSection, setShowPatientSection] = useState(true);

  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  const scrollDateRef = useRef<HTMLDivElement>(null);
  const scrollTimeRef = useRef<HTMLDivElement>(null);

  const timeSlots: string[] = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const [form, setForm] = useState<AppointmentData>({
      selectedDate: new Date(),
      selectedTime: '7:00',
      child: 0,
      adult: 1,
    });
  // Generate next 30 days
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
    return { day: days[date.getDay()], date: date.getDate(), month: months[date.getMonth()] };
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 200;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = isSameDay(date, form.selectedDate);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && setForm(prev => ({ ...prev, selectedDate: date }))}
          disabled={isPast}
          className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
            ${isSelected ? 'bg-teal-500 text-white' : ''}
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-900'}
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

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  const handleNextStep = async () => {
     window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (!isPolicyChecked) return;
    
    try {
      // Save form data to persistent storage
      const formDataForStorage = {
        selectedDate: form.selectedDate.toISOString(),
        selectedTime: form.selectedTime,
        adult: form.adult,
        child: form.child,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('appointmentFormData', JSON.stringify(formDataForStorage));
      
      
      console.log('Form data saved:', formDataForStorage);
      
      // Call onNextStep if provided (for parent component navigation)
      if (onNextStep) {
        onNextStep(form.selectedDate);
      } else {
        alert('Appointment data saved successfully! Ready to proceed to next step.');
      }
    } catch (error) {
      console.error('Failed to save appointment data:', error);
      alert('Failed to save appointment data. Please try again.');
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="my-5 text-2xl font-bold text-gray-900 text-center">Make an Appointment</h1>

      {/* Date Selection */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">Select Date</p>
            <button onClick={() => setShowCalendar(true)} className="text-xs text-teal-500 font-bold hover:text-teal-600 transition-colors">
              Show more dates
            </button>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${showDateSection ? 'rotate-180' : ''}`} 
            onClick={() => setShowDateSection(!showDateSection)} 
          />
        </div>

        {showDateSection && (
          <>
            <div className="relative">
              <button onClick={() => scroll(scrollDateRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div ref={scrollDateRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-8">
                {dates.map((date, index) => {
                  const { day, date: dateNum, month } = formatDateDisplay(date);
                  const isSelected = isSameDay(date, form.selectedDate);
                  return (
                    <div key={index} onClick={() => setForm(prev => ({ ...prev, selectedDate: date }))} className={`flex-shrink-0 w-20 border rounded-2xl p-3 text-center cursor-pointer transition-all ${isSelected ? 'border-teal-500 bg-teal-50 border-2' : 'border-gray-300 hover:border-teal-300'}`}>
                      <div className={`text-xs font-medium ${isSelected ? 'text-teal-500' : 'text-gray-600'}`}>{day}</div>
                      <div className={`text-xl font-bold mt-1 ${isSelected ? 'text-teal-500' : 'text-gray-900'}`}>{dateNum}</div>
                      <div className={`text-xs ${isSelected ? 'text-teal-500' : 'text-gray-600'}`}>{month}</div>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => scroll(scrollDateRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Selected Date:</p>
              <p className="text-lg font-semibold text-gray-900">{form.selectedDate.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
            </div>
          </>
        )}
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Date</h2>
              <button onClick={() => setShowCalendar(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4 text-black">
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
              <span className="font-semibold text-gray-900">{monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}</span>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 h-10 flex items-center justify-center">{day}</div>
              ))}
              {renderCalendar()}
            </div>

            <button onClick={() => setShowCalendar(false)} className="w-full bg-teal-500 text-white rounded-lg py-3 font-semibold hover:bg-teal-600 transition-colors">Confirm</button>
          </div>
        </div>
      )}

      {/* Time Selection */}
      <div className='max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200'>
        <div className="flex items-start justify-between ">
          <div>
            <p className="text-lg font-semibold text-gray-900">Select Time</p>
            <button onClick={() => setShowTimeModal(true)} className="text-xs text-teal-500 font-bold hover:text-teal-600 transition-colors">Show more time slots</button>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${showTimeSection ? 'rotate-180' : ''}`} 
            onClick={() => setShowTimeSection(!showTimeSection)} 
          />
        </div>

        {showTimeSection && (
          <div className="relative">
            <button onClick={() => scroll(scrollTimeRef, 'left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>

            <div ref={scrollTimeRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-8">
              {timeSlots.map((time, index) => (
                <button 
                  key={index} 
                  onClick={() => setForm(prev => ({ ...prev, selectedTime: time }))} 
                  className={`flex-shrink-0 py-3 px-5 rounded-xl text-sm font-bold transition-colors ${form.selectedTime === time ? 'bg-teal-100 text-teal-600' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button onClick={() => scroll(scrollTimeRef, 'right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
          </div>
        )}
      </div>

      {/* Time Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Time Slot</h2>
              <button onClick={() => setShowTimeModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {timeSlots.map((time, index) => (
                <button 
                  key={index} 
                  onClick={() => { 
                    setForm(prev => ({ ...prev, selectedTime: time })); 
                    setShowTimeModal(false); 
                  }} 
                  className={`py-3 rounded-lg font-semibold transition-colors ${form.selectedTime === time ? 'bg-teal-100 text-teal-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Patient Count */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200 mb-5">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-900">How Many Patients?</span>
          <ChevronDown 
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${showPatientSection ? 'rotate-180' : ''}`} 
            onClick={() => setShowPatientSection(!showPatientSection)} 
          />
        </div>

        {showPatientSection && (
          <>
            {/* Adults */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-gray-900">Adult (16-80)</span>
              <div className="flex items-center bg-white rounded-full border border-gray-200">
                <button 
                  onClick={() => setForm(prev => ({ ...prev, adult: Math.max(0, prev.adult - 1) }))} 
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Minus className="w-4 h-4"/>
                </button>
                <span className="px-4 py-2 font-medium text-emerald-500">{form.adult}</span>
                <button 
                  onClick={() => setForm(prev => ({ ...prev, adult: prev.adult + 1 }))} 
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Child (4-15)</span>
              <div className="flex items-center bg-white rounded-full border border-gray-200">
                <button 
                  onClick={() => setForm(prev => ({ ...prev, child: Math.max(0, prev.child - 1) }))} 
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Minus className="w-4 h-4"/>
                </button>
                <span className="px-4 py-2 font-medium text-emerald-500">{form.child}</span>
                <button 
                  onClick={() => setForm(prev => ({ ...prev, child: prev.child + 1 }))} 
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4"/>
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Next Step */}
        <button
          onClick={handleNextStep}
          disabled={!isPolicyChecked}
          className={`w-full bg-teal-500 text-white font-semibold py-4 rounded-2xl transition-colors 
            ${!isPolicyChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
        >
          Next Step
        </button>

        {/* Policy */}
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="policy"
            className="form-checkbox text-emerald-500 rounded-lg h-5 w-5 mr-2"
            checked={isPolicyChecked}
            onChange={(e) => setIsPolicyChecked(e.target.checked)}
          />
          <label htmlFor="policy" className="text-gray-600 text-sm">
            This package covers appointment arrangements only. All medical expenses and related costs must be paid directly to the hospital.
          </label>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default MakeAppointment;