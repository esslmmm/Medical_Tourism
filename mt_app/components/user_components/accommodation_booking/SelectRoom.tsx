"use client";

import { CalendarIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

interface Accommodation {
  hotel_id: number;
  name: string;
  hotel_cod: string;
  location: string;
  city: string;
  rating: number;
  email: string;
  description: string;
  image: string;
  check_in_time: string;
}

interface AccommodationProfileProps {
  accommodation: Accommodation | null;
  range: Range[];
  setRange: React.Dispatch<React.SetStateAction<Range[]>>;
  adults: number;
  setAdults: (val: number) => void;
  children: number;
  setChildren: (val: number) => void;
}

const SelectRoom: React.FC<AccommodationProfileProps> = ({ accommodation, range, setRange, adults, setAdults, children, setChildren }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#D2ECE4] py-10 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Select Room</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accommodation Info */}
          <InfoRow
            icon={<HomeIcon className="h-6 w-6 text-gray-500" />}
            label="Accommodation"
            content={accommodation?.name || "N/A"}
          />

          {/* Guest Selector */}
          <div className="flex items-start space-x-4 border-b border-gray-300 pb-4">
            <UserIcon className="h-6 w-6 text-gray-500 mt-1" />
            <div className="w-full">
              <p className="text-gray-500 text-sm font-semibold mb-2">Guests</p>
              <div className="flex space-x-2 w-full">
                <Dropdown
                  label="Adults"
                  value={adults}
                  options={Array.from({ length: 10 }, (_, i) => i + 1)}
                  onChange={(val) => setAdults(val)}
                />
                <Dropdown
                  label="Children"
                  value={children}
                  options={Array.from({ length: 6 }, (_, i) => i)}
                  onChange={(val) => setChildren(val)}
                />
              </div>
            </div>
          </div>

          {/* Check-in and Check-out */}
          <div className="md:col-span-2 relative" ref={calendarRef}>
            <p className="text-gray-500 text-sm font-semibold mb-2">Select Dates</p>
            <button
              type="button"
              className="flex items-center border border-gray-300 px-4 py-3 rounded-md bg-white w-full justify-between cursor-pointer"
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              <div className="flex w-full justify-between text-left">
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="text-gray-800 font-medium">
                    {format(range[0].startDate!, "dd MMM yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="text-gray-800 font-medium">
                    {format(range[0].endDate!, "dd MMM yyyy")}
                  </p>
                </div>
              </div>
              <CalendarIcon className="h-5 w-5 text-gray-500 ml-4" />
            </button>

            {calendarOpen && (
              <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg">
                <DateRange
  editableDateInputs={false}
  onChange={(item: any) => {
    const startDate = item.selection.startDate;
    let endDate = item.selection.endDate;

    // Ensure endDate is at least 1 day after startDate
    if (endDate <= startDate) {
      const adjustedEndDate = new Date(startDate);
      adjustedEndDate.setDate(startDate.getDate() + 1);
      endDate = adjustedEndDate;
    }

    setRange([{ ...item.selection, startDate, endDate }]);
  }}
  moveRangeOnFirstSelection={false}
  ranges={range}
  rangeColors={["#2563EB"]}
  months={2}
  direction="horizontal"
  className="rounded-lg"
  minDate={new Date()}
/>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components

const InfoRow = ({
  icon,
  label,
  content,
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
}) => (
  <div className="flex items-start space-x-4 border-b border-gray-300 pb-4">
    {icon}
    <div>
      <p className="text-gray-500 text-sm font-semibold">{label}</p>
      <p className="font-medium">{content}</p>
    </div>
  </div>
);

const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
}) => (
  <div className="w-1/2">
    <select
      className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-md w-full"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt} {label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectRoom;
