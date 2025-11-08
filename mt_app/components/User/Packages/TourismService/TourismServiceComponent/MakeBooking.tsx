"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown,   Plus, Minus, X, } from "lucide-react";
import { AppointmentFormData } from "@/app/user/Form/form";
import { createAppointment } from "@/app/api/booking/appointments/createAppointment";
import { Packages } from "@/types/Package";
import { submitGuideBooking } from "@/app/api/booking/guides/submitGuideBooking";
import { useParams, useRouter } from "next/navigation";
import { createtrip } from "@/app/api/booking/trips/createtrip";

interface MakeBookingProps {
  selectedTrip?: any | null;
  appointmentDate: Date;
  TripData: Packages | null;
}

export default function BookingCard({ selectedTrip, appointmentDate, TripData }: MakeBookingProps) {
  if (!TripData) return;
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [form, setForm] = useState<AppointmentFormData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2025, 9));
  const [showDateSection, setShowDateSection] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [customLanguage, setCustomLanguage] = useState<string>("");
  const [customLanguageFlag, setCustomLanguageFlag] = useState("🌐");
  const [showOtherLanguageModal, setShowOtherLanguageModal] =
  useState<boolean>(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [showLanguageSection, setShowLanguageSection] = useState(true);
  const [showTouristSection, setShowTouristSection] = useState(true);
  const [showPriceSection, setShowPriceSection] = useState(true);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  

  useEffect(() => {
        const savedForm = localStorage.getItem('appointmentFormData');
        if (savedForm) {
          setForm(JSON.parse(savedForm));
        }
      }, []);


  // Use the passed appointment date or default
  const actualAppointmentDate = appointmentDate;
  const tripDuration = selectedTrip?.duration;

  // Update calendar month when appointment date changes
  useEffect(() => {
    if (appointmentDate) {
      setCalendarMonth(new Date(appointmentDate.getFullYear(), appointmentDate.getMonth()));
    }
  }, [appointmentDate]);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay() };
  };
  
  const isConflict = (day: Date) => {
    const tripStart = day;
    const tripEnd = new Date(day.getTime() + tripDuration * 86400000 - 1);
    return actualAppointmentDate >= tripStart && actualAppointmentDate <= tripEnd;
  };

  const renderCalendar = (): React.ReactNode[] => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(calendarMonth);
    const days: React.ReactNode[] = [];
    const today = new Date();

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-12 h-12" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
      const isAppointment = isSameDay(currentDate, actualAppointmentDate);
      const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isTripDay = selectedDate && currentDate >= selectedDate && currentDate < new Date(selectedDate.getTime() + tripDuration*86400000);
      const isTripStart = selectedDate && isSameDay(currentDate, selectedDate);
      const hasConflict = isConflict(currentDate);

      days.push(
        <button
          key={day}
          onClick={() => { if (!isPast && !isAppointment && !hasConflict) setSelectedDate(currentDate); }}
          disabled={isPast || isAppointment || hasConflict}
          className={
            `w-12 h-12 rounded-lg flex items-center justify-center font-medium transition-colors
            ${isAppointment ? "bg-emerald-500 text-white" : ""}
            ${hasConflict ? "text-red-400 cursor-not-allowed" : ""}
            ${isTripDay ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300" : ""}
            ${isTripStart ? "bg-emerald-300 text-emerald-700" : ""}
            ${!isAppointment && !isTripDay && !isPast && !hasConflict ? "hover:bg-gray-100 text-gray-700" : ""}
            ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
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

  const [endDate, setEndDate] = useState<Date | null>(null);
  const TotalPrice = ((selectedTrip?.adult_price ?? 0) * adults) + ((selectedTrip?.child_price ?? 0) * children) + (selectedTrip?.guide_price ?? 0) + (selectedTrip?.car_service_price ?? 0);

  useEffect(() => {
    if (selectedDate && selectedTrip.duration > 0) {
      const start = new Date(selectedDate);
      const end = new Date(start);
      end.setDate(start.getDate() + selectedTrip.duration - 1);
      setEndDate(end);
    } else {
      setEndDate(null);
    }
  }, [selectedDate, selectedTrip?.duration]);

  const handleBooking = async () => {
    if (
      !isPolicyChecked ||
      !form?.selectedDate ||
      !form?.selectedTime ||
      !selectedTrip ||
      !selectedDate ||
      !endDate ||
      !selectedLanguage ||
      !TotalPrice
    ) {
      console.error("Missing required booking information");
      return;
    }

    try {
      // Create appointment
      const appointmentData = {
        date: form.selectedDate,
        child: form.child,
        adult: form.adult,
        timeslot: form.selectedTime,
        status: "Pending",
      };
      const appointmentResponse = await createAppointment(appointmentData);

      if (!appointmentResponse || appointmentResponse.error || !appointmentResponse.appointment_id) {
        throw new Error(appointmentResponse?.error || "Failed to create appointment");
      }

      // Create guide booking
        const guideData = {
          language: selectedLanguage,
          start: selectedDate,
          end: endDate,
          status: "Pending",
        };
        const guideResponse = await submitGuideBooking(guideData);

        if (!guideResponse || guideResponse.error || !guideResponse.booking_id) {
          throw new Error(guideResponse?.error || "Failed to create guide booking");
        }

      // Create Trip booking
      const TripData = {
        route_id: selectedTrip.route_id,
        guide_booking_id: guideResponse.booking_id,
        child: children,
        adult: adults,
        start: selectedDate,
        end: endDate,
        status: "Pending",
      };

      const TripResponse = await createtrip(TripData);
      if (!TripResponse || TripResponse.error || !TripResponse.tourism_id) {
        throw new Error(TripResponse?.error || "Failed to create trip booking");
      }

      // Save IDs
      const appointment_id = appointmentResponse.appointment_id;
      const tourism_id = TripResponse.tourism_id;

      if (appointment_id && tourism_id && TotalPrice) {
        localStorage.setItem("appointment_id", appointment_id);
        localStorage.setItem("TotalPrice", TotalPrice);
        localStorage.setItem("tourism_id", tourism_id);
      }

      // Navigate
      router.push(`/user/Form/medical_appointment/${id}`);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };


  return (
    <div>
      <h1 className="my-5 text-2xl font-bold text-gray-900 text-center">Make a Booking</h1>

      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 space-y-6 border-2 border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Select Date</span>
          <ChevronDown
            onClick={() => setShowDateSection(!showDateSection)}
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${showDateSection ? "rotate-180" : ""}`}
          />
        </div>

        {showDateSection && (
          <>
            <div className="flex items-center justify-between my-6">
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-200 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </h2>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-200 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            {selectedDate && (
              <div className="mt-4 space-y-2 text-black text-sm">
                <div>
                  <span className="font-semibold">Appointment Date: </span>
                  <span>
                    {actualAppointmentDate.getDate()} {monthNames[actualAppointmentDate.getMonth()]} {actualAppointmentDate.getFullYear()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Trip Date: </span>
                  <span>
                    {tripDuration === 1
                      ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
                      : `${selectedDate.getDate()} - ${new Date(selectedDate.getTime() + (tripDuration - 1) * 86400000).getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* === Language Section === */}
<div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-200 mt-5">
  <div className="flex items-center justify-between">
    <span className="text-lg font-semibold text-gray-900">
      Select Tour Guide Language
    </span>
    <ChevronDown
      onClick={() => setShowLanguageSection(!showLanguageSection)}
      className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${
        showLanguageSection ? "rotate-180" : ""
      }`}
    />
  </div>

  {showLanguageSection && (
    <div className="flex flex-wrap gap-3 mt-4">
      {TripData?.trips.languages.slice(0, 2).map((lang) => {
        const isSelected = selectedLanguage === lang.name;

        return (
          <button
            key={lang.name}
            onClick={() => {
              setSelectedLanguage(lang.name);
              setCustomLanguage("");
              setCustomLanguageFlag("🌐"); // reset flag when choosing default languages
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
              isSelected
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-emerald-300 text-sm"
            }`}
          >
            <span>{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        );
      })}

      {/* Always show "Other" button */}
      <button
        onClick={() => setShowOtherLanguageModal(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
          selectedLanguage === "Other"
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-gray-300 bg-white text-gray-700 hover:border-emerald-300"
        }`}
      >
        <span>{customLanguageFlag}</span>
        <span className="font-medium">{customLanguage || "Other"}</span>
      </button>
    </div>
  )}
</div>

{/* === Other Language Modal === */}
{showOtherLanguageModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Select Language</h2>
        <button
          onClick={() => setShowOtherLanguageModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {TripData?.trips.languages
          .slice(2, -1) // all languages except first 2 and "Other"
          .map((lang) => (
            <button
              key={lang.name}
              onClick={() => {
                setSelectedLanguage("Other");
                setCustomLanguage(lang.name);
                setCustomLanguageFlag(lang.flag); // set flag dynamically
                setShowOtherLanguageModal(false);
              }}
              className={`py-3 rounded-lg font-semibold transition-colors ${
                customLanguage === lang.name
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="block text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
      </div>
    </div>
  </div>
)}


      {/* === Tourist Count Section === */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-200 mt-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            How Many Tourists?
          </span>
          <ChevronDown
            onClick={() => setShowTouristSection(!showTouristSection)}
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${
              showTouristSection ? "rotate-180" : ""
            }`}
          />
        </div>

        {showTouristSection && (
          <>
            <div className="flex items-center justify-between my-6">
              <div>
                <div className="font-semibold text-gray-900">
                  Adult (ages 16 - 80)
                </div>
                <div className="text-sm text-gray-500">฿ {selectedTrip?.adult_price ?? 0} per person</div>
              </div>
              <div className="flex items-center bg-white rounded-full border border-gray-200">
                <button
                  onClick={() => setAdults(Math.max(0, adults - 1))}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium text-emerald-500">
                  {adults}
                </span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">
                  Child (ages 4 - 15)
                </div>
                <div className="text-sm text-gray-500">฿ {selectedTrip?.child_price ?? 0} per person</div>
              </div>
              <div className="flex items-center bg-white rounded-full border border-gray-200">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium text-emerald-500">
                  {children}
                </span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* === Price Section === */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-200 mt-5 mb-10">
        <div className="flex items-center justify-between ">
          <span className="text-3xl font-bold text-gray-900">Price</span>
          <ChevronDown
            onClick={() => setShowPriceSection(!showPriceSection)}
            className={`w-5 h-5 text-emerald-500 cursor-pointer transition-transform ${
              showPriceSection ? "rotate-180" : ""
            }`}
          />
        </div>

        {showPriceSection && (
          <>
            <hr className="border-t border-gray-300 my-6" />
            <div className="space-y-4">
              {adults > 0 ? (
                  <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">
                  Adult (ages 4 - 15)
                </div>
                  <div className="text-gray-900 font-medium">
                    ฿ {selectedTrip?.adult_price ?? 0} × {adults}
                  </div>
              </div>
                ) : (
                  <div>

              </div>
                )}


                {children > 0 ? (
                  <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">
                  Child (ages 4 - 15)
                </div>
                  <div className="text-gray-900 font-medium">
                    ฿ {selectedTrip?.child_price ?? 0} × {children}
                  </div>
              </div>
                ) : (
                  <div>

              </div>
                )}

              {selectedTrip?.guide_price != null && (
  <div className="flex items-center justify-between">
    <div className="font-semibold text-gray-900">Guide</div>
    <div className="text-gray-900 font-medium">
      ฿ {selectedTrip?.guide_price}
    </div>
  </div>
)}
              {/* <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">Car Service</div>
                <div className="text-gray-900 font-medium">฿ {selectedTrip?.car_service_price ?? 0}</div>
              </div> */}
              {selectedTrip?.car_service_price != null && (
  <div className="flex items-center justify-between">
    <div className="font-semibold text-gray-900">Car Service</div>
    <div className="text-gray-900 font-medium">
      ฿ {selectedTrip?.car_service_price}
    </div>
  </div>
)}
            </div>

            <div className="flex items-center justify-between pt-8">
              <div className="text-3xl font-bold text-gray-900">Total</div>
              <div className="text-3xl font-bold text-red-500">
                ฿ {TotalPrice}
              </div>
            </div>

            <div>
      {/* Book Now Button */}
      <button
        className={`w-full bg-emerald-500 text-white font-semibold py-4 rounded-2xl transition-colors mt-6
          ${!isPolicyChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
        disabled={!isPolicyChecked}
        onClick={() => {handleBooking();}}
      >
        Book Now
      </button>

      {/* Policy Checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="policy"
          className="form-checkbox text-emerald-500 rounded-lg h-5 w-5 mr-2"
          checked={isPolicyChecked}
          onChange={(e) => setIsPolicyChecked(e.target.checked)}
        />
        <label htmlFor="policy" className="text-gray-600 text-sm">
          I read and agree{" "}
          <a href="#" className="text-emerald-500 font-medium underline">
            Terms and Policy
          </a>
        </label>
      </div>
    </div>
          </>
        )}
      </div>

      
    </div>
  );
}