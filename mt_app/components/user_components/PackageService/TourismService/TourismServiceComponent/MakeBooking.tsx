"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown,   Plus, Minus, X, } from "lucide-react";

interface MakeBookingProps {
  selectedTrip?: any
  appointmentDate?: Date | null;
}

export default function BookingCard({ selectedTrip, appointmentDate }: MakeBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2025, 9));
  const [showDateSection, setShowDateSection] = useState(true);
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

  // ✅ Mock Data
const tourism_service = {
  name: 'Phuket Trip',
  city: 'Phuket',
  languages:[
  { name: "English", flag: "🇬🇧" },
  { name: "Arabic", flag: "🇸🇦" },
  { name: "Japanese", flag: "🇯🇵" },
  { name: "Chinese", flag: "🇨🇳" },
  { name: "Korean", flag: "🇰🇷" },
  { name: "Thai", flag: "🇹🇭" },
  { name: "Spanish", flag: "🇪🇸" },
  { name: "French", flag: "🇫🇷" },
  { name: "German", flag: "🇩🇪" },
  { name: "Italian", flag: "🇮🇹" },
  { name: "Russian", flag: "🇷🇺" },
  { name: "Hindi", flag: "🇮🇳" },
  { name: "Other", flag: "🌐" },
],
  images: [
    {url:'/img/Homepage/Mfu.JPG', alt:'Medical facility'},
    {url:'/img/Homepage/hospital3.png', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
    {url:'/img/Homepage/hospital4.png', alt:'Medical facility'},
    {url:'/img/Homepage/hospital5.png', alt:'Medical facility'},
    {url:'/img/Homepage/Test.jpg', alt:'Medical facility'},
  ],
  description: 'Ran-Tong is devoted to rescuing abused elephants from all over Thailand and surrounding countries. Every elephant rescued is brought to the sanctuary in Chiang Mai and cared for with great passion and enthusiasm. Our mission is not only geared towards the protection and prevention of abused Elephants in Thailand but also to educate the public about their long history within Thai culture. Founded in 2009, Ran-Tong has rescued over 40 elephants to date with the help of public generosity, support, and private donation they can continue their ongoing vital work. Our priority is animal welfare. At Ran-Tong Save & Rescue Elephant Centre, you will completely get to learn a lot about elephants and have a memorable experience with them.',
  trips : [
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      title: "Phuket Go Around",
      image:"/img/Homepage/hospital3.png",
      duration: 1,
      adult_price: 1000,
      child_price: 500,
      guide_price: 1000,
      car_service_price: 600,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital3.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Summer", "Holiday", "Relax"],
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      image:"/img/Homepage/Mfu.JPG",
      title: "Summer Fun",
      duration: 2,
      adult_price: 2000,
      child_price: 1000,
      guide_price: 1500,
      car_service_price: 900,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital4.png","/img/Homepage/hospital3.png","/img/Homepage/hospital5.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital3.png","/img/Homepage/hospital5.png","/img/Homepage/hospital3.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Holiday", "Relax"],
      priceColor: "text-red-500",
    },
    {
      description: "Experience the best of Phuket with our 3-day tour package. Explore the stunning Phi Phi Islands, enjoy a city tour, and visit the iconic James Bond Island. Perfect for a summer holiday filled with relaxation and adventure.",
      image:"/img/Homepage/hospital4.png",
      title: "Phuket City",
      duration: 3,
      adult_price: 3000,
      child_price: 1500,
      guide_price: 2000,
      car_service_price: 1200,
      attractions: [{
        name:"Phi Phi Islands",
        images:["/img/Homepage/Test.jpg","/img/Homepage/hospital3.png","/img/Homepage/hospital5.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital5.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }, {
        name:"Phi Phi Islands",
        images:["/img/Homepage/hospital4.png","/img/Homepage/hospital4.png","/img/Homepage/hospital5.png"],
        description:"The Phi Phi Islands are a group of islands located in the Andaman Sea, off the coast of Thailand. They are known for their stunning beaches, crystal-clear waters, and vibrant marine life. The islands are a popular destination for tourists and offer a range of activities such as snorkeling, diving, and island hopping.",
        highlights: ["Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun.","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        includes:["Hotel pickup and drop-off by air-conditioned vehicle","Speedboat transfer to and from Phi Phi Islands","Professional English-speaking guide","Snorkeling equipment and life jackets","Bottled water and refreshments on board","Experience the thrill of a speedboat to the stunning Phi Phi Islands","Snorkel in crystal-clear waters teeming with vibrant marine life.","Relax on pristine beaches and soak up the tropical sun."],
        important_info:{
          not_allowed:["People with back problems","Pregnant","Heart complaints or other serious medical conditions","Epilepsy","Motion sickness"],
          recommend_to_bring:["Swimwear and towel","Sunscreen and hat","Camera to capture the memories","Cash for personal expenses and tips"],
          know_before_you_go:["This tour involves a moderate amount of walking, including some uneven surfaces and stairs.","Snorkeling is subject to weather and sea conditions. The operator reserves the right to modify or cancel snorkeling activities for safety reasons.","Please inform us of any dietary restrictions or allergies in advance so we can accommodate your needs.","Children must be accompanied by an adult at all times during the tour."]
        },
        location:{
          text:"Royal Phuket Marina, 68, Thep Krasattri Rd, Tambon Ko Kaeo, 83000",
          url:"https://www.google.com/maps/@9.5488479,99.9470193,12.86z?hl=en-US&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
        }
      }],
      tags: ["Holiday", "Relax"],
      priceColor: "text-red-500",
    },
  ]
};

  // Use the passed appointment date or default
  const actualAppointmentDate = appointmentDate || new Date(2025, 10, 5);
  const tripDuration = selectedTrip?.duration || 3;

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

  return (
    <div>
      <h1 className="my-5 text-2xl font-bold text-gray-900">Make a Booking</h1>

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
      {tourism_service.languages.slice(0, 2).map((lang) => {
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
        {tourism_service.languages
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
                ฿ {((selectedTrip?.adult_price ?? 0) * adults) + ((selectedTrip?.child_price ?? 0) * children) + (selectedTrip?.guide_price ?? 0) + (selectedTrip?.car_service_price ?? 0)}
              </div>
            </div>

            <div>
      {/* Book Now Button */}
      <button
        className={`w-full bg-emerald-500 text-white font-semibold py-4 rounded-2xl transition-colors mt-6
          ${!isPolicyChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'}`}
        disabled={!isPolicyChecked}
        onClick={() => {
          if (isPolicyChecked) {
            // your booking logic here
            console.log("Booking confirmed!");
          }
        }}
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